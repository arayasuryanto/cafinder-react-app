import React from 'react';

const CafeInfo = ({ cafe }) => {
  if (!cafe) return null;
  
  // Format opening hours into days of the week
  const formatOpeningHours = () => {
    if (!cafe.openingHours || cafe.openingHours.length === 0) {
      return <p>Opening hours not available</p>;
    }
    
    return (
      <ul className="hours-list">
        {cafe.openingHours.map((day, index) => {
          const isToday = new Date().getDay() === (index + 1) % 7; // Convert from array index to day of week
          
          return (
            <li key={index} className={isToday ? 'today' : ''}>
              <span className="day">{day.day}</span>
              <span className="hours">{day.hours === 'Closed' ? 'Closed' : day.hours}</span>
            </li>
          );
        })}
      </ul>
    );
  };
  
  // Format additional info into sections
  const formatAdditionalInfo = () => {
    if (!cafe.additionalInfo) return null;
    
    return Object.entries(cafe.additionalInfo).map(([category, items]) => (
      <div key={category} className="info-section">
        <h3>{category}</h3>
        <ul className="info-list">
          {items.map((item, index) => {
            const [label, value] = Object.entries(item)[0];
            return (
              <li key={index} className={value ? 'available' : 'unavailable'}>
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    ));
  };
  
  return (
    <div className="cafe-info">
      <div className="cafe-details">
        <div className="cafe-section">
          <h2>Details</h2>
          <div className="detail-items">
            {cafe.phone && (
              <div className="detail-item">
                <h3>Phone</h3>
                <p><a href={`tel:${cafe.phone}`}>{cafe.phone}</a></p>
              </div>
            )}
            
            {cafe.website && (
              <div className="detail-item">
                <h3>Website</h3>
                <p><a href={cafe.website} target="_blank" rel="noopener noreferrer">{cafe.website}</a></p>
              </div>
            )}
            
            <div className="detail-item">
              <h3>Address</h3>
              <p>{cafe.address}</p>
            </div>
            
            <div className="detail-item">
              <h3>Neighborhood</h3>
              <p>{cafe.neighborhood}</p>
            </div>
          </div>
        </div>
        
        <div className="cafe-section">
          <h2>Opening Hours</h2>
          <div className="hours-container">
            {formatOpeningHours()}
          </div>
        </div>
        
        <div className="cafe-section additional-info">
          <h2>Features & Amenities</h2>
          <div className="additional-info-container">
            {formatAdditionalInfo()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeInfo;