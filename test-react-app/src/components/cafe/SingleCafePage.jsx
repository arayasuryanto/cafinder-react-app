import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import cafe components
import CafeGallery from './CafeGallery';
import CafeDetails from './CafeDetails';
import CafeActionButtons from './CafeActionButtons';
import CafeFeatures from './CafeFeatures';
import AboutSection from './AboutSection';
import OpeningHours from './OpeningHours';
import LocationSection from './LocationSection';
import GoogleReviewsSection from './GoogleReviewsSection';
import CafinderReviewsSection from './CafinderReviewsSection';

// Import styles
import './SingleCafePage.css';

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

// Helper function to convert different image formats to the gallery format
const convertImages = (cafeData) => {
  // If the cafe already has images in the correct format, return them
  if (cafeData.images && cafeData.images.length > 0 && cafeData.images[0].url) {
    return cafeData.images;
  }
  
  // If the cafe has a single image property, convert it to the gallery format
  if (cafeData.image) {
    return [
      {
        id: 1,
        url: cafeData.image,
        caption: cafeData.name || 'Cafe Image'
      }
    ];
  }
  
  // Return empty array if no images found
  return [];
};

const SingleCafePage = ({ cafeData, onBackToCatalog }) => {
  const pageRef = useRef(null);
  const breadcrumbRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Animate breadcrumb
    if (breadcrumbRef.current) {
      gsap.fromTo(
        breadcrumbRef.current,
        { opacity: 0, y: -10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5,
          ease: "power3.out"
        }
      );
    }
    
    // Animate hero section
    if (heroRef.current) {
      const heroElements = heroRef.current.querySelectorAll('.animate-in');
      gsap.fromTo(
        heroElements,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        }
      );
    }
    
    // Set up ScrollTrigger for the rest of the content
    ScrollTrigger.batch('.animate-on-scroll', {
      start: "top 85%",
      onEnter: batch => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        });
      },
      once: true
    });
    
    // Clean up ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Get current day name for opening hours
  const getCurrentDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  };

  return (
    <div className="single-cafe-page" ref={pageRef}>
      {!cafeData && (
        <div className="container">
          <div className="loading-error">
            <h2>Could not load cafe data</h2>
            <p>Sorry, we couldn't find the cafe you're looking for.</p>
            <button onClick={onBackToCatalog} className="back-to-catalog-btn">
              Back to Catalog
            </button>
          </div>
        </div>
      )}
      
      {cafeData && (
        <div className="container">
          {/* Breadcrumb navigation */}
          <div className="breadcrumb" ref={breadcrumbRef}>
            <a href="/" onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/');
            }}>Home</a>
            <span>/</span>
            <a href="/catalog" onClick={(e) => {
              e.preventDefault();
              onBackToCatalog();
            }}>Katalog</a>
            <span>/</span>
            <a href={`/catalog/${cafeData.id}`}>{cafeData.name}</a>
          </div>
          
          {/* Cafe Hero Section */}
          <section className="cafe-hero" ref={heroRef}>
            <div className="cafe-main-info">
              {/* Cafe Gallery */}
              <div className="animate-in">
                <CafeGallery images={convertImages(cafeData)} />
              </div>
              
              {/* Cafe Info Sidebar */}
              <div className="cafe-info animate-in">
                <div className="cafe-header">
                  <div className="cafe-title">
                    <h1>{cafeData.name}</h1>
                    <div className="cafe-rating">
                      {/* Star Rating Display */}
                      <div className="rating-stars">
                        {Array(5).fill(0).map((_, i) => (
                          <span key={i} className={i < Math.floor(cafeData.rating || 0) ? 'filled' : ''}>★</span>
                        ))}
                      </div>
                      <span className="rating-number">{cafeData.rating ? parseFloat(cafeData.rating).toFixed(1) : 'N/A'}</span>
                      <span className="review-count">({cafeData.reviewCount || cafeData.totalReviews || 0} reviews)</span>
                    </div>
                  </div>
                  <button className="save-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.5 3C14.76 3 13.09 3.81 12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5C2 12.28 5.4 15.36 10.55 20.04L12 21.35L13.45 20.03C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3ZM12.1 18.55L12 18.65L11.9 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 5.99 11.07 7.36H12.94C13.46 5.99 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55Z" fill="currentColor"/>
                    </svg>
                    Save
                  </button>
                </div>
                
                <div className="cafe-details">
                  <div className="detail-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="var(--primary)"/>
                    </svg>
                    <span>{cafeData.fullAddress || cafeData.address}</span>
                  </div>
                  
                  {cafeData.openingHours && cafeData.openingHours.length > 0 && (
                    <div className="detail-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="var(--primary)"/>
                      </svg>
                      <span>
                        {(() => {
                          const todayHours = cafeData.openingHours.find(day => day.day === getCurrentDay());
                          return todayHours && todayHours.hours && todayHours.hours.hours ? 
                            `${getCurrentDay()} - ${todayHours.hours.hours}` :
                            'Hours not available';
                        })()}
                      </span>
                      <button className="toggle-hours">Show all hours</button>
                    </div>
                  )}
                  
                  {cafeData.phone && (
                    <div className="detail-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="var(--primary)"/>
                      </svg>
                      <span>{cafeData.phone}</span>
                    </div>
                  )}
                  
                  {cafeData.website && (
                    <div className="detail-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM18.92 8H15.97C15.65 6.75 15.19 5.55 14.59 4.44C16.43 5.07 17.96 6.35 18.92 8ZM12 4.04C12.83 5.24 13.48 6.57 13.91 8H10.09C10.52 6.57 11.17 5.24 12 4.04ZM4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14H4.26ZM5.08 16H8.03C8.35 17.25 8.81 18.45 9.41 19.56C7.57 18.93 6.04 17.66 5.08 16ZM8.03 8H5.08C6.04 6.34 7.57 5.07 9.41 4.44C8.81 5.55 8.35 6.75 8.03 8ZM12 19.96C11.17 18.76 10.52 17.43 10.09 16H13.91C13.48 17.43 12.83 18.76 12 19.96ZM14.34 14H9.66C9.57 13.34 9.5 12.68 9.5 12C9.5 11.32 9.57 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14ZM14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56ZM16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14H16.36Z" fill="var(--primary)"/>
                      </svg>
                      <span>
                        <a href={cafeData.website} target="_blank" rel="noopener noreferrer">
                          {cafeData.website.includes('instagram.com') ? 'Instagram Page' : 'Website'}
                        </a>
                      </span>
                    </div>
                  )}
                  
                  {!cafeData.phone && !cafeData.website && (
                    <div className="detail-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2ZM12 7C11.45 7 11 7.45 11 8V12C11 12.55 11.45 13 12 13C12.55 13 13 12.55 13 12V8C13 7.45 12.55 7 12 7ZM13 17V15H11V17H13Z" fill="#6C757D"/>
                      </svg>
                      <span>Contact information not available</span>
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <CafeActionButtons cafe={cafeData} />
              </div>
            </div>
          </section>
          
          {/* Cafe Features Section */}
          <div className="animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <CafeFeatures features={cafeData.features} />
          </div>
          
          {/* Main Content Section */}
          <div className="cafe-content">
            <div className="cafe-main-info">
              {/* About Section */}
              <div className="animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <AboutSection 
                  description={cafeData.description} 
                  aboutDetails={cafeData.aboutDetails}
                  features={cafeData.features} 
                />
              </div>
              
              {/* Location Section */}
              <div className="animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <LocationSection 
                  address={cafeData.fullAddress || cafeData.address}
                  coordinates={cafeData.coordinates}
                  nearbyAttractions={cafeData.nearbyAttractions}
                />
              </div>
              
              {/* Google Reviews Section */}
              <div className="animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <GoogleReviewsSection cafeData={cafeData} />
              </div>
              
              {/* Cafinder User Reviews Section */}
              <div className="animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <CafinderReviewsSection cafeId={cafeData.id} />
              </div>
            </div>
            
            <div className="cafe-sidebar">
              {/* Opening Hours - always show, component handles no data case */}
              <div className="animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <OpeningHours 
                  hours={cafeData.openingHours} 
                  currentDay={getCurrentDay()}
                />
              </div>
              
              {/* Contact Information - show if any contact info exists */}
              {(cafeData.phone || cafeData.website) && (
                <div className="animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                  <div className="contact-section">
                    <h3 className="contact-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.54 5C6.6 5.89 6.75 6.76 6.99 7.59L5.79 8.79C5.38 7.59 5.12 6.32 5.03 5H6.54M16.4 17.02C17.25 17.26 18.12 17.41 19 17.47V18.96C17.68 18.87 16.41 18.61 15.2 18.21L16.4 17.02M7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.51C21 15.96 20.55 15.51 20 15.51C18.76 15.51 17.55 15.31 16.43 14.94C16.33 14.9 16.22 14.89 16.12 14.89C15.86 14.89 15.61 14.99 15.41 15.18L13.21 17.38C10.38 15.93 8.06 13.62 6.62 10.79L8.82 8.59C9.1 8.31 9.18 7.92 9.07 7.57C8.7 6.45 8.5 5.25 8.5 4C8.5 3.45 8.05 3 7.5 3Z" fill="currentColor"/>
                      </svg>
                      Contact
                    </h3>
                    <div className="contact-list">
                      {cafeData.phone && (
                        <div className="contact-item">
                          <div className="contact-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="currentColor"/>
                            </svg>
                          </div>
                          <div className="contact-text">
                            <a href={`tel:${cafeData.phone}`}>{cafeData.phone}</a>
                          </div>
                        </div>
                      )}
                      
                      {cafeData.website && (
                        <div className="contact-item">
                          <div className="contact-icon">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM18.92 8H15.97C15.65 6.75 15.19 5.55 14.59 4.44C16.43 5.07 17.96 6.35 18.92 8ZM12 4.04C12.83 5.24 13.48 6.57 13.91 8H10.09C10.52 6.57 11.17 5.24 12 4.04ZM4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14H4.26ZM5.08 16H8.03C8.35 17.25 8.81 18.45 9.41 19.56C7.57 18.93 6.04 17.66 5.08 16ZM8.03 8H5.08C6.04 6.34 7.57 5.07 9.41 4.44C8.81 5.55 8.35 6.75 8.03 8ZM12 19.96C11.17 18.76 10.52 17.43 10.09 16H13.91C13.48 17.43 12.83 18.76 12 19.96ZM14.34 14H9.66C9.57 13.34 9.5 12.68 9.5 12C9.5 11.32 9.57 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14ZM14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56ZM16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14H16.36Z" fill="currentColor"/>
                            </svg>
                          </div>
                          <div className="contact-text">
                            <a href={cafeData.website} target="_blank" rel="noopener noreferrer">
                              {cafeData.website.includes('instagram.com') ? 'Instagram Page' : 'Website'}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Social Media - if website contains instagram/facebook links */}
                    {cafeData.website && (cafeData.website.includes('instagram.com') || cafeData.website.includes('facebook.com')) && (
                      <div className="social-media">
                        {cafeData.website.includes('instagram.com') && (
                          <a href={cafeData.website} 
                             className="social-icon" 
                             target="_blank" 
                             rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z" fill="currentColor"/>
                            </svg>
                          </a>
                        )}
                        
                        {cafeData.website.includes('facebook.com') && (
                          <a href={cafeData.website}
                             className="social-icon"
                             target="_blank"
                             rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2.04001C6.5 2.04001 2 6.53001 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85001C10.44 7.34001 11.93 5.96001 14.22 5.96001C15.31 5.96001 16.45 6.15001 16.45 6.15001V8.62001H15.19C13.95 8.62001 13.56 9.39001 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5879 18.0622 20.3855 19.6099 18.5701C21.1576 16.7546 22.0054 14.4457 22 12.06C22 6.53001 17.5 2.04001 12 2.04001Z" fill="currentColor"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Popular Times - only show if popular times data exists */}
              {cafeData.popularTimes && (
                <div className="animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                  <div className="popular-times">
                    <h3 className="times-title">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="currentColor"/>
                      </svg>
                      Popular Times
                    </h3>
                    
                    <div className="time-tabs">
                      <div className="time-tab active">Weekday</div>
                      <div className="time-tab">Weekend</div>
                    </div>
                    
                    <div className="time-chart">
                      {cafeData.popularTimes.weekday && cafeData.popularTimes.weekday.morning && (
                        <div className="time-period">
                          <div className="period-name">Morning (7-11 AM)</div>
                          <div className="period-bar">
                            <div className={`period-fill ${cafeData.popularTimes.weekday.morning}`}></div>
                          </div>
                        </div>
                      )}
                      
                      {cafeData.popularTimes.weekday && cafeData.popularTimes.weekday.midday && (
                        <div className="time-period">
                          <div className="period-name">Midday (11 AM-2 PM)</div>
                          <div className="period-bar">
                            <div className={`period-fill ${cafeData.popularTimes.weekday.midday}`}></div>
                          </div>
                        </div>
                      )}
                      
                      {cafeData.popularTimes.weekday && cafeData.popularTimes.weekday.afternoon && (
                        <div className="time-period">
                          <div className="period-name">Afternoon (2-5 PM)</div>
                          <div className="period-bar">
                            <div className={`period-fill ${cafeData.popularTimes.weekday.afternoon}`}></div>
                          </div>
                        </div>
                      )}
                      
                      {cafeData.popularTimes.weekday && cafeData.popularTimes.weekday.evening && (
                        <div className="time-period">
                          <div className="period-name">Evening (5-9 PM)</div>
                          <div className="period-bar">
                            <div className={`period-fill ${cafeData.popularTimes.weekday.evening}`}></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Suggestion for related cafes would go here */}
            </div>
          </div>
          
          {/* Similar Cafes Section */}
          <div className="animate-on-scroll" style={{ opacity: 0, transform: 'translateY(30px)' }}>
            <section className="similar-cafes">
              <h2>You might also like</h2>
              <div className="similar-cafes-grid">
                {/* This would be populated with similar cafes if available */}
                <div className="similar-cafe-card placeholder">
                  <div className="placeholder-text">Similar cafe suggestions coming soon!</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCafePage;