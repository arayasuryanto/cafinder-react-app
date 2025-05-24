import React from 'react';

const GoogleReviewsSection = ({ cafeData }) => {
  // Mock Google reviews data for now - since we don't have actual Google reviews in our data
  // This will show the Google rating and review count from our data
  
  if (!cafeData.rating || !cafeData.reviewCount) {
    return null;
  }

  return (
    <div className="google-reviews-section">
      <div className="google-reviews-header">
        <h3 className="section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.255H17.92C17.665 15.63 16.89 16.795 15.725 17.575V20.335H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
            <path d="M12 23C15.24 23 17.955 21.925 19.28 20.335L15.725 17.575C14.745 18.235 13.48 18.625 12 18.625C8.875 18.625 6.23 16.69 5.345 13.975H1.68V16.825C3.005 19.455 7.16 23 12 23Z" fill="#34A853"/>
            <path d="M5.345 13.975C5.125 13.315 5 12.615 5 11.875C5 11.135 5.125 10.435 5.345 9.775V6.925H1.68C0.92 8.44 0.5 10.115 0.5 11.875C0.5 13.635 0.92 15.31 1.68 16.825L5.345 13.975Z" fill="#FBBC05"/>
            <path d="M12 5.125C13.615 5.125 15.065 5.71 16.205 6.79L19.36 3.635C17.95 2.34 15.24 1.5 12 1.5C7.16 1.5 3.005 4.545 1.68 7.175L5.345 10.025C6.23 7.31 8.875 5.375 12 5.375L12 5.125Z" fill="#EA4335"/>
          </svg>
          Google Reviews
        </h3>
        <div className="google-rating-summary">
          <div className="google-overall-rating">
            <span className="big-rating">{parseFloat(cafeData.rating).toFixed(1)}</span>
            <div className="rating-stars">
              {Array(5).fill(0).map((_, i) => (
                <span key={i} className={i < Math.floor(parseFloat(cafeData.rating)) ? 'filled' : ''}>★</span>
              ))}
            </div>
            <p className="review-count">{cafeData.reviewCount} Google reviews</p>
          </div>
        </div>
      </div>
      
      <div className="google-reviews-notice">
        <p>
          This rating and review count comes from Google Maps. 
          <a 
            href={cafeData.google_maps_direction} 
            target="_blank" 
            rel="noopener noreferrer"
            className="view-google-link"
          >
            View all reviews on Google Maps
          </a>
        </p>
      </div>
    </div>
  );
};

export default GoogleReviewsSection;