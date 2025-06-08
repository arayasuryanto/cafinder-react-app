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
  
  // Top reviewers data (sorted by review count - highest first)
  const featuredReviewers = [
    {
      id: 1,
      name: "Andi Setiawan",
      reviewCount: 127,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Sari Dewi",
      reviewCount: 95,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      name: "Rendi Pratama",
      reviewCount: 88,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 4,
      name: "Maya Kusuma",
      reviewCount: 76,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 5,
      name: "Budi Hartono",
      reviewCount: 64,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 6,
      name: "Indira Sari",
      reviewCount: 58,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 7,
      name: "Farhan Ahmad",
      reviewCount: 52,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 8,
      name: "Lestari Putri",
      reviewCount: 45,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
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