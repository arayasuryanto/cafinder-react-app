import React, { useState } from 'react';

const CafinderReviewsSection = ({ cafeId }) => {
  const [userReviews, setUserReviews] = useState([]);
  const [showWriteReview, setShowWriteReview] = useState(false);

  return (
    <div className="cafinder-reviews-section">
      <div className="cafinder-reviews-header">
        <h3 className="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#F05438"/>
            <path d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z" fill="#F05438"/>
          </svg>
          Cafinder User Reviews
        </h3>
        <button 
          className="write-review-btn"
          onClick={() => setShowWriteReview(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>
          </svg>
          Write a Review
        </button>
      </div>

      {userReviews.length === 0 ? (
        <div className="no-reviews-state">
          <div className="no-reviews-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#E5E7EB"/>
              <path d="M12 15C13.1046 15 14 14.1046 14 13C14 11.8954 13.1046 11 12 11C10.8954 11 10 11.8954 10 13C10 14.1046 10.8954 15 12 15Z" fill="#E5E7EB"/>
              <path d="M8.21 7.21C7.82 7.6 7.82 8.23 8.21 8.62C8.6 9.01 9.23 9.01 9.62 8.62L11 7.24L12.38 8.62C12.77 9.01 13.4 9.01 13.79 8.62C14.18 8.23 14.18 7.6 13.79 7.21L12.41 5.83C12.02 5.44 11.39 5.44 11 5.83L8.21 7.21Z" fill="#E5E7EB"/>
            </svg>
          </div>
          <h4>No Cafinder reviews yet</h4>
          <p>Be the first to share your experience at this cafe!</p>
          <button 
            className="write-first-review-btn"
            onClick={() => setShowWriteReview(true)}
          >
            Write the First Review
          </button>
        </div>
      ) : (
        <div className="user-reviews-list">
          {userReviews.map(review => (
            <div key={review.id} className="user-review-card">
              {/* User review content would go here */}
            </div>
          ))}
        </div>
      )}

      {/* Write Review Modal/Form */}
      {showWriteReview && (
        <div className="write-review-modal">
          <div className="modal-overlay" onClick={() => setShowWriteReview(false)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Write a Review</h3>
              <button 
                className="close-modal"
                onClick={() => setShowWriteReview(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <p className="feature-notice">
                ✨ <strong>Coming Soon!</strong> User reviews will be available in the next update. 
                This feature will allow Cafinder users to share their experiences and rate cafes.
              </p>
              <p>
                For now, you can view Google reviews and ratings above. 
                Stay tuned for our user review system!
              </p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-secondary"
                onClick={() => setShowWriteReview(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CafinderReviewsSection;