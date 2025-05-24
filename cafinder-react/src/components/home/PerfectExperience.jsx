import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './PerfectExperience.css';

const PerfectExperience = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Animation with GSAP
    gsap.from(textRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });

    gsap.from(logoRef.current, {
      x: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });

    // Logo animation
    gsap.to(logoRef.current, {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: "none"
    });
  }, []);

  return (
    <section className="perfect-experience" ref={sectionRef}>
      <div className="container">
        <div className="experience-content">
          <div className="experience-text" ref={textRef}>
            <h2>Temukan Pengalaman Café yang Sempurna</h2>
            <p>
              Cafinder membantu kamu menemukan tempat nongkrong favorit berdasarkan preferensi personal. 
              Dari cafe untuk kerja, meeting, hingga nongkrong santai bersama teman.
            </p>
            
            <ul className="feature-list">
              <li className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="feature-text">Filter pencarian customizable dan fleksibel</div>
              </li>
              <li className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="feature-text">Review asli dari komunitas dan pengguna lain</div>
              </li>
              <li className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="feature-text">Rekomendasi yang sesuai preferensi di profilmu</div>
              </li>
            </ul>
            
            <Link to="/catalog" className="experience-btn">Jelajahi Cafe</Link>
          </div>
          
          <div className="cafinder-logo" ref={logoRef}>
            <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M180 180C201.5 180 230 169.5 230 140C230 110.5 201.5 100 180 100C158.5 100 130 110.5 130 140C130 169.5 158.5 180 180 180Z" fill="#F05438"/>
              <path d="M180 160C191.046 160 200 151.046 200 140C200 128.954 191.046 120 180 120C168.954 120 160 128.954 160 140C160 151.046 168.954 160 180 160Z" fill="white"/>
              <path d="M180 140L145 100L115 120L150 160L180 140Z" fill="white"/>
              <path d="M240 160H210L230 190H260L240 160Z" fill="white"/>
              <path d="M115 190C125.493 190 134 181.493 134 171C134 160.507 125.493 152 115 152C104.507 152 96 160.507 96 171C96 181.493 104.507 190 115 190Z" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfectExperience;