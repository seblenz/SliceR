import { useState, useCallback } from 'react';
import { pizzaPlaces as initialData } from '../data/initialPizzaPlaces';

// This hook provides an interface for Google Sheets operations
// Currently uses local data, but is structured for easy Google Sheets integration

export function useGoogleSheets() {
  const [places, setPlaces] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all pizza places (from master sheet)
  const fetchPlaces = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual Google Sheets API call
      // const response = await sheetsApi.getPlaces();
      // setPlaces(response);

      // For now, use local data
      setPlaces(initialData);
    } catch (err) {
      setError('Failed to load pizza places');
      console.error('Error fetching places:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch reviews for a specific place
  const fetchReviews = useCallback(async (placeId) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual Google Sheets API call
      // const response = await sheetsApi.getReviews(placeId);
      // return response;

      // For now, return reviews from local data
      const place = places.find(p => p.place_id === placeId);
      return place?.reviews || [];
    } catch (err) {
      setError('Failed to load reviews');
      console.error('Error fetching reviews:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [places]);

  // Submit a new review
  const submitReview = useCallback(async (placeId, reviewData) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual Google Sheets API call
      // await sheetsApi.appendReview(placeId, reviewData);

      // For now, update local state
      const newReview = {
        review_id: `r${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...reviewData,
        comments: []
      };

      setPlaces(prevPlaces =>
        prevPlaces.map(place => {
          if (place.place_id === placeId) {
            return {
              ...place,
              reviews: [newReview, ...place.reviews]
            };
          }
          return place;
        })
      );

      return { success: true, review: newReview };
    } catch (err) {
      setError('Failed to submit review');
      console.error('Error submitting review:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Submit a comment on a review
  const submitComment = useCallback(async (placeId, reviewId, commentData) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual Google Sheets API call

      const newComment = {
        ...commentData,
        timestamp: new Date().toISOString()
      };

      setPlaces(prevPlaces =>
        prevPlaces.map(place => {
          if (place.place_id === placeId) {
            return {
              ...place,
              reviews: place.reviews.map(review => {
                if (review.review_id === reviewId) {
                  return {
                    ...review,
                    comments: [...(review.comments || []), newComment]
                  };
                }
                return review;
              })
            };
          }
          return place;
        })
      );

      return { success: true };
    } catch (err) {
      setError('Failed to submit comment');
      console.error('Error submitting comment:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Submit a new pizza place suggestion
  const submitPlaceSuggestion = useCallback(async (suggestionData) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual Google Sheets API call
      // await sheetsApi.appendSubmission(suggestionData);

      console.log('New place suggestion:', suggestionData);
      return { success: true };
    } catch (err) {
      setError('Failed to submit suggestion');
      console.error('Error submitting suggestion:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Calculate average rating for a place
  const getAverageRating = useCallback((placeId) => {
    const place = places.find(p => p.place_id === placeId);
    if (!place || !place.reviews || place.reviews.length === 0) {
      return 0;
    }

    const sum = place.reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / place.reviews.length;
  }, [places]);

  return {
    places,
    loading,
    error,
    fetchPlaces,
    fetchReviews,
    submitReview,
    submitComment,
    submitPlaceSuggestion,
    getAverageRating
  };
}
