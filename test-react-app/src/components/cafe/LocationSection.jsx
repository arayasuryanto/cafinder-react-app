import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

const LocationSection = ({ address, coordinates = { lat: 0, lng: 0 }, nearbyAttractions = [] }) => {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const attractionsRef = useRef(null);
  
  useEffect(() => {
    // Animate section title and address
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
    
    // Animate map container
    if (mapRef.current) {
      gsap.from(mapRef.current, {
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 85%"
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out"
      });
    }
    
    // Animate address info
    const addressInfo = sectionRef.current.querySelector('.address-info');
    if (addressInfo) {
      gsap.from(addressInfo, {
        scrollTrigger: {
          trigger: addressInfo,
          start: "top 85%"
        },
        opacity: 0,
        y: 15,
        duration: 0.5,
        delay: 0.3,
        ease: "power3.out"
      });
    }
    
    // Animate nearby attractions if they exist
    if (attractionsRef.current) {
      const title = attractionsRef.current.querySelector('.nearby-title');
      if (title) {
        gsap.from(title, {
          scrollTrigger: {
            trigger: attractionsRef.current,
            start: "top 85%"
          },
          opacity: 0,
          y: 15,
          duration: 0.5,
          delay: 0.4,
          ease: "power3.out"
        });
      }
      
      const items = attractionsRef.current.querySelectorAll('.attraction-item');
      if (items.length > 0) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: attractionsRef.current,
            start: "top 85%"
          },
          opacity: 0,
          y: 15,
          stagger: 0.1,
          duration: 0.5,
          delay: 0.5,
          ease: "power3.out"
        });
      }
    }
  }, []);
  
  // Extract the place name from the address or use a default
  const getPlaceName = () => {
    if (address) {
      // Try to get the first part of the address (usually the street name)
      const firstPart = address.split(',')[0];
      return encodeURIComponent(firstPart + ', Surabaya');
    }
    return encodeURIComponent('Surabaya, Indonesia');
  };
  
  return (
    <div className="location-section" ref={sectionRef}>
      <h2 className="section-title">Location</h2>
      
      <div className="map-container" ref={mapRef}>
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${getPlaceName()}&zoom=15`}
        ></iframe>
      </div>
      
      <div className="address-info">
        <div className="address-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12ZM18 10.2C18 6.57 15.35 4 12 4C8.65 4 6 6.57 6 10.2C6 12.54 7.95 15.64 12 19.34C16.05 15.64 18 12.54 18 10.2ZM12 2C16.2 2 20 5.22 20 10.2C20 13.52 17.33 17.45 12 22C6.67 17.45 4 13.52 4 10.2C4 5.22 7.8 2 12 2Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="address-text">
          {address || "Address information not available"}
        </div>
      </div>
      
      {nearbyAttractions && nearbyAttractions.length > 0 && (
        <div className="nearby-attractions" ref={attractionsRef}>
          <h3 className="nearby-title">Nearby Attractions</h3>
          <div className="attractions-list">
            {nearbyAttractions.map((attraction, index) => (
              <div key={index} className="attraction-item">
                <div className="attraction-info">
                  <div className="attraction-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="attraction-details">
                    <h4>{attraction.name}</h4>
                    <p>{attraction.type}</p>
                  </div>
                </div>
                <div className="attraction-distance">
                  {attraction.distance}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSection;