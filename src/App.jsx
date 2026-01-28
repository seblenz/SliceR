import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Map from './components/Map';
import LocationPanel from './components/LocationPanel';
import ReviewForm from './components/ReviewForm';
import SubmitPlaceForm from './components/SubmitPlaceForm';
import { ToastContainer } from './components/Toast';
import { useGoogleSheets } from './hooks/useGoogleSheets';
import { useReviewLimit } from './hooks/useReviewLimit';

function App() {
  // State
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showSuggestForm, setShowSuggestForm] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Hooks
  const { places, submitReview, submitComment, submitPlaceSuggestion } = useGoogleSheets();
  const { remaining: reviewsRemaining, canReview, incrementReviewCount } = useReviewLimit();

  // Toast management
  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Event handlers
  const handleSelectPlace = useCallback((place) => {
    setSelectedPlace(place);
    setShowReviewForm(false);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedPlace(null);
    setShowReviewForm(false);
  }, []);

  const handleOpenReviewForm = useCallback(() => {
    if (!canReview) {
      addToast('You\'ve reached your daily review limit. Come back tomorrow!', 'error');
      return;
    }
    setShowReviewForm(true);
  }, [canReview, addToast]);

  const handleCloseReviewForm = useCallback(() => {
    setShowReviewForm(false);
  }, []);

  const handleOpenSuggestForm = useCallback(() => {
    setShowSuggestForm(true);
  }, []);

  const handleCloseSuggestForm = useCallback(() => {
    setShowSuggestForm(false);
  }, []);

  const handleSubmitReview = useCallback(async (reviewData) => {
    if (!selectedPlace || !canReview) return;

    const result = await submitReview(selectedPlace.place_id, reviewData);

    if (result.success) {
      incrementReviewCount();
      setShowReviewForm(false);
      addToast('Your slice review has been submitted!', 'success');

      // Update selected place with new review
      setSelectedPlace(prev => {
        if (!prev) return null;
        return {
          ...prev,
          reviews: [result.review, ...(prev.reviews || [])]
        };
      });
    } else {
      addToast('Failed to submit review. Please try again.', 'error');
    }
  }, [selectedPlace, canReview, submitReview, incrementReviewCount, addToast]);

  const handleAddComment = useCallback(async (placeId, reviewId, commentData) => {
    const result = await submitComment(placeId, reviewId, commentData);

    if (result.success) {
      // Update selected place if it matches
      if (selectedPlace && selectedPlace.place_id === placeId) {
        setSelectedPlace(prev => {
          if (!prev) return null;
          return {
            ...prev,
            reviews: prev.reviews.map(review => {
              if (review.review_id === reviewId) {
                return {
                  ...review,
                  comments: [...(review.comments || []), { ...commentData, timestamp: new Date().toISOString() }]
                };
              }
              return review;
            })
          };
        });
      }
    } else {
      addToast('Failed to add comment. Please try again.', 'error');
    }
  }, [selectedPlace, submitComment, addToast]);

  const handleSubmitSuggestion = useCallback(async (suggestionData) => {
    const result = await submitPlaceSuggestion(suggestionData);

    if (result.success) {
      setShowSuggestForm(false);
      addToast('Thanks! Your submission is pending review.', 'success');
    } else {
      addToast('Failed to submit suggestion. Please try again.', 'error');
    }
  }, [submitPlaceSuggestion, addToast]);

  // Get current place data (in case it was updated)
  const currentPlace = selectedPlace
    ? places.find(p => p.place_id === selectedPlace.place_id) || selectedPlace
    : null;

  return (
    <div className="app">
      <Header
        reviewsRemaining={reviewsRemaining}
        onSuggestPlace={handleOpenSuggestForm}
      />

      <Map
        places={places}
        onSelectPlace={handleSelectPlace}
        selectedPlaceId={currentPlace?.place_id}
      />

      {currentPlace && !showReviewForm && (
        <LocationPanel
          place={currentPlace}
          onClose={handleClosePanel}
          onRateSlice={handleOpenReviewForm}
          onAddComment={handleAddComment}
          canReview={canReview}
        />
      )}

      {showReviewForm && currentPlace && (
        <ReviewForm
          place={currentPlace}
          onSubmit={handleSubmitReview}
          onClose={handleCloseReviewForm}
          canReview={canReview}
        />
      )}

      {showSuggestForm && (
        <SubmitPlaceForm
          onSubmit={handleSubmitSuggestion}
          onClose={handleCloseSuggestForm}
        />
      )}

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default App;
