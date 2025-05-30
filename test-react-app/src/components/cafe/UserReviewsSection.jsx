import React, { useState } from 'react';
import './UserReviewsSection.css';

const UserReviewsSection = ({ cafeId, cafeName }) => {
  const [reviews, setReviews] = useState([]);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    text: '',
    visitType: '',
    wouldRecommend: null
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  // Handle rating selection
  const handleRatingClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  // Handle form submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (newReview.rating === 0 || !newReview.title || !newReview.text) {
      alert('Please fill in all required fields');
      return;
    }

    // Create new review object
    const review = {
      id: Date.now(),
      user: {
        name: 'You', // In real app, this would come from user session
        avatar: 'https://ui-avatars.com/api/?name=User&background=F05438&color=fff',
        reviewCount: 1
      },
      rating: newReview.rating,
      title: newReview.title,
      text: newReview.text,
      visitType: newReview.visitType,
      wouldRecommend: newReview.wouldRecommend,
      date: new Date().toISOString(),
      helpful: 0
    };

    // Add to reviews list
    setReviews([review, ...reviews]);
    
    // Reset form and close modal
    setNewReview({
      rating: 0,
      title: '',
      text: '',
      visitType: '',
      wouldRecommend: null
    });
    setShowWriteReview(false);
  };

  // Render stars for rating
  const renderStars = (rating, interactive = false, size = 'normal') => {
    const stars = [];
    const displayRating = interactive ? (hoveredRating || newReview.rating) : rating;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= displayRating ? 'filled' : ''} ${interactive ? 'interactive' : ''} ${size}`}
          onClick={interactive ? () => handleRatingClick(i) : undefined}
          onMouseEnter={interactive ? () => setHoveredRating(i) : undefined}
          onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
        >
          ★
        </span>
      );
    }
    
    return <div className="stars-container">{stars}</div>;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="user-reviews-section">
      <div className="reviews-header">
        <h2>Cafinder Reviews</h2>
        <button 
          className="write-review-button"
          onClick={() => setShowWriteReview(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
          </svg>
          Write a Review
        </button>
      </div>

      {reviews.length === 0 ? (
        <div className="no-reviews-yet">
          <div className="no-reviews-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#E5E7EB"/>
              <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#E5E7EB"/>
              <circle cx="12" cy="12" r="2" fill="#E5E7EB"/>
            </svg>
          </div>
          <h3>No reviews yet</h3>
          <p>Be the first to share your experience at {cafeName}</p>
          <button 
            className="first-review-button"
            onClick={() => setShowWriteReview(true)}
          >
            Write the First Review
          </button>
        </div>
      ) : (
        <div className="reviews-list">
          {reviews.map(review => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <img 
                    src={review.user.avatar} 
                    alt={review.user.name}
                    className="reviewer-avatar"
                  />
                  <div className="reviewer-details">
                    <h4>{review.user.name}</h4>
                    <span className="review-meta">{review.user.reviewCount} reviews</span>
                  </div>
                </div>
                <div className="review-date">{formatDate(review.date)}</div>
              </div>
              
              <div className="review-rating">
                {renderStars(review.rating)}
                <span className="visit-type">{review.visitType}</span>
              </div>
              
              <h3 className="review-title">{review.title}</h3>
              <p className="review-text">{review.text}</p>
              
              {review.wouldRecommend !== null && (
                <div className="review-recommendation">
                  {review.wouldRecommend ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#10B981">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span>Would recommend</span>
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#EF4444">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      <span>Would not recommend</span>
                    </>
                  )}
                </div>
              )}
              
              <div className="review-actions">
                <button className="helpful-button">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" fill="currentColor"/>
                  </svg>
                  Helpful ({review.helpful})
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="review-modal-overlay" onClick={() => setShowWriteReview(false)}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Write a Review for {cafeName}</h2>
              <button 
                className="close-modal"
                onClick={() => setShowWriteReview(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="form-group">
                <label>Your Rating *</label>
                <div className="rating-input">
                  {renderStars(0, true, 'large')}
                  <span className="rating-text">
                    {newReview.rating === 0 ? 'Click to rate' : 
                     newReview.rating === 1 ? 'Terrible' :
                     newReview.rating === 2 ? 'Poor' :
                     newReview.rating === 3 ? 'Average' :
                     newReview.rating === 4 ? 'Very Good' : 'Excellent'}
                  </span>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="review-title">Review Title *</label>
                <input
                  id="review-title"
                  type="text"
                  placeholder="Summarize your visit or highlight an interesting detail"
                  value={newReview.title}
                  onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  maxLength="100"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="review-text">Your Review *</label>
                <textarea
                  id="review-text"
                  placeholder="Tell others about your experience: describe the place or activity, recommendations for travellers?"
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  rows="6"
                  minLength="50"
                />
                <span className="char-count">{newReview.text.length} characters (minimum 50)</span>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="visit-type">Type of Visit</label>
                  <select
                    id="visit-type"
                    value={newReview.visitType}
                    onChange={(e) => setNewReview({ ...newReview, visitType: e.target.value })}
                  >
                    <option value="">Select...</option>
                    <option value="Solo">Solo</option>
                    <option value="Couple">Couple</option>
                    <option value="Family">Family</option>
                    <option value="Friends">Friends</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Would you recommend this cafe?</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="recommend"
                        value="yes"
                        checked={newReview.wouldRecommend === true}
                        onChange={() => setNewReview({ ...newReview, wouldRecommend: true })}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="recommend"
                        value="no"
                        checked={newReview.wouldRecommend === false}
                        onChange={() => setNewReview({ ...newReview, wouldRecommend: false })}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowWriteReview(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={newReview.rating === 0 || !newReview.title || newReview.text.length < 50}
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserReviewsSection;