import React, { useState } from 'react';

export function RatingSelector({ value, onChange, disabled = false }) {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (rating) => {
    if (!disabled) {
      onChange(rating);
    }
  };

  const handleKeyDown = (e, rating) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(rating);
    }
  };

  const displayValue = hoverValue || value;

  return (
    <div
      className={`rating-selector ${disabled ? 'rating-disabled' : ''}`}
      role="radiogroup"
      aria-label="Select rating from 1 to 10"
    >
      <div className="rating-slices-interactive">
        {Array(10).fill(null).map((_, i) => {
          const rating = i + 1;
          const isActive = rating <= displayValue;

          return (
            <button
              key={rating}
              type="button"
              className={`slice-btn ${isActive ? 'slice-active' : 'slice-inactive'}`}
              onClick={() => handleClick(rating)}
              onMouseEnter={() => !disabled && setHoverValue(rating)}
              onMouseLeave={() => setHoverValue(0)}
              onKeyDown={(e) => handleKeyDown(e, rating)}
              disabled={disabled}
              role="radio"
              aria-checked={value === rating}
              aria-label={`${rating} out of 10`}
              tabIndex={value === rating ? 0 : -1}
            >
              🍕
            </button>
          );
        })}
      </div>

      <div className="rating-value">
        {value > 0 ? (
          <span className="value-text">{value}/10</span>
        ) : (
          <span className="value-placeholder">Tap to rate</span>
        )}
      </div>
    </div>
  );
}

export default RatingSelector;
