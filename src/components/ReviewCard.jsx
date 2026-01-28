import React, { useState } from 'react';
import RatingDisplay from './RatingDisplay';

export function ReviewCard({ review, onAddComment }) {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentNickname, setCommentNickname] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!commentNickname.trim() || !commentText.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddComment({
        nickname: commentNickname.trim(),
        text: commentText.trim()
      });
      setCommentNickname('');
      setCommentText('');
      setShowCommentForm(false);
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="review-card">
      <header className="review-header">
        <div className="review-meta">
          <span className="review-nickname">{review.nickname}</span>
          <span className="review-date">{formatDate(review.timestamp)}</span>
        </div>
        <RatingDisplay rating={review.rating} size="small" />
      </header>

      <div className="review-details">
        <span className="review-slice-type">{review.slice_type}</span>
        <span className="review-divider">•</span>
        <span className="review-pizza-style">{review.pizza_style}</span>
      </div>

      {review.comment && (
        <p className="review-comment">{review.comment}</p>
      )}

      {review.photo_url && (
        <div className="review-photo">
          <img
            src={review.photo_url}
            alt={`${review.slice_type} pizza from review`}
            loading="lazy"
          />
        </div>
      )}

      {/* Comments Section */}
      <div className="review-comments">
        {review.comments && review.comments.length > 0 && (
          <div className="comments-list">
            {review.comments.map((comment, index) => (
              <div key={index} className="comment">
                <span className="comment-nickname">{comment.nickname}</span>
                <span className="comment-text">{comment.text}</span>
              </div>
            ))}
          </div>
        )}

        {!showCommentForm ? (
          <button
            className="add-comment-btn"
            onClick={() => setShowCommentForm(true)}
            type="button"
          >
            💬 Add Comment
          </button>
        ) : (
          <form className="comment-form" onSubmit={handleSubmitComment}>
            <input
              type="text"
              placeholder="Your nickname"
              value={commentNickname}
              onChange={(e) => setCommentNickname(e.target.value)}
              maxLength={30}
              required
              disabled={isSubmitting}
            />
            <textarea
              placeholder="Your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              maxLength={500}
              rows={2}
              required
              disabled={isSubmitting}
            />
            <div className="comment-form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setShowCommentForm(false);
                  setCommentNickname('');
                  setCommentText('');
                }}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-comment-btn"
                disabled={isSubmitting || !commentNickname.trim() || !commentText.trim()}
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>
        )}
      </div>
    </article>
  );
}

export default ReviewCard;
