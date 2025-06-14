import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import reviewService from '../../services/reviewService';
import './ReviewModal.css';

const ReviewModal = ({ isOpen, onClose, cafe, onReviewSubmitted }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !cafe) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Silakan login terlebih dahulu');
      return;
    }

    if (!comment.trim()) {
      setError('Mohon tulis review Anda');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const reviewData = {
        userName: user.name,
        userPhoto: user.picture,
        rating,
        comment: comment.trim(),
        visitDate: new Date().toISOString()
      };

      await reviewService.addReview(cafe.id, user.id, reviewData);
      
      // Reset form
      setRating(5);
      setComment('');
      
      // Notify parent component
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
      
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Gagal mengirim review. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose();
    }
  };

  return (
    <div className="review-modal-overlay" onClick={handleOverlayClick}>
      <div className="review-modal">
        <button 
          className="review-modal-close" 
          onClick={onClose}
          disabled={isSubmitting}
        >
          ×
        </button>

        <div className="review-modal-header">
          <h2>Review {cafe.name}</h2>
          <p className="cafe-location">{cafe.address}</p>
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          <div className="rating-section">
            <label>Rating</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${star <= rating ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                  disabled={isSubmitting}
                >
                  ★
                </button>
              ))}
              <span className="rating-text">{rating}/5</span>
            </div>
          </div>

          <div className="comment-section">
            <label htmlFor="comment">Bagaimana pengalaman Anda?</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ceritakan pengalaman Anda di cafe ini..."
              rows={6}
              maxLength={500}
              disabled={isSubmitting}
            />
            <div className="char-count">{comment.length}/500</div>
          </div>

          {error && (
            <div className="error-message">{error}</div>
          )}

          <div className="review-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Mengirim...' : 'Kirim Review'}
            </button>
          </div>
        </form>

        {user && (
          <div className="review-author-preview">
            <img src={user.picture} alt={user.name} />
            <span>{user.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;