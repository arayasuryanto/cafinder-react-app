import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

const PopularCategory = () => {
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef(null);
  
  useEffect(() => {
    // Animate section heading
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
    
    // Animate description
    gsap.to(descriptionRef.current, {
      scrollTrigger: {
        trigger: descriptionRef.current,
        start: "top 80%"
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    });
    
    // Animate cafe cards with stagger
    gsap.to(".cafe-card", {
      scrollTrigger: {
        trigger: cardsRef.current,
        start: "top 80%"
      },
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)"
    });
  }, []);
  
  const handleNextClick = () => {
    const cards = cardsRef.current;
    cards.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  };
  
  const handlePrevClick = () => {
    const cards = cardsRef.current;
    cards.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  };
  
  return (
    <section className="popular-category">
      <div className="container">
        <div className="section-header">
          <h2 ref={headingRef}>Kategori Café Populer</h2>
          <div className="nav-arrows">
            <button className="prev-btn" onClick={handlePrevClick}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#6C757D"/>
              </svg>
            </button>
            <button className="next-btn" onClick={handleNextClick}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z" fill="#6C757D"/>
              </svg>
            </button>
          </div>
        </div>
        
        <p className="category-description" ref={descriptionRef}>
          Temukan café menggunakan filter yang memudahkan sesuai dengan kebutuhanmu! Mulai dari berbagai kategori favorit yang sering digunakan oleh pengguna hingga rekomendasi kafe sesuai aktivitas yang paling dicari.
        </p>
        
        <div className="cafe-cards" ref={cardsRef}>
          <div className="cafe-card">
            <div className="cafe-img" style={{backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')`}}></div>
            <div className="cafe-details">
              <span className="cafe-type">Belajar Spot</span>
              <h3 className="cafe-name">Cafe Berkonsep Modern</h3>
              <p className="cafe-info">Cafe dengan lingkungan tenang untuk belajar atau bekerja.</p>
            </div>
          </div>
          
          <div className="cafe-card">
            <div className="cafe-img" style={{backgroundImage: `url('https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')`}}></div>
            <div className="cafe-details">
              <span className="cafe-type">Meeting Bisnis</span>
              <h3 className="cafe-name">Meeting Room Cafe</h3>
              <p className="cafe-info">Tempat ideal untuk meeting bisnis dengan fasilitas lengkap.</p>
            </div>
          </div>
          
          <div className="cafe-card">
            <div className="cafe-img" style={{backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')`}}></div>
            <div className="cafe-details">
              <span className="cafe-type">Nongkrong Bareng</span>
              <h3 className="cafe-name">Cafe Ambience Cozy</h3>
              <p className="cafe-info">Suasana santai dan nyaman untuk nongkrong bersama teman.</p>
            </div>
          </div>
          
          <div className="cafe-card">
            <div className="cafe-img" style={{backgroundImage: `url('https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')`}}></div>
            <div className="cafe-details">
              <span className="cafe-type">Hidden Gem</span>
              <h3 className="cafe-name">Secret Garden Cafe</h3>
              <p className="cafe-info">Tempat tersembunyi dengan konsep taman yang menyegarkan.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularCategory;