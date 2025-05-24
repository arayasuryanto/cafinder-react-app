import React, { useState } from 'react';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  const [helpfulCount, setHelpfulCount] = useState(Math.floor(Math.random() * 5));
  const [isHelpful, setIsHelpful] = useState(false);
  
  // Handle helpful button click
  const handleHelpfulClick = () => {
    if (!isHelpful) {
      setHelpfulCount(helpfulCount + 1);
      setIsHelpful(true);
    } else {
      setHelpfulCount(helpfulCount - 1);
      setIsHelpful(false);
    }
  };
  
  // Render star rating
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(Number(rating) || 0);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="review-star filled">★</span>);
      } else {
        stars.push(<span key={i} className="review-star">★</span>);
      }
    }
    
    return stars;
  };
  
  // Generate a review title based on rating (in a real app, this would come from the review data)
  const getReviewTitle = (rating) => {
    const titles = [
      "Disappointing experience",
      "Could be better",
      "Average place, nothing special",
      "Great place to visit",
      "Absolutely fantastic!"
    ];
    
    const ratingIndex = Math.min(Math.max(Math.floor(Number(rating) || 0) - 1, 0), 4);
    return titles[ratingIndex];
  };
  
  // Format visit date
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    } catch (e) {
      return dateString; // Return as is if parsing fails
    }
  };
  
  // Calculate visit type (would normally come from data)
  const getVisitType = () => {
    const types = ["Friends", "Family", "Couple", "Business", "Solo"];
    return types[Math.floor(Math.random() * types.length)];
  };

  if (!review) return null;

  return (
    <div className="review-card-tripadvisor">
      <div className="review-card-header">
        <div className="reviewer-info">
          <img src={review.user?.image || 'https://via.placeholder.com/50?text=User'} 
               alt={review.user?.name || 'Anonymous'} 
               className="reviewer-img" />
          <div className="reviewer-details">
            <h4 className="reviewer-name">{review.user?.name || 'Anonymous'}</h4>
            <div className="reviewer-stats">
              <span className="review-count">{review.user?.reviewCount || 1} reviews</span>
              {review.user?.location && (
                <>
                  <span className="stat-separator">•</span>
                  <span className="reviewer-location">{review.user.location}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="review-rating">
          {renderRatingStars(review.rating)}
        </div>
      </div>
      
      <h3 className="review-title">{review.title || getReviewTitle(review.rating)}</h3>
      
      <div className="review-meta">
        <div className="review-date">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="#666"/>
          </svg>
          <span>Visited {formatDate(review.date)}</span>
        </div>
        <div className="review-type">{review.visitType || getVisitType()}</div>
      </div>
      
      <p className="review-text">{review.text}</p>
      
      {review.images && review.images.length > 0 && (
        <div className="review-images">
          {review.images.map((image, index) => (
            <div key={index} className="review-image-container">
              <img src={image.url} alt={`Review ${index + 1}`} className="review-image" />
            </div>
          ))}
        </div>
      )}
      
      <div className="review-footer">
        <div className="review-helpful">
          <button 
            className={`helpful-btn ${isHelpful ? 'active' : ''}`}
            onClick={handleHelpfulClick}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 21H5V9H1V21ZM23 10C23 8.9 22.1 8 21 8H14.69L15.64 3.43L15.67 3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.59C7.22 7.95 7 8.45 7 9V19C7 20.1 7.9 21 9 21H18C18.83 21 19.54 20.5 19.84 19.78L22.86 12.73C22.95 12.5 23 12.26 23 12V10Z" fill="currentColor"/>
            </svg>
            Helpful
          </button>
          {helpfulCount > 0 && (
            <span className="helpful-count">{helpfulCount}</span>
          )}
        </div>
        
        <button className="share-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="currentColor"/>
          </svg>
          Share
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;