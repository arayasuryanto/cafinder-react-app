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
      type: "Profesional Produktif",
      icon: "💼",
      description: "Fokus kerja, suasana tenang, WiFi kencang",
      color: "#2563eb"
    },
    {
      type: "Social Butterfly",
      icon: "🦋",
      description: "Suka hangout, suasana ramai, spot Instagramable",
      color: "#dc2626"
    },
    {
      type: "Penikmat Me-Time",
      icon: "☕",
      description: "Waktu sendiri, suasana cozy, kopi berkualitas",
      color: "#059669"
    },
    {
      type: "Digital Nomad",
      icon: "💻",
      description: "Kerja mobile, teknologi, fleksibilitas tinggi",
      color: "#7c3aed"
    },
    {
      type: "Cafe Explorer",
      icon: "🗺️",
      description: "Suka eksplorasi, open-minded, variatif",
      color: "#ea580c"
    }
  ];

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
    .fromTo('.explanation-steps', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5'
    )
    .fromTo('.personality-showcase', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3'
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

    // Auto-rotate explanation steps
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % explanationSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [explanationSteps.length]);

  return (
    <div className="start-screen phase-content">
      <div className="start-content">
        <div className="start-logo">
          <svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="45" fill="#F05438" opacity="0.1"/>
            <path d="M50 20 L60 40 L80 40 L65 55 L70 75 L50 60 L30 75 L35 55 L20 40 L40 40 Z" 
                  fill="#F05438" stroke="#F05438" strokeWidth="2"/>
            <circle cx="50" cy="50" r="15" fill="white"/>
            <text x="50" y="55" textAnchor="middle" fill="#F05438" fontSize="16" fontWeight="bold">AI</text>
          </svg>
        </div>
        
        <h1 className="start-title">Smart Finder</h1>
        <p className="start-description">
          Temukan kafe yang mungkin cocok untuk Anda dengan kuis kepribadian singkat
        </p>

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
          <h3 className="personality-title">5 Tipe Kepribadian Kafe</h3>
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