import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // GSAP animation for hero section
    const tl = gsap.timeline();
    
    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .from(buttonRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.4");

  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="container">
        <div className="hero-content">
          <h1 ref={titleRef}>
            Temukan <span className="highlight-word">spot</span> nongkrong cepat
          </h1>
          <p ref={subtitleRef}>
            Cafinder membantu kamu menemukan tempat ngopi dan nongkrong terbaik sesuai preferensimu.
          </p>
          <button className="hero-btn" ref={buttonRef}>Cari Sekarang</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;