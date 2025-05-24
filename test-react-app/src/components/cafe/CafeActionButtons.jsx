import React from 'react';

const CafeActionButtons = ({ cafe }) => {
  // Prepare Google Maps directions URL if coordinates are available
  const getDirectionsUrl = () => {
    if (cafe.coordinates && cafe.coordinates.lat && cafe.coordinates.lng) {
      return `https://www.google.com/maps/dir/?api=1&destination=${cafe.coordinates.lat},${cafe.coordinates.lng}`;
    }
    // Fallback to address search if no coordinates
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.fullAddress || cafe.address || cafe.name)}`;
  };

  // Handle phone call
  const handleCall = () => {
    if (cafe.contactInfo && cafe.contactInfo.phone) {
      window.location.href = `tel:${cafe.contactInfo.phone.replace(/\s+/g, '')}`;
    }
  };

  // Handle menu view (if available)
  const handleViewMenu = () => {
    // Check for a menu URL in the cafe data
    if (cafe.menuUrl) {
      window.open(cafe.menuUrl, '_blank', 'noopener,noreferrer');
    } else if (cafe.contactInfo && cafe.contactInfo.website) {
      // If no direct menu URL, open website as fallback
      window.open(cafe.contactInfo.website, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="action-buttons">
      <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="primary-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.71 11.29L12.71 2.29C12.32 1.9 11.69 1.9 11.3 2.29L2.3 11.29C1.91 11.68 1.91 12.31 2.3 12.7C2.69 13.09 3.32 13.09 3.71 12.7L11 5.41V21C11 21.55 11.45 22 12 22C12.55 22 13 21.55 13 21V5.41L20.29 12.7C20.48 12.89 20.74 13 21 13C21.26 13 21.52 12.89 21.71 12.7C22.1 12.31 22.1 11.68 21.71 11.29Z" fill="white"/>
        </svg>
        Get Directions
      </a>

      <button className="secondary-btn" onClick={handleViewMenu}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 16.5C18.33 16.5 19.41 15.41 19.41 14.09C19.41 12 16.67 11.08 13 10.28C16.67 9.48 19.41 8.56 19.41 6.47C19.41 5.15 18.33 4.06 17 4.06C15.67 4.06 14.59 5.15 14.59 6.47V6.5C14.59 6.78 14.37 7 14.09 7C13.81 7 13.59 6.78 13.59 6.5V6.47C13.59 5.15 12.51 4.06 11.19 4.06C9.86 4.06 8.78 5.15 8.78 6.47V7.75L8.78 9.03V14.97V16.25V17.53C8.78 18.85 9.86 19.94 11.19 19.94C12.51 19.94 13.59 18.85 13.59 17.53V17.5C13.59 17.22 13.81 17 14.09 17C14.37 17 14.59 17.22 14.59 17.5V17.53C14.59 18.85 15.67 19.94 17 19.94C18.33 19.94 19.41 18.85 19.41 17.53C19.41 15.44 16.67 14.52 13 13.72C16.67 12.92 19.41 11.5 19.41 9.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Menu
      </button>

      {cafe.contactInfo && cafe.contactInfo.phone && (
        <button className="secondary-btn" onClick={handleCall}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor"/>
          </svg>
          Call
        </button>
      )}
    </div>
  );
};

export default CafeActionButtons;