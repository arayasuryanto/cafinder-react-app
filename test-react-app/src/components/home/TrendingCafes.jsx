import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TrendingCafes = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  const trendingCafes = [
    {
      id: 1,
      name: 'Kopi Kenangan',
      tag: '🔥 Hot This Week',
      image: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400',
      rating: 4.8,
      reviews: 342,
      highlight: 'New Menu Launch',
      location: 'Gubeng'
    },
    {
      id: 2,
      name: 'Starbucks Reserve',
      tag: '⭐ Most Reviewed',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400',
      rating: 4.7,
      reviews: 567,
      highlight: 'Premium Experience',
      location: 'Pakuwon Mall'
    },
    {
      id: 3,
      name: 'Cafe Santai',
      tag: '📈 Rising Star',
      image: 'https://images.unsplash.com/photo-1514066558159-fc8c737ef259?w=400',
      rating: 4.9,
      reviews: 128,
      highlight: 'Hidden Gem',
      location: 'Darmo'
    }
  ];

  useEffect(() => {
    // Animate section title
    gsap.fromTo('.trending-header',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.trending-cafes',
          start: 'top 80%'
        }
      }
    );

    // Animate cards with stagger
    gsap.fromTo('.trending-card',
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.trending-grid',
          start: 'top 80%'
        }
      }
    );

    // Floating animation for badges
    gsap.to('.trending-badge', {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.2
    });
  }, []);

  return (
    <section className="trending-cafes" ref={sectionRef}>
      <div className="container">
        <div className="trending-header">
          <div className="header-content">
            <h2 className="section-title">
              <span className="icon-wrapper">🔥</span>
              Trending Minggu Ini
            </h2>
            <p className="section-subtitle">
              Cafe-cafe yang lagi hits di Surabaya
            </p>
          </div>
          <a href="/catalog?sort=trending" className="view-all-btn">
            Lihat Semua
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </a>
        </div>

        <div className="trending-grid" ref={cardsRef}>
          {trendingCafes.map((cafe) => (
            <div key={cafe.id} className="trending-card">
              <div className="trending-badge">{cafe.tag}</div>
              
              <div className="card-image">
                <img src={cafe.image} alt={cafe.name} />
                <div className="card-overlay">
                  <button className="quick-view-btn">Quick View</button>
                </div>
              </div>

              <div className="card-content">
                <div className="card-header">
                  <h3>{cafe.name}</h3>
                  <div className="rating-badge">
                    <span>⭐ {cafe.rating}</span>
                  </div>
                </div>

                <p className="card-location">📍 {cafe.location}</p>
                
                <div className="card-actions">
                  <button className="action-btn save-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M19 21L12 16L5 21V5C5 3.9 5.9 3 7 3H17C18.1 3 19 3.9 19 5V21Z" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <a href={`/catalog/cafe/${cafe.id}`} className="action-btn view-btn">
                    Lihat Detail
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Update Indicator */}
        <div className="live-indicator">
          <span className="pulse"></span>
          <span>Updated setiap jam</span>
        </div>
      </div>
    </section>
  );
};

export default TrendingCafes;