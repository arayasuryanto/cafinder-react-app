import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmartFinderCTA = ({ navigateTo }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate background gradient
      gsap.to('.gradient-bg', {
        backgroundPosition: '200% 50%',
        duration: 20,
        repeat: -1,
        ease: 'none'
      });

      // Animate content on scroll
      gsap.fromTo('.compact-finder-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.smart-finder-cta',
            start: 'top 80%'
          }
        }
      );

      // Animate key features
      gsap.fromTo('.key-feature',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.key-features',
            start: 'top 80%'
          }
        }
      );

      // Floating AI icon
      gsap.to('.ai-icon', {
        y: -8,
        rotation: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="smart-finder-cta" ref={sectionRef}>
      <div className="gradient-bg"></div>
      <div className="container">
        <div className="compact-finder-content">
          <div className="compact-header">
            <div className="ai-badge">
              <span className="badge-icon ai-icon">🤖</span>
              <span className="badge-text">AI Powered</span>
            </div>
            
            <h2 className="compact-title">
              Bingung Pilih Cafe? <span className="highlight">Smart Finder Solusinya!</span>
            </h2>
            
            <p className="compact-subtitle">
              Jawab 6 pertanyaan simpel, AI akan rekomendasikan cafe perfect untukmu dalam 30 detik!
            </p>
          </div>

          <div className="key-features">
            <div className="key-feature">
              <span className="feature-icon">⚡</span>
              <span className="feature-text">30 Detik</span>
            </div>
            <div className="key-feature">
              <span className="feature-icon">✨</span>
              <span className="feature-text">Super Helpful</span>
            </div>
          </div>

          <div className="compact-cta">
            <button onClick={() => navigateTo('/smart-finder')} className="primary-cta-btn">
              <span className="btn-icon">🚀</span>
              <span className="btn-text">Coba Smart Finder Sekarang</span>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartFinderCTA;