import React, { useState } from 'react';

const MapControls = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    categories: [],
    rating: 0,
    features: []
  });
  
  const categories = [
    { id: 'cafe', label: 'Cafe' },
    { id: 'coffee_shop', label: 'Coffee Shop' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'beer_garden', label: 'Beer Garden' }
  ];
  
  const features = [
    { id: 'outdoor_seating', label: 'Outdoor Seating' },
    { id: 'wifi', label: 'Free WiFi' },
    { id: 'power_outlets', label: 'Power Outlets' },
    { id: 'late_night', label: 'Late Night' }
  ];
  
  const handleCategoryChange = (categoryId) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  const handleFeatureChange = (featureId) => {
    const newFeatures = filters.features.includes(featureId)
      ? filters.features.filter(id => id !== featureId)
      : [...filters.features, featureId];
    
    const newFilters = { ...filters, features: newFeatures };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  const handleRatingChange = (event) => {
    const rating = parseInt(event.target.value);
    const newFilters = { ...filters, rating };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  return (
    <div className="map-controls">
      <div className="control-section">
        <h3>Categories</h3>
        <div className="checkbox-group">
          {categories.map(category => (
            <label key={category.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.categories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              {category.label}
            </label>
          ))}
        </div>
      </div>
      
      <div className="control-section">
        <h3>Minimum Rating</h3>
        <div className="rating-slider">
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.rating}
            onChange={handleRatingChange}
          />
          <span>{filters.rating ? `${filters.rating}+` : 'Any'}</span>
        </div>
      </div>
      
      <div className="control-section">
        <h3>Features</h3>
        <div className="checkbox-group">
          {features.map(feature => (
            <label key={feature.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.features.includes(feature.id)}
                onChange={() => handleFeatureChange(feature.id)}
              />
              {feature.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapControls;