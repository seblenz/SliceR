import React from 'react';

export function Header({ reviewsRemaining, onSuggestPlace }) {
  return (
    <header className="header">
      <div className="header-logo">
        <span className="logo-emoji">🍕</span>
        <h1 className="logo-text">SliceR</h1>
      </div>

      <div className="header-actions">
        <div className="review-counter" title="Reviews remaining today">
          <span className="counter-emoji">🍕</span>
          <span className="counter-text">{reviewsRemaining} slices left today</span>
        </div>

        <button
          className="suggest-btn"
          onClick={onSuggestPlace}
          aria-label="Suggest a new pizza place"
        >
          + Suggest a Place
        </button>
      </div>
    </header>
  );
}

export default Header;
