import React from 'react';
import './ReviewSummary.css';

const ReviewSummary = ({ reviews = [], rating = 0, totalReviews = 0 }) => {
  // Calculate review distribution percentages
  const getRatingCounts = () => {
    const counts = [0, 0, 0, 0, 0]; // Initialize counts for 5, 4, 3, 2, 1 stars
    
    if (reviews && reviews.length > 0) {
      reviews.forEach(review => {
        const rating = Math.floor(Number(review.rating) || 0);
        if (rating > 0 && rating <= 5) {
          counts[5 - rating]++; // Index 0 is for 5 stars, 1 for 4 stars, etc.
        }
      });
    }
    
    return counts;
  };
  
  const ratingCounts = getRatingCounts();
  
  // Calculate percentages for progress bars
  const getPercentage = (count) => {
    if (!totalReviews || totalReviews === 0) return 0;
    return Math.round((count / totalReviews) * 100);
  };
  
  // Calculate rating distribution
  const ratingDistribution = ratingCounts.map((count, index) => ({
    stars: 5 - index,
    count,
    percentage: getPercentage(count)
  }));
  
  // Sample category ratings (in a real app, these would come from data)
  const categoryRatings = [
    { name: 'Food', rating: 4.5 },
    { name: 'Service', rating: 4.2 },
    { name: 'Value', rating: 3.8 },
    { name: 'Atmosphere', rating: 4.7 }
  ];
  
  // Helper to render stars
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="summary-star filled">★</span>);
      } else if (i === fullStars && halfStar) {
        stars.push(<span key={i} className="summary-star half-filled">★</span>);
      } else {
        stars.push(<span key={i} className="summary-star">★</span>);
      }
    }
    
    return stars;
  };

  return (
    <div className="review-summary">
      <div className="summary-header">
        <h2>Reviews</h2>
        <button className="write-review-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="white"/>
          </svg>
          Write a Review
        </button>
      </div>
      
      <div className="review-overview">
        <div className="overall-rating">
          <div className="rating-number">{rating.toFixed(1)}</div>
          <div className="rating-stars">{renderRatingStars(rating)}</div>
          <div className="rating-count">{totalReviews} reviews</div>
        </div>
        
        <div className="rating-distribution">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="rating-bar">
              <div className="bar-label">{item.stars} stars</div>
              <div className="bar-container">
                <div className="bar-fill" style={{ width: `${item.percentage}%` }}></div>
              </div>
              <div className="bar-percent">{item.percentage}%</div>
              <div className="bar-count">({item.count})</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="category-ratings">
        <h3>Rating by Category</h3>
        <div className="category-grid">
          {categoryRatings.map((category, index) => (
            <div key={index} className="category-item">
              <div className="category-name">{category.name}</div>
              <div className="category-rating-wrapper">
                <div className="category-rating-stars">
                  {renderRatingStars(category.rating)}
                </div>
                <div className="category-rating-value">{category.rating.toFixed(1)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="reviews-filter">
        <div className="filter-options">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Excellent</button>
          <button className="filter-btn">Very Good</button>
          <button className="filter-btn">Average</button>
          <button className="filter-btn">Poor</button>
        </div>
        <div className="sort-dropdown">
          <select>
            <option>Most Recent</option>
            <option>Highest Rated</option>
            <option>Lowest Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;