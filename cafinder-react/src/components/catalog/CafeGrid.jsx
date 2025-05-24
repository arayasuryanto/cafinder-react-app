import React from 'react';
import CafeCard from './CafeCard';

const CafeGrid = ({ cafes, loading }) => {
  if (loading) {
    return (
      <div className="cafe-grid-loading">
        <div className="loader"></div>
        <p>Loading cafes...</p>
      </div>
    );
  }

  if (!cafes || cafes.length === 0) {
    return (
      <div className="cafe-grid-empty">
        <p>No cafes found matching your criteria.</p>
        <p>Try adjusting your filters or search term.</p>
      </div>
    );
  }

  return (
    <div className="cafe-grid">
      {cafes.map(cafe => (
        <CafeCard key={cafe.id} cafe={cafe} />
      ))}
    </div>
  );
};

export default CafeGrid;