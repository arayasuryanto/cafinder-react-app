import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const SmartFinderStart = ({ onStart }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const explanationSteps = [
    {
      title: "Analisis Kepribadian Kafe",
      description: "Seperti tes MBTI, kami akan menganalisis preferensi unik Anda dalam memilih kafe",
      icon: "🧠"
    },
    {
      title: "6 Pertanyaan Cerdas",
      description: "Jawab pertanyaan tentang tujuan, waktu, suasana, dan mood yang Anda inginkan",
      icon: "❓"
    },
    {
      title: "Rekomendasi Personal",
      description: "Dapatkan saran kafe berdasarkan preferensi dan kepribadian Anda",
      icon: "🎯"
    }
  ];

  const personalityTypes = [
    {
      type: "The Productivity Hunter",
      icon: "⚡",
      description: "Kerja/belajar intensif dengan WiFi kencang dan suasana fokus",
      color: "#3b82f6"
    },
    {
      type: "The Social Connector",
      icon: "🌟",
      description: "Hangout seru, meeting bisnis, dan networking di spot ramai",
      color: "#ef4444"
    },
    {
      type: "The Coffee Connoisseur",
      icon: "☕",
      description: "Menikmati kopi berkualitas dalam suasana tenang dan cozy",
      color: "#8b5cf6"
    },
    {
      type: "The Aesthetic Seeker",
      icon: "📸",
      description: "Mencari spot Instagram-worthy dengan interior yang memukau",
      color: "#ec4899"
    },
    {
      type: "The Comfort Lover",
      icon: "🛋️",
      description: "Prioritas kenyamanan dan relaksasi untuk me-time berkualitas",
      color: "#10b981"
    },
    {
      type: "The Night Owl",
      icon: "🌙",
      description: "Aktif malam hari, suka tempat yang buka larut dengan vibe santai",
      color: "#f59e0b"
    }
  ];

  useEffect(() => {
    // Animate entrance with more creative and slower animations
    const tl = gsap.timeline();
    
    // Logo entrance - dramatic scale and rotation with bounce
    tl.fromTo('.start-logo', 
      { scale: 0, rotation: -360, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.8, ease: 'elastic.out(1, 0.5)' }
    )
    // Title entrance - typewriter-like effect
    .fromTo('.start-title', 
      { opacity: 0, y: 50, rotationX: 90 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: 'power3.out' }, '-=0.8'
    )
    // Description slides in from left
    .fromTo('.start-description', 
      { opacity: 0, x: -100, skewX: 15 },
      { opacity: 1, x: 0, skewX: 0, duration: 1, ease: 'power2.out' }, '-=0.6'
    )
    // Button morphs in with scale and glow effect
    .fromTo('.start-button', 
      { opacity: 0, scale: 0.3, rotationY: 180 },
      { opacity: 1, scale: 1, rotationY: 0, duration: 1, ease: 'back.out(2)' }, '-=0.4'
    )
    // Explanation steps fade in with stagger
    .fromTo('.explanation-steps', 
      { opacity: 0, y: 30, rotationX: -30 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: 'power2.out' }, '-=0.6'
    )
    // Personality cards cascade in
    .fromTo('.personality-showcase', 
      { opacity: 0, y: 40, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power2.out' }, '-=0.8'
    )
    // Individual personality cards stagger animation
    .fromTo('.personality-card', 
      { opacity: 0, y: 20, rotationY: 45 },
      { 
        opacity: 1, 
        y: 0, 
        rotationY: 0, 
        duration: 0.8, 
        ease: 'power2.out',
        stagger: {
          amount: 1.2,
          from: "start"
        }
      }, '-=0.6'
    );

    // Enhanced floating animation for logo with rotation
    gsap.to('.start-logo', {
      y: -15,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });


    // Floating effect for personality cards
    gsap.to('.personality-card', {
      y: -5,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        amount: 2,
        from: "random"
      }
    });

    // Auto-rotate explanation steps with slower timing
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % explanationSteps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [explanationSteps.length]);

  return (
    <div className="start-screen phase-content">
      <div className="start-content">
        <div className="start-logo" style={{ marginTop: '4rem' }}>
          <img 
            src="/favicon.ico" 
            alt="CaFinder Logo" 
            width="80" 
            height="80"
            style={{ objectFit: 'contain' }}
          />
        </div>
        
        <h1 className="start-title">Smart Finder</h1>
        <p className="start-description">
          Temukan kafe yang mungkin cocok untuk Anda dengan kuis kepribadian singkat
        </p>

        <button className="start-button" onClick={onStart}>
          Mulai Test Sekarang
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="explanation-steps">
          <h3 className="steps-title">Bagaimana Cara Kerjanya?</h3>
          <div className="step-carousel">
            {explanationSteps.map((step, index) => (
              <div 
                key={index}
                className={`step-item ${index === currentStep ? 'active' : ''}`}
              >
                <div className="step-icon">{step.icon}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="step-indicators">
            {explanationSteps.map((_, index) => (
              <span 
                key={index}
                className={`indicator ${index === currentStep ? 'active' : ''}`}
                onClick={() => setCurrentStep(index)}
              />
            ))}
          </div>
        </div>

        <div className="personality-showcase">
          <h3 className="personality-title">6 Tipe Kepribadian Kafe</h3>
          <p className="personality-subtitle">
            Berdasarkan kuis, kami akan coba menentukan tipe kepribadian kafe Anda:
          </p>
          <div className="personality-grid">
            {personalityTypes.map((personality, index) => (
              <div 
                key={index}
                className="personality-card"
                style={{ '--accent-color': personality.color }}
              >
                <div className="personality-icon-wrapper">
                  <span className="personality-emoji">{personality.icon}</span>
                </div>
                <h4 className="personality-type">{personality.type}</h4>
                <p className="personality-desc">{personality.description}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="start-button" onClick={onStart}>
          Mulai Analisis Kepribadian
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <p className="start-disclaimer">
          * Rekomendasi berdasarkan kuis singkat - hasilnya mungkin tidak selalu tepat, tapi bisa jadi inspirasi!
        </p>
      </div>
    </div>
  );
};

export default SmartFinderStart;