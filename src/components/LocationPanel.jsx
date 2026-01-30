import React, { useRef, useEffect, useState } from 'react';
import RatingDisplay from './RatingDisplay';
import ReviewCard from './ReviewCard';

export function LocationPanel({
  place,
  onClose,
  onRateSlice,
  onAddComment,
  canReview
}) {
  const panelRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate average rating
  const averageRating = place.reviews && place.reviews.length > 0
    ? place.reviews.reduce((acc, r) => acc + r.rating, 0) / place.reviews.length
    : 0;

  // Sort reviews by date (most recent first)
  const sortedReviews = [...(place.reviews || [])].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  // Handle touch events for swipe to dismiss
  const handleTouchStart = (e) => {
    if (e.target.closest('.panel-handle')) {
      setStartY(e.touches[0].clientY);
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaY = e.touches[0].clientY - startY;
    if (deltaY > 0) {
      setCurrentY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (currentY > 100) {
      onClose();
    }
    setCurrentY(0);
  };

  // Reset expanded state when place changes
  useEffect(() => {
    setIsExpanded(false);
  }, [place.place_id]);

  const panelStyle = {
    transform: currentY > 0 ? `translateY(${currentY}px)` : undefined
  };

  return (
    <div
      className={`location-panel ${isExpanded ? 'expanded' : ''}`}
      ref={panelRef}
      style={panelStyle}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-label={`Details for ${place.name}`}
    >
      {/* Draggable handle */}
      <div
        className="panel-handle"
        onClick={() => setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div className="handle-bar" />
      </div>

      {/* Close button */}
      <button
        className="panel-close"
        onClick={onClose}
        aria-label="Close panel"
      >
        ×
      </button>

      {/* Place header */}
      <header className="panel-header">
        <h2 className="place-name">{place.name}</h2>
        <p className="place-neighborhood">{place.neighborhood}</p>

        <div className="place-stats">
          <RatingDisplay rating={averageRating} size="large" />
          <span className="review-count">
            {place.reviews?.length || 0} {place.reviews?.length === 1 ? 'review' : 'reviews'}
          </span>
        </div>

        <button
          className="rate-slice-btn"
          onClick={onRateSlice}
          disabled={!canReview}
        >
          {canReview ? '🍕 Rate Your Slice' : 'Daily limit reached'}
        </button>

        {place.google_maps_link && (
          <a
            href={place.google_maps_link}
            target="_blank"
            rel="noopener noreferrer"
            className="maps-link"
          >
            📍 Open in Google Maps
          </a>
        )}
      </header>

      {/* Reviews section */}
      <section className="panel-reviews" aria-label="Reviews">
        <h3 className="reviews-title">Slice Reviews</h3>

        {sortedReviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to rate this spot!</p>
        ) : (
          <div className="reviews-list">
            {sortedReviews.map(review => (
              <ReviewCard
                key={review.review_id}
                review={review}
                onAddComment={(commentData) =>
                  onAddComment(place.place_id, review.review_id, commentData)
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default LocationPanel;
