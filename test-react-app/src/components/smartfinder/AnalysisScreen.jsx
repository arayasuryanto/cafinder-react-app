import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const AnalysisScreen = ({ analysis, onContinue }) => {
  useEffect(() => {
    // Animate loading dots
    gsap.to('.loading-dot', {
      scale: 0.5,
      opacity: 0.3,
      duration: 0.6,
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    // Animate brain icon
    gsap.to('.brain-icon', {
      rotation: 360,
      duration: 3,
      repeat: -1,
      ease: 'none'
    });

    // Show analysis text after loading
    if (analysis) {
      gsap.fromTo('.analysis-result',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5 }
      );
    }
  }, [analysis]);

  const handleScreenClick = () => {
    if (analysis) {
      onContinue();
    }
  };

  return (
    <div className="analysis-screen phase-content" onClick={handleScreenClick}>
      <div className="analysis-content">
        <div className="brain-icon">
          <svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#F05438" strokeWidth="2" opacity="0.2"/>
            <path d="M30 50 Q30 20 50 20 T70 50 Q70 80 50 80 T30 50" 
                  fill="#F05438" opacity="0.1"/>
            <g transform="translate(50, 50)">
              <circle cx="-15" cy="-10" r="8" fill="#F05438" opacity="0.6"/>
              <circle cx="15" cy="-10" r="8" fill="#F05438" opacity="0.6"/>
              <circle cx="0" cy="10" r="8" fill="#F05438" opacity="0.6"/>
              <circle cx="-10" cy="5" r="6" fill="#F05438" opacity="0.4"/>
              <circle cx="10" cy="5" r="6" fill="#F05438" opacity="0.4"/>
            </g>
          </svg>
        </div>
        
        {!analysis ? (
          <>
            <h2 className="analysis-title">Menganalisis preferensi Anda...</h2>
            <div className="loading-dots">
              <span className="loading-dot">•</span>
              <span className="loading-dot">•</span>
              <span className="loading-dot">•</span>
            </div>
            <p className="analysis-subtitle">AI kami sedang memproses jawaban Anda</p>
          </>
        ) : (
          <div className="analysis-result">
            <h2 className="analysis-title">Analisis Selesai!</h2>
            <div className="personality-card">
              <p className="personality-text">{analysis}</p>
            </div>
            <button className="continue-button" onClick={onContinue}>
              Lihat Rekomendasi Anda
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <p className="click-hint">atau klik dimana saja untuk melanjutkan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisScreen;