import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const SmartFinderStart = ({ onStart }) => {
  useEffect(() => {
    // Animate entrance
    const tl = gsap.timeline();
    
    tl.fromTo('.start-logo', 
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }
    )
    .fromTo('.start-title', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5'
    )
    .fromTo('.start-description', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5'
    )
    .fromTo('.start-features', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5'
    )
    .fromTo('.start-button', 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3'
    );

    // Add floating animation to logo
    gsap.to('.start-logo', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
  }, []);

  return (
    <div className="start-screen phase-content">
      <div className="start-content">
        <div className="start-logo">
          <svg viewBox="0 0 100 100" width="100" height="100">
            <circle cx="50" cy="50" r="45" fill="#F05438" opacity="0.1"/>
            <path d="M50 20 L60 40 L80 40 L65 55 L70 75 L50 60 L30 75 L35 55 L20 40 L40 40 Z" 
                  fill="#F05438" stroke="#F05438" strokeWidth="2"/>
            <circle cx="50" cy="50" r="15" fill="white"/>
            <text x="50" y="55" textAnchor="middle" fill="#F05438" fontSize="20" fontWeight="bold">?</text>
          </svg>
        </div>
        
        <h1 className="start-title">Smart Finder</h1>
        <p className="start-description">
          Temukan kafe sempurna yang sesuai dengan kepribadian dan kebutuhan Anda
        </p>
        
        <div className="start-features">
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span className="feature-text">6 pertanyaan sederhana</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🤖</span>
            <span className="feature-text">Analisis AI personal</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">☕</span>
            <span className="feature-text">Rekomendasi akurat</span>
          </div>
        </div>
        
        <button className="start-button" onClick={onStart}>
          Mulai Pencarian
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SmartFinderStart;