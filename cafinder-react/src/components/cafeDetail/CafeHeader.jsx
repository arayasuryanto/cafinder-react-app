import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CafeHeader = ({ cafe }) => {
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    if (cafe) {
      // Check if cafe is already saved in localStorage
      try {
        const savedCafes = JSON.parse(localStorage.getItem('savedCafes')) || [];
        setIsSaved(savedCafes.some(savedCafe => savedCafe.id === cafe.id));
      } catch (error) {
        console.error('Error checking saved cafes:', error);
      }
    }
  }, [cafe]);
  
  const toggleSave = () => {
    if (!cafe) return;
    
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
  
  if (!cafe) return null;
  
  return (
    <div className="cafe-header">
      <div className="container">
        <div className="cafe-header-content">
          <div className="cafe-header-info">
            <div className="breadcrumbs">
              <Link to="/">Home</Link> / 
              <Link to="/catalog">Catalog</Link> / 
              <span>{cafe.name}</span>
            </div>
            
            <h1 className="cafe-name">{cafe.name}</h1>
            
            <div className="cafe-meta">
              <div className="cafe-rating">
                <span className="rating-value">{cafe.rating}</span>
                <span className="rating-stars">{'★'.repeat(Math.round(parseFloat(cafe.rating)))}</span>
                {cafe.reviewCount && (
                  <span className="review-count">({cafe.reviewCount} reviews)</span>
                )}
              </div>
              
              <div className="cafe-categories">
                {cafe.categories?.map((category, index) => (
                  <span key={index} className="category-tag">{category}</span>
                ))}
              </div>
            </div>
            
            <p className="cafe-address">{cafe.address}</p>
          </div>
          
          <div className="cafe-header-actions">
            <button 
              className={`save-button ${isSaved ? 'saved' : ''}`}
              onClick={toggleSave}
            >
              {isSaved ? 'Remove from Saved' : 'Save Cafe'}
            </button>
            
            <a 
              href={cafe.google_maps_direction} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="directions-button"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeHeader;