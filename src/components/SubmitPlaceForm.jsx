import React, { useState } from 'react';

export function SubmitPlaceForm({ onSubmit, onClose }) {
  const [name, setName] = useState('');
  const [googleMapsLink, setGoogleMapsLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateGoogleMapsLink = (link) => {
    // Basic validation for Google Maps URLs
    const patterns = [
      /^https?:\/\/(www\.)?google\.(com|[a-z]{2,3})\/maps/,
      /^https?:\/\/maps\.google\.(com|[a-z]{2,3})/,
      /^https?:\/\/goo\.gl\/maps/,
      /^https?:\/\/maps\.app\.goo\.gl/
    ];
    return patterns.some(pattern => pattern.test(link));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Pizza place name is required';
    } else if (name.length > 100) {
      newErrors.name = 'Name must be 100 characters or less';
    }

    if (!googleMapsLink.trim()) {
      newErrors.googleMapsLink = 'Google Maps link is required';
    } else if (!validateGoogleMapsLink(googleMapsLink)) {
      newErrors.googleMapsLink = 'Please enter a valid Google Maps link';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await onSubmit({
        name: name.trim(),
        google_maps_link: googleMapsLink.trim()
      });
    } catch (error) {
      setErrors({ submit: 'Failed to submit suggestion. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="submit-place-overlay" onClick={onClose}>
      <div
        className="submit-place-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Suggest a new pizza place"
      >
        {/* Header */}
        <header className="form-header">
          <button
            className="form-close"
            onClick={onClose}
            aria-label="Close form"
          >
            ×
          </button>
          <h2>Suggest a Pizza Place</h2>
          <p className="form-subtitle">Know a great slice spot we're missing?</p>
        </header>

        {/* Form */}
        <form className="submit-place-form" onSubmit={handleSubmit}>
          {/* Place Name */}
          <div className="form-group">
            <label htmlFor="place-name">Pizza Place Name *</label>
            <input
              type="text"
              id="place-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Tony's Famous Pizza"
              maxLength={100}
              disabled={isSubmitting}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <span id="name-error" className="error-text">{errors.name}</span>
            )}
          </div>

          {/* Google Maps Link */}
          <div className="form-group">
            <label htmlFor="maps-link">Google Maps Link *</label>
            <input
              type="url"
              id="maps-link"
              value={googleMapsLink}
              onChange={(e) => setGoogleMapsLink(e.target.value)}
              placeholder="https://maps.google.com/..."
              disabled={isSubmitting}
              aria-invalid={!!errors.googleMapsLink}
              aria-describedby={errors.googleMapsLink ? 'link-error' : undefined}
            />
            <span className="form-hint">
              Open the place in Google Maps and copy the URL from the address bar
            </span>
            {errors.googleMapsLink && (
              <span id="link-error" className="error-text">{errors.googleMapsLink}</span>
            )}
          </div>

          {/* Info Note */}
          <div className="info-note">
            <span className="info-icon">ℹ️</span>
            <p>
              Submissions are reviewed by our team before being added to the map.
              We'll check that it's a real pizza place in NYC!
            </p>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="submit-error" role="alert">
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Submitting...
              </>
            ) : (
              '📍 Submit Suggestion'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitPlaceForm;
