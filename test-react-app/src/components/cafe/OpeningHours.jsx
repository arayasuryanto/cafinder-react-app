import React, { useState, useEffect } from 'react';

const OpeningHours = ({ hours, currentDay }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Check if cafe is currently open
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    
    const todayHours = hours[currentDay];
    if (!todayHours || todayHours.open === 'Closed') {
      setIsOpen(false);
    } else {
      const [openHour, openMinute] = todayHours.open.split(':').map(Number);
      const [closeHour, closeMinute] = todayHours.close.split(':').map(Number);
      const openTime = openHour * 60 + openMinute;
      const closeTime = closeHour * 60 + closeMinute;
      
      setIsOpen(currentTime >= openTime && currentTime < closeTime);
    }
  }, [hours, currentDay]);
  
  return (
    <div className="hours-section">
      <div className="hours-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
        </svg>
        Opening Hours
        <span className={`opening-status ${isOpen ? 'open' : 'closed'}`}>
          {isOpen ? 'Open Now' : 'Closed'}
        </span>
      </div>
      
      <div className="hours-list">
        {Object.entries(hours).map(([day, time]) => (
          <div key={day} className="hours-item">
            <span className={`day-name ${day === currentDay ? 'current' : ''}`}>
              {day}
            </span>
            <span className={`opening-hours ${time.open === 'Closed' ? 'closed' : ''}`}>
              {time.open === 'Closed' ? 'Closed' : `${time.open} - ${time.close}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpeningHours;