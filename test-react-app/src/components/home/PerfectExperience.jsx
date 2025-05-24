import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

const PerfectExperience = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const featureListRef = useRef(null);
  const buttonRef = useRef(null);
  const logoRef = useRef(null);
  
  useEffect(() => {
    // Animate heading
    gsap.to(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%"
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    });
    
    // Animate paragraph
    gsap.to(paragraphRef.current, {
      scrollTrigger: {
        trigger: paragraphRef.current,
        start: "top 80%"
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2
    });
    
    // Animate feature items with stagger
    gsap.to(".feature-item", {
      scrollTrigger: {
        trigger: featureListRef.current,
        start: "top 80%"
      },
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out"
    });
    
    // Animate button
    gsap.to(buttonRef.current, {
      scrollTrigger: {
        trigger: buttonRef.current,
        start: "top 90%"
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    });
    
    // Animate logo
    gsap.to(logoRef.current, {
      scrollTrigger: {
        trigger: logoRef.current,
        start: "top 80%"
      },
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "elastic.out(1, 0.5)"
    });
  }, []);
  
  return (
    <section className="perfect-experience">
      <div className="container">
        <div className="experience-content">
          <div className="experience-text">
            <h2 ref={headingRef}>Temukan Pengalaman Café yang Sempurna</h2>
            <p ref={paragraphRef}>Cafinder membantu kamu menemukan tempat nongkrong favorit berdasarkan preferensi personal. Dari cafe untuk kerja, meeting, hingga nongkrong santai bersama teman.</p>
            
            <ul className="feature-list" ref={featureListRef}>
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
            
            <a href="/catalog" className="experience-btn" ref={buttonRef}>Jelajahi Cafe</a>
          </div>
          
          <div className="cafinder-logo" ref={logoRef}>
            <img 
              src="/images/cafinder-logo.png" 
              alt="Cafinder Logo"
              style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerfectExperience;