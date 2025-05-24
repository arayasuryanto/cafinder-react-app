import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

const AboutSection = ({ description, aboutDetails = [], features = [] }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const featuresRef = useRef(null);
  
  useEffect(() => {
    // Animate section title
    gsap.from(sectionRef.current.querySelector('h2'), {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out"
    });
    
    // Animate paragraphs with stagger
    gsap.from(textRef.current.querySelectorAll('p'), {
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%"
      },
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.6,
      ease: "power3.out"
    });
    
    // Animate features if they exist
    if (featuresRef.current && featuresRef.current.children.length > 0) {
      gsap.from(featuresRef.current.children, {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 85%"
        },
        opacity: 0,
        y: 15,
        stagger: 0.05,
        duration: 0.4,
        ease: "power3.out"
      });
    }
  }, []);
  
  return (
    <div className="about-section" ref={sectionRef}>
      <h2 className="section-title">About</h2>
      
      <div className="about-text" ref={textRef}>
        <p>{description}</p>
        {aboutDetails && aboutDetails.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      
      {features && features.length > 0 && (
        <>
          <h3 className="features-title">Features & Amenities</h3>
          <div className="features-list" ref={featuresRef}>
            {features.map((feature, index) => (
              <span key={index} className="feature-tag">{feature}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AboutSection;