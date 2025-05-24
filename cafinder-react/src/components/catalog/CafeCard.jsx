import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CafeCard = ({ cafe }) => {
  const [isSaved, setIsSaved] = useState(false);
  
  // Check if cafe is already saved in localStorage
  React.useEffect(() => {
    try {
      const savedCafes = JSON.parse(localStorage.getItem('savedCafes')) || [];
      setIsSaved(savedCafes.some(savedCafe => savedCafe.id === cafe.id));
    } catch (error) {
      console.error('Error checking saved cafes:', error);
    }
  }, [cafe.id]);
  
  const toggleSave = (e) => {
    e.preventDefault(); // Prevent navigating to detail page
    
    try {
      const savedCafes = JSON.parse(localStorage.getItem('savedCafes')) || [];
      
      if (isSaved) {
        // Remove from saved
        const updatedSavedCafes = savedCafes.filter(savedCafe => savedCafe.id !== cafe.id);
        localStorage.setItem('savedCafes', JSON.stringify(updatedSavedCafes));
      } else {
        // Add to saved
        const cafeToSave = {
          id: cafe.id,
          name: cafe.name,
          imageUrl: cafe.imageUrl,
          rating: cafe.rating,
          neighborhood: cafe.neighborhood
        };
        localStorage.setItem('savedCafes', JSON.stringify([...savedCafes, cafeToSave]));
      }
      
      // Update state
      setIsSaved(!isSaved);
      
      // Dispatch a storage event so other components can react
      window.dispatchEvent(new Event('storage'));
      
    } catch (error) {
      console.error('Error updating saved cafes:', error);
    }
  };
  
  return (
    <div className="cafe-card">
      <Link to={`/cafe/${cafe.id}`} className="cafe-card-link">
        <div className="cafe-card-image">
          <img src={cafe.imageUrl} alt={cafe.name} />
          <span className="cafe-card-rating">{cafe.rating} ★</span>
          <button 
            className={`save-button ${isSaved ? 'saved' : ''}`} 
            onClick={toggleSave}
            aria-label={isSaved ? "Remove from saved" : "Save cafe"}
          >
            {isSaved ? '❤️' : '🤍'}
          </button>
        </div>
        <div className="cafe-card-content">
          <h3 className="cafe-card-title">{cafe.name}</h3>
          <p className="cafe-card-neighborhood">{cafe.neighborhood}</p>
          {cafe.categories && (
            <div className="cafe-card-categories">
              {cafe.categories.map((category, index) => (
                <span key={index} className="cafe-category">{category}</span>
              ))}
            </div>
          )}
          {cafe.openingHours && cafe.openingHours.length > 0 && (
            <p className="cafe-card-hours">
              Open today: {cafe.openingHours[new Date().getDay()].hours}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CafeCard;