import React, { useState, useEffect } from 'react';
import RatingSelector from './RatingSelector';
import { sliceTypes, pizzaStyles } from '../data/initialPizzaPlaces';
import { uploadImage, createPreviewUrl, revokePreviewUrl, validateImage } from '../services/imageUpload';

export function ReviewForm({ place, onSubmit, onClose, canReview }) {
  const [nickname, setNickname] = useState('');
  const [sliceType, setSliceType] = useState('');
  const [pizzaStyle, setPizzaStyle] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Cleanup image preview URL on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) {
        revokePreviewUrl(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImage(file);
    if (!validation.valid) {
      setErrors({ ...errors, image: validation.error });
      return;
    }

    // Revoke previous preview URL
    if (imagePreview) {
      revokePreviewUrl(imagePreview);
    }

    setImageFile(file);
    setImagePreview(createPreviewUrl(file));
    setErrors({ ...errors, image: null });
  };

  const removeImage = () => {
    if (imagePreview) {
      revokePreviewUrl(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!nickname.trim()) {
      newErrors.nickname = 'Nickname is required';
    } else if (nickname.length > 30) {
      newErrors.nickname = 'Nickname must be 30 characters or less';
    }

    if (!sliceType) {
      newErrors.sliceType = 'Please select a slice type';
    }

    if (!pizzaStyle) {
      newErrors.pizzaStyle = 'Please select a pizza style';
    }

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || !canReview) return;

    setIsSubmitting(true);

    try {
      let photoUrl = null;

      // Upload image if present
      if (imageFile) {
        try {
          photoUrl = await uploadImage(imageFile);
        } catch (error) {
          console.warn('Image upload failed, submitting without photo:', error);
        }
      }

      const reviewData = {
        nickname: nickname.trim(),
        slice_type: sliceType,
        pizza_style: pizzaStyle,
        rating,
        comment: comment.trim() || null,
        photo_url: photoUrl
      };

      await onSubmit(reviewData);
    } catch (error) {
      setErrors({ submit: 'Failed to submit review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form-overlay" onClick={onClose}>
      <div
        className="review-form-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={`Rate your slice at ${place.name}`}
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
          <h2>Rate Your Slice</h2>
          <p className="form-subtitle">at {place.name}</p>
        </header>

        {/* Form */}
        <form className="review-form" onSubmit={handleSubmit}>
          {/* Nickname */}
          <div className="form-group">
            <label htmlFor="nickname">Nickname *</label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="e.g., PizzaLover123"
              maxLength={30}
              disabled={isSubmitting}
              aria-invalid={!!errors.nickname}
              aria-describedby={errors.nickname ? 'nickname-error' : undefined}
            />
            {errors.nickname && (
              <span id="nickname-error" className="error-text">{errors.nickname}</span>
            )}
          </div>

          {/* Slice Type */}
          <div className="form-group">
            <label htmlFor="slice-type">Slice Type *</label>
            <select
              id="slice-type"
              value={sliceType}
              onChange={(e) => setSliceType(e.target.value)}
              disabled={isSubmitting}
              aria-invalid={!!errors.sliceType}
            >
              <option value="">Select slice type...</option>
              {sliceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.sliceType && (
              <span className="error-text">{errors.sliceType}</span>
            )}
          </div>

          {/* Pizza Style */}
          <div className="form-group">
            <label htmlFor="pizza-style">Pizza Style *</label>
            <select
              id="pizza-style"
              value={pizzaStyle}
              onChange={(e) => setPizzaStyle(e.target.value)}
              disabled={isSubmitting}
              aria-invalid={!!errors.pizzaStyle}
            >
              <option value="">Select pizza style...</option>
              {pizzaStyles.map(style => (
                <option key={style} value={style}>{style}</option>
              ))}
            </select>
            {errors.pizzaStyle && (
              <span className="error-text">{errors.pizzaStyle}</span>
            )}
          </div>

          {/* Rating */}
          <div className="form-group">
            <label>Rating *</label>
            <RatingSelector
              value={rating}
              onChange={setRating}
              disabled={isSubmitting}
            />
            {errors.rating && (
              <span className="error-text">{errors.rating}</span>
            )}
          </div>

          {/* Comment */}
          <div className="form-group">
            <label htmlFor="comment">Comment (optional)</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this slice..."
              rows={3}
              maxLength={500}
              disabled={isSubmitting}
            />
            <span className="char-count">{comment.length}/500</span>
          </div>

          {/* Photo Upload */}
          <div className="form-group">
            <label>Photo (optional)</label>
            {!imagePreview ? (
              <div className="photo-upload">
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                  className="photo-input"
                />
                <label htmlFor="photo" className="photo-label">
                  📷 Add Photo
                </label>
              </div>
            ) : (
              <div className="photo-preview">
                <img src={imagePreview} alt="Preview of your upload" />
                <button
                  type="button"
                  className="remove-photo"
                  onClick={removeImage}
                  disabled={isSubmitting}
                  aria-label="Remove photo"
                >
                  ×
                </button>
              </div>
            )}
            {errors.image && (
              <span className="error-text">{errors.image}</span>
            )}
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
            disabled={isSubmitting || !canReview}
          >
            {isSubmitting ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Submitting...
              </>
            ) : (
              '🍕 Submit Review'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;
