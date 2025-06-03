import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InteractiveFinder = () => {
  const [activeFilter, setActiveFilter] = useState('wifi');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'wifi', icon: '📶', label: 'WiFi Kencang', count: 156 },
    { id: 'aesthetic', icon: '📸', label: 'Aesthetic', count: 89 },
    { id: 'outdoor', icon: '🌳', label: 'Outdoor Area', count: 67 },
    { id: 'meeting', icon: '💼', label: 'Meeting Room', count: 45 },
    { id: 'pet', icon: '🐕', label: 'Pet Friendly', count: 34 },
    { id: '24h', icon: '🌙', label: 'Buka 24 Jam', count: 12 }
  ];

  useEffect(() => {
    // Animate section on scroll
    gsap.fromTo('.interactive-finder',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.interactive-finder',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate filter cards
    gsap.fromTo('.filter-card',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.filter-grid',
          start: 'top 80%'
        }
      }
    );
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to catalog with search query
    window.location.href = `/catalog?search=${encodeURIComponent(searchQuery)}&filter=${activeFilter}`;
  };

  return (
    <section className="interactive-finder">
      <div className="container">
        <div className="finder-content">
          <h2 className="section-title">
            Cari Cafe Sesuai <span className="highlight">Kebutuhanmu</span>
          </h2>
          <p className="section-subtitle">
            Pilih filter favorit atau cari langsung cafe impianmu
          </p>

          {/* Search Bar */}
          <form className="finder-search" onSubmit={handleSearch}>
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Cari nama cafe atau lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Cari
              </button>
            </div>
          </form>

          {/* Filter Grid */}
          <div className="filter-grid">
            {filters.map((filter) => (
              <div
                key={filter.id}
                className={`filter-card ${activeFilter === filter.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                <div className="filter-icon">{filter.icon}</div>
                <div className="filter-info">
                  <h4>{filter.label}</h4>
                  <p>{filter.count} cafe</p>
                </div>
                <div className="filter-check">
                  {activeFilter === filter.id && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/>
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <a href="/catalog" className="action-link">
              <span>Lihat Semua Cafe</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
            <a href="/map" className="action-link highlight">
              <span>Buka Peta Cafe</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFinder;