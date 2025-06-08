import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const AnalysisScreen = ({ analysis, onContinue }) => {
  // Parse personality type from analysis text
  const getPersonalityInfo = (analysisText) => {
    const personalityTypes = {
      'Profesional Produktif': {
        icon: '💼',
        description: 'Fokus kerja, suasana tenang, WiFi kencang',
        color: '#2563eb',
        traits: ['Berorientasi produktivitas', 'Menyukai lingkungan tenang', 'Butuh konektivitas tinggi']
      },
      'Social Butterfly': {
        icon: '🦋',
        description: 'Suka hangout, suasana ramai, spot Instagramable',
        color: '#dc2626',
        traits: ['Senang bersosialisasi', 'Menyukai keramaian', 'Visual-oriented']
      },
      'Penikmat Me-Time': {
        icon: '☕',
        description: 'Waktu sendiri, suasana cozy, kopi berkualitas',
        color: '#059669',
        traits: ['Menghargai waktu pribadi', 'Menyukai kenyamanan', 'Coffee connoisseur']
      },
      'Digital Nomad': {
        icon: '💻',
        description: 'Kerja mobile, teknologi, fleksibilitas tinggi',
        color: '#7c3aed',
        traits: ['Bekerja mobile', 'Tech-savvy', 'Fleksibel']
      },
      'Cafe Explorer': {
        icon: '🗺️',
        description: 'Suka eksplorasi, open-minded, variatif',
        color: '#ea580c',
        traits: ['Suka mencoba hal baru', 'Open-minded', 'Adaptif']
      }
    };

    for (const [type, info] of Object.entries(personalityTypes)) {
      if (analysisText.includes(type)) {
        return { type, ...info };
      }
    }

    // Default fallback
    return {
      type: 'Cafe Explorer',
      ...personalityTypes['Cafe Explorer']
    };
  };

  const personalityInfo = analysis ? getPersonalityInfo(analysis) : null;

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
            <h2 className="analysis-title">Tipe Kepribadian Kafe Anda</h2>
            
            <div className="personality-result-card" style={{ '--personality-color': personalityInfo.color }}>
              <div className="personality-header">
                <div className="personality-icon-large">{personalityInfo.icon}</div>
                <div className="personality-info">
                  <h3 className="personality-type-name">{personalityInfo.type}</h3>
                  <p className="personality-description">{personalityInfo.description}</p>
                </div>
              </div>

              <div className="personality-traits">
                <h4 className="traits-title">Karakteristik Utama:</h4>
                <ul className="traits-list">
                  {personalityInfo.traits.map((trait, index) => (
                    <li key={index} className="trait-item">{trait}</li>
                  ))}
                </ul>
              </div>

              <div className="analysis-text">
                <p>{analysis}</p>
              </div>
            </div>

            <div className="next-steps">
              <h4 className="next-title">Langkah Selanjutnya</h4>
              <p className="next-description">
                Berdasarkan jawaban Anda, kami punya beberapa saran kafe yang mungkin Anda suka. Coba eksplorasi!
              </p>
            </div>

            <button className="continue-button" onClick={onContinue}>
              Lihat Rekomendasi Saya
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