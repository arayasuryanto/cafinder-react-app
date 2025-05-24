import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CafeDetails = ({ cafe }) => {
  const headerRef = useRef(null);
  const overviewRef = useRef(null);
  
  // Format rating display
  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : "N/A";
  };
  
  // Get current day index (0 = Sunday, 1 = Monday, etc.)
  const currentDayIndex = new Date().getDay();
  
  // Get day name from index
  const getDayNameFromIndex = (index) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[index];
  };
  
  // Get today's opening hours if available
  const getTodayHours = () => {
    if (!cafe.openingHours) return null;
    
    const dayName = getDayNameFromIndex(currentDayIndex);
    if (cafe.openingHours[dayName]) {
      return `${cafe.openingHours[dayName].open} - ${cafe.openingHours[dayName].close}`;
    }
    
    // Try getting hours by index if day name doesn't work
    const dayKeys = Object.keys(cafe.openingHours);
    if (currentDayIndex < dayKeys.length) {
      const hours = cafe.openingHours[dayKeys[currentDayIndex]];
      return hours.open === 'Closed' ? 'Closed' : `${hours.open} - ${hours.close}`;
    }
    
    return "Hours not available";
  };
  
  // GSAP animations
  useEffect(() => {
    if (headerRef.current) {
      // Animate header elements
      gsap.from(headerRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.6,
        ease: "power3.out"
      });
    }
    
    if (overviewRef.current) {
      // Animate overview items
      gsap.from(overviewRef.current.children, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.3,
        ease: "power3.out"
      });
    }
  }, []);
  
  return (
    <div className="cafe-details">
      <div className="cafe-header" ref={headerRef}>
        <div className="cafe-title">
          <h1>{cafe.name}</h1>
          <div className="cafe-region">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
            </svg>
            {cafe.region}
          </div>
          {cafe.tags && cafe.tags.length > 0 && (
            <div className="cafe-tags">
              {cafe.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="feature-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
        <div className="cafe-actions">
          <button className="action-btn share-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="currentColor"/>
            </svg>
            Share
          </button>
          <button className="action-btn save-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" fill="currentColor"/>
            </svg>
            Save
          </button>
        </div>
      </div>
      
      <div className="overview-section">
        <h2 className="section-title">At a glance</h2>
        <div className="overview-grid" ref={overviewRef}>
          <div className="overview-item">
            <div className="overview-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
            </div>
            <span className="overview-label">Rating</span>
            <span className="overview-value">{formatRating(cafe.rating)}</span>
          </div>
          
          {cafe.priceRange && (
            <div className="overview-item">
              <div className="overview-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="overview-label">Price Range</span>
              <span className="overview-value">{cafe.priceRange}</span>
            </div>
          )}
          
          {cafe.totalReviews !== undefined && (
            <div className="overview-item">
              <div className="overview-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4C14.2 4 16 5.8 16 8C16 10.2 14.2 12 12 12C9.8 12 8 10.2 8 8C8 5.8 9.8 4 12 4ZM12 14C16.4 14 20 15.8 20 18V20H4V18C4 15.8 7.6 14 12 14Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="overview-label">Reviews</span>
              <span className="overview-value">{cafe.totalReviews}</span>
            </div>
          )}
          
          {cafe.priceRange && (
            <div className="overview-item">
              <div className="overview-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 17H13V16H14C14.55 16 15 15.55 15 15V12C15 11.45 14.55 11 14 11H11V10H15V8H13V7H11V8H10C9.45 8 9 8.45 9 9V12C9 12.55 9.45 13 10 13H13V14H9V16H11V17ZM20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V6H20V18Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="overview-label">Price Level</span>
              <span className="overview-value">
                {cafe.priceRange === "$" ? "Affordable" : 
                 cafe.priceRange === "$$" ? "Moderate" : "Premium"}
              </span>
            </div>
          )}
          
          {cafe.tags && cafe.tags.length > 0 && (
            <div className="overview-item">
              <div className="overview-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="overview-label">For</span>
              <span className="overview-value">{cafe.tags[0]}</span>
            </div>
          )}
          
          {cafe.openingHours && (
            <div className="overview-item">
              <div className="overview-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 12H12V17H17V12ZM16.5 3H15V1H13V3H7V1H5V3H3.5C2.67 3 2.01 3.67 2.01 4.5V19.5C2.01 20.33 2.67 21 3.5 21H16.5C17.33 21 18 20.33 18 19.5V4.5C18 3.67 17.33 3 16.5 3ZM16 19H5V8H16V19Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="overview-label">Open Today</span>
              <span className="overview-value">
                {getTodayHours()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CafeDetails;