import React from 'react';

export function RatingDisplay({ rating, showNumeric = true, size = 'medium' }) {
  const fullSlices = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptySlices = 10 - fullSlices - (hasHalf ? 1 : 0);

  return (
    <div className={`rating-display rating-${size}`} aria-label={`Rating: ${rating.toFixed(1)} out of 10`}>
      <div className="rating-slices">
        {/* Full slices */}
        {Array(fullSlices).fill(null).map((_, i) => (
          <span key={`full-${i}`} className="slice slice-full" aria-hidden="true">
            🍕
          </span>
        ))}

        {/* Half slice */}
        {hasHalf && (
          <span key="half" className="slice slice-half" aria-hidden="true">
            🍕
          </span>
        )}

        {/* Empty slices */}
        {Array(emptySlices).fill(null).map((_, i) => (
          <span key={`empty-${i}`} className="slice slice-empty" aria-hidden="true">
            🍕
          </span>
        ))}
      </div>

      {showNumeric && (
        <span className="rating-numeric">{rating.toFixed(1)}/10</span>
      )}
    </div>
  );
}

export default RatingDisplay;
