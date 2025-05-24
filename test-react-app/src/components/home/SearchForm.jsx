import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SearchForm = () => {
  const formRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  
  useEffect(() => {
    // Animate the search form
    gsap.to(formRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.5
    });
  }, []);
  
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  
  return (
    <div className="container">
      <div className="search-form" ref={formRef}>
        <div className="search-tabs">
          <div 
            className={`search-tab ${activeTab === 0 ? 'active' : ''}`} 
            onClick={() => handleTabClick(0)}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C7.58 2 4 5.58 4 10C4 14.42 7.58 18 12 18C16.42 18 20 14.42 20 10C20 5.58 16.42 2 12 2ZM12 16C8.69 16 6 13.31 6 10C6 6.69 8.69 4 12 4C15.31 4 18 6.69 18 10C18 13.31 15.31 16 12 16Z" fill="currentColor"/>
              <path d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z" fill="currentColor"/>
              <path d="M12 19C11.73 19 11.5 19.11 11.32 19.29L9.29 21.29C9.11 21.47 9 21.72 9 22C9 22.55 9.45 23 10 23C10.28 23 10.53 22.89 10.71 22.71L12 21.41L13.29 22.71C13.47 22.89 13.72 23 14 23C14.55 23 15 22.55 15 22C15 21.72 14.89 21.47 14.71 21.29L12.68 19.29C12.5 19.11 12.27 19 12 19Z" fill="currentColor"/>
            </svg>
            <span>Location</span>
          </div>
          <div 
            className={`search-tab ${activeTab === 1 ? 'active' : ''}`} 
            onClick={() => handleTabClick(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 10H7V12H17V10ZM19 3H18V1H16V3H8V1H6V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM14 14H7V16H14V14Z" fill="currentColor"/>
            </svg>
            <span>Activity</span>
          </div>
          <div 
            className={`search-tab ${activeTab === 2 ? 'active' : ''}`} 
            onClick={() => handleTabClick(2)}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="currentColor"/>
            </svg>
            <span>Dates</span>
          </div>
          <div 
            className={`search-tab ${activeTab === 3 ? 'active' : ''}`} 
            onClick={() => handleTabClick(3)}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="currentColor"/>
            </svg>
            <span>Guest</span>
          </div>
        </div>
        
        <div className="search-fields">
          <div className="search-field">
            <input type="text" placeholder="Lokasi cafe" />
          </div>
          <div className="search-field">
            <select>
              <option value="">Jenis Aktivitas</option>
              <option value="work">Working Space</option>
              <option value="meeting">Meeting</option>
              <option value="hangout">Hangout</option>
            </select>
          </div>
          <div className="search-field">
            <input type="date" placeholder="Tanggal" />
          </div>
          <button className="search-btn">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;