import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

const FeaturedReviewers = () => {
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const sliderRef = useRef(null);
  
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
    
    // Animate description
    gsap.to(descriptionRef.current, {
      scrollTrigger: {
        trigger: descriptionRef.current,
        start: "top 80%"
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2
    });
    
    // Animate reviewer cards with stagger
    gsap.to(".reviewer-card", {
      scrollTrigger: {
        trigger: ".reviewers-slider",
        start: "top 80%"
      },
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "back.out(1.2)"
    });

    // No auto-scroll animation - user will scroll manually
  }, []);
  
  // Top reviewers data - Team members first, then community reviewers
  const featuredReviewers = [
    // Cafinder Team Members (in order: Semmi, Haydar, Sutan, Gega, Araya)
    {
      id: 1,
      name: "Semmi",
      reviewCount: 150,
      image: "/images/team-semmi.jpeg",
      isTeam: true
    },
    {
      id: 2,
      name: "Haydar",
      reviewCount: 142,
      image: "/images/team-haydar.jpeg",
      isTeam: true
    },
    {
      id: 3,
      name: "Sutan",
      reviewCount: 135,
      image: "/images/team-Sutan.jpeg",
      isTeam: true
    },
    {
      id: 4,
      name: "Gega",
      reviewCount: 128,
      image: "/images/team-gega.jpeg",
      isTeam: true
    },
    {
      id: 5,
      name: "Araya",
      reviewCount: 125,
      image: "/images/team-araya.jpeg",
      isTeam: true
    },
    // Community Reviewers with team photos
    {
      id: 6,
      name: "Sari Dewi",
      reviewCount: 95,
      image: "/images/team-semmi.jpeg"
    },
    {
      id: 7,
      name: "Rendi Pratama",
      reviewCount: 88,
      image: "/images/team-haydar.jpeg"
    },
    {
      id: 8,
      name: "Maya Kusuma",
      reviewCount: 76,
      image: "/images/team-Sutan.jpeg"
    }
  ];
  
  return (
    <section className="featured-reviewers">
      <div className="container">
        <div className="reviewers-heading">
          <h2 ref={headingRef}>
            <span className="rank-icon">🏆</span>
            Featured Reviewers
          </h2>
          <p ref={descriptionRef}>
            Temui para reviewer terbaik Cafinder yang telah membantu ribuan orang menemukan cafe perfect mereka
          </p>
        </div>
        
        <div className="reviewers-slider" ref={sliderRef}>
          <div className="reviewers-track">
            {featuredReviewers.map((reviewer) => (
              <div className="reviewer-card" key={reviewer.id}>
                <div className="reviewer-image">
                  <img src={reviewer.image} alt={reviewer.name} />
                </div>
                <div className="reviewer-info">
                  <h3 className="reviewer-name">{reviewer.name}</h3>
                  <div className="review-stats">
                    <span className="review-count">{reviewer.reviewCount}</span>
                    <span className="review-label">reviews</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedReviewers;