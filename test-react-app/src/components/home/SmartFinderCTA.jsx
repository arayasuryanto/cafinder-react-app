import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmartFinderCTA = () => {
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
      gsap.fromTo('.finder-cta-content',
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

      // Animate feature cards
      gsap.fromTo('.feature-card',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%'
          }
        }
      );

      // Floating animation for icons
      gsap.to('.floating-icon', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.3
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="smart-finder-cta" ref={sectionRef}>
      <div className="gradient-bg"></div>
      <div className="container">
        <div className="finder-cta-content">
          <div className="cta-header">
            <div className="ai-badge">
              <span className="badge-icon">🤖</span>
              <span className="badge-text">AI Powered</span>
            </div>
            <h2 className="cta-title">
              Bingung Pilih Cafe? <br />
              <span className="highlight">Smart Finder Solusinya!</span>
            </h2>
            <p className="cta-subtitle">
              Jawab beberapa pertanyaan simpel, AI kami akan merekomendasikan 
              cafe yang sempurna untukmu
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon floating-icon">🎯</div>
              <h4>Akurat</h4>
              <p>Rekomendasi personal sesuai preferensimu</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon floating-icon">⚡</div>
              <h4>Cepat</h4>
              <p>Hanya butuh 30 detik untuk hasil maksimal</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon floating-icon">🎨</div>
              <h4>Smart</h4>
              <p>AI yang terus belajar dari pilihan pengguna</p>
            </div>
          </div>

          <div className="cta-demo">
            <div className="demo-preview">
              <div className="chat-bubble user">
                <p>Saya butuh cafe untuk meeting bisnis</p>
              </div>
              <div className="chat-bubble ai">
                <p>Saya merekomendasikan Starbucks Reserve dengan meeting room private...</p>
              </div>
            </div>
          </div>

          <div className="cta-actions">
            <a href="/smart-finder" className="primary-cta-btn">
              <span className="btn-icon">✨</span>
              Coba Smart Finder Sekarang
              <span className="btn-arrow">→</span>
            </a>
            <p className="cta-note">Gratis, tanpa perlu daftar!</p>
          </div>

          {/* Stats */}
          <div className="finder-stats">
            <div className="stat-item">
              <span className="stat-number">2.5K+</span>
              <span className="stat-label">Pengguna Happy</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Akurasi</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">30s</span>
              <span className="stat-label">Waktu Rata-rata</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartFinderCTA;