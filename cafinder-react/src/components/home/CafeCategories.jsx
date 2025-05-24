import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './CafeCategories.css';

const CafeCategories = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  
  // This would be replaced with data from an API or context
  const categories = [
    {
      id: 'study',
      type: 'Belajar Spot',
      name: 'Cafe Berkonsep Modern',
      info: 'Cafe dengan lingkungan tenang untuk belajar atau bekerja.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
      id: 'meeting',
      type: 'Meeting Bisnis',
      name: 'Meeting Room Cafe',
      info: 'Tempat ideal untuk meeting bisnis dengan fasilitas lengkap.',
      image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
      id: 'hangout',
      type: 'Nongkrong Bareng',
      name: 'Cafe Ambience Cozy',
      info: 'Suasana santai dan nyaman untuk nongkrong bersama teman.',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
      id: 'hidden',
      type: 'Hidden Gem',
      name: 'Secret Garden Cafe',
      info: 'Tempat tersembunyi dengan konsep taman yang menyegarkan.',
      image: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    }
  ];
  
  useEffect(() => {
    // Handle next/prev button clicks
    let scrollAmount = 0;
    const cardWidth = 300; // approximate card width + margin
    
    const handlePrevClick = () => {
      scrollAmount = Math.max(scrollAmount - cardWidth, 0);
      gsap.to(cardsRef.current, {
        scrollLeft: scrollAmount,
        duration: 0.5,
        ease: 'power2.out'
      });
    };
    
    const handleNextClick = () => {
      const maxScroll = cardsRef.current.scrollWidth - cardsRef.current.clientWidth;
      scrollAmount = Math.min(scrollAmount + cardWidth, maxScroll);
      gsap.to(cardsRef.current, {
        scrollLeft: scrollAmount,
        duration: 0.5,
        ease: 'power2.out'
      });
    };
    
    // Add event listeners
    if (prevBtnRef.current && nextBtnRef.current) {
      prevBtnRef.current.addEventListener('click', handlePrevClick);
      nextBtnRef.current.addEventListener('click', handleNextClick);
    }
    
    // Animation for section
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
      }
    });
    
    // Clean up
    return () => {
      if (prevBtnRef.current && nextBtnRef.current) {
        prevBtnRef.current.removeEventListener('click', handlePrevClick);
        nextBtnRef.current.removeEventListener('click', handleNextClick);
      }
    };
  }, []);
  
  return (
    <section className="popular-category" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>Kategori Café Populer</h2>
          <div className="nav-arrows">
            <button className="prev-btn" ref={prevBtnRef}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="#6C757D"/>
              </svg>
            </button>
            <button className="next-btn" ref={nextBtnRef}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z" fill="#6C757D"/>
              </svg>
            </button>
          </div>
        </div>
        
        <p className="category-description">
          Temukan café menggunakan filter yang memudahkan sesuai dengan kebutuhanmu! Mulai dari berbagai kategori favorit yang sering digunakan oleh pengguna hingga rekomendasi kafe sesuai aktivitas yang paling dicari.
        </p>
        
        <div className="cafe-cards" ref={cardsRef}>
          {categories.map(category => (
            <Link to={`/catalog?category=${category.id}`} key={category.id} className="cafe-card">
              <div className="cafe-img" style={{ backgroundImage: `url('${category.image}')` }}></div>
              <div className="cafe-details">
                <span className="cafe-type">{category.type}</span>
                <h3 className="cafe-name">{category.name}</h3>
                <p className="cafe-info">{category.info}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CafeCategories;