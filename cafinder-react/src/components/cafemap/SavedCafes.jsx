import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SavedCafes = () => {
  const [savedCafes, setSavedCafes] = useState([]);
  
  useEffect(() => {
    // Load saved cafes from localStorage
    const loadSavedCafes = () => {
      try {
        const saved = localStorage.getItem('savedCafes');
        if (saved) {
          setSavedCafes(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading saved cafes from localStorage:', error);
      }
    };
    
    loadSavedCafes();
    
    // Listen for changes to localStorage from other components
    const handleStorageChange = (e) => {
      if (e.key === 'savedCafes') {
        loadSavedCafes();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const removeCafe = (cafeId) => {
    const updatedSavedCafes = savedCafes.filter(cafe => cafe.id !== cafeId);
    setSavedCafes(updatedSavedCafes);
    localStorage.setItem('savedCafes', JSON.stringify(updatedSavedCafes));
  };
  
  return (
    <div className="saved-cafes">
      <h2>Saved Cafes</h2>
      
      {savedCafes.length === 0 ? (
        <div className="empty-state">
          <p>You haven't saved any cafes yet.</p>
          <p>Click the bookmark icon on a cafe to save it for later.</p>
        </div>
      ) : (
        <div className="saved-cafes-list">
          {savedCafes.map(cafe => (
            <div key={cafe.id} className="saved-cafe-item">
              <div className="saved-cafe-image">
                <img src={cafe.imageUrl} alt={cafe.name} />
              </div>
              <div className="saved-cafe-info">
                <h3>{cafe.name}</h3>
                <p>{cafe.neighborhood}</p>
                <p className="rating">{cafe.rating} ★</p>
                <div className="saved-cafe-actions">
                  <Link to={`/cafe/${cafe.id}`} className="view-btn">View Details</Link>
                  <button 
                    className="remove-btn"
                    onClick={() => removeCafe(cafe.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCafes;