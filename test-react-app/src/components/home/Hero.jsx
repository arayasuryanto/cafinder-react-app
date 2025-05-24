import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const highlightRef = useRef(null);
  
  useEffect(() => {
    // Create timeline for animations
    const heroTl = gsap.timeline();
    
    // Animate heading
    heroTl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    // Animate paragraph
    .to(paragraphRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.5")
    // Animate button
    .to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5");
    
    // Special animation for highlighted word
    gsap.from(highlightRef.current, {
      color: '#F05438',
      fontWeight: 900,
      scale: 1.2,
      duration: 1.5,
      ease: "elastic.out(1.2, 0.4)",
      delay: 1
    });
    
  }, []);
  
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 ref={headingRef}>
            Temukan <span className="highlight-word" ref={highlightRef}>spot</span> nongkrong cepat
          </h1>
          <p ref={paragraphRef}>
            Cafinder membantu kamu menemukan tempat ngopi dan nongkrong terbaik sesuai preferensimu.
          </p>
          <button className="hero-btn" ref={buttonRef}>Cari Sekarang</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;