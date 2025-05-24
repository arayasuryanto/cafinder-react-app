import React, { useState } from 'react';

const Filters = ({ onChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    rating: initialFilters.rating || 0,
    neighborhood: initialFilters.neighborhood || '',
    categories: initialFilters.categories || [],
    features: initialFilters.features || []
  });

  // Sample data - in a real app, this might come from an API
  const neighborhoods = [
    'Lidah Wetan, Lakarsantri',
    'Sambikerep',
    'Lidah Kulon, Lakarsantri',
    'Citraland, Lakarsantri',
    'Jeruk, Lakarsantri'
  ];

  const categories = [
    { id: 'cafe', label: 'Cafe' },
    { id: 'coffee_shop', label: 'Coffee Shop' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'beer_garden', label: 'Beer Garden' }
  ];

  const features = [
    { id: 'outdoor_seating', label: 'Outdoor Seating' },
    { id: 'wifi', label: 'Free WiFi' },
    { id: 'late_night', label: 'Late Night' },
    { id: 'live_music', label: 'Live Music' },
    { id: 'good_for_working', label: 'Good for Working' }
  ];

  const handleRatingChange = (e) => {
    const newFilters = { ...filters, rating: parseFloat(e.target.value) };
    setFilters(newFilters);
    if (onChange) onChange(newFilters);
  };

  const handleNeighborhoodChange = (e) => {
    const newFilters = { ...filters, neighborhood: e.target.value };
    setFilters(newFilters);
    if (onChange) onChange(newFilters);
  };

  const handleCategoryChange = (categoryId) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    if (onChange) onChange(newFilters);
  };

  const handleFeatureChange = (featureId) => {
    const newFeatures = filters.features.includes(featureId)
      ? filters.features.filter(id => id !== featureId)
      : [...filters.features, featureId];
    
    const newFilters = { ...filters, features: newFeatures };
    setFilters(newFilters);
    if (onChange) onChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      rating: 0,
      neighborhood: '',
      categories: [],
      features: []
    };
    setFilters(newFilters);
    if (onChange) onChange(newFilters);
  };

  return (
    <div className="filters">
      <div className="filters-header">
        <h3>Filters</h3>
        <button className="clear-filters-btn" onClick={clearFilters}>
          Clear All
        </button>
      </div>

      <div className="filter-group">
        <h4>Minimum Rating</h4>
        <div className="rating-slider">
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.rating}
            onChange={handleRatingChange}
          />
          <span>{filters.rating > 0 ? `${filters.rating}+` : 'Any'}</span>
        </div>
      </div>

      <div className="filter-group">
        <h4>Neighborhood</h4>
        <select 
          value={filters.neighborhood} 
          onChange={handleNeighborhoodChange}
          className="neighborhood-select"
        >
          <option value="">Any Neighborhood</option>
          {neighborhoods.map(neighborhood => (
            <option key={neighborhood} value={neighborhood}>
              {neighborhood}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <h4>Categories</h4>
        <div className="checkbox-group">
          {categories.map(category => (
            <label key={category.id} className="checkbox-item">
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

      <div className="filter-group">
        <h4>Features</h4>
        <div className="checkbox-group">
          {features.map(feature => (
            <label key={feature.id} className="checkbox-item">
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

export default Filters;