import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = ({ navigateTo }) => {
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
    
    // Enhanced animation for highlighted word "spot"
    const spotTl = gsap.timeline({ delay: 1 });
    
    spotTl
      // Initial entrance with bounce
      .fromTo(highlightRef.current, 
        { 
          scale: 0.5, 
          opacity: 0,
          rotation: -10,
          transformOrigin: "center center"
        },
        {
          scale: 1.3,
          opacity: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(2)",
        }
      )
      // Glow effect
      .to(highlightRef.current, {
        textShadow: "0 0 20px #F05438, 0 0 30px #F05438, 0 0 40px #F05438",
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.3")
      // Scale down to normal with bounce
      .to(highlightRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.6)"
      }, "-=0.2")
      // Continuous subtle pulsing
      .to(highlightRef.current, {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    
    // Add floating animation
    gsap.to(highlightRef.current, {
      y: -2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 2
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
          <button className="hero-btn" ref={buttonRef} onClick={() => navigateTo('/catalog')}>Cari Sekarang</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;