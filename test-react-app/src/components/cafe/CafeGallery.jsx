import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Default placeholder image to use when no images are provided
const defaultImage = {
  id: 'default',
  url: 'https://via.placeholder.com/800x400?text=No+Image+Available',
  caption: 'No Image Available'
};

const CafeGallery = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const mainImageRef = useRef(null);
  const galleryRef = useRef(null);
  
  // If images array is empty, use a default placeholder image
  const displayImages = images && images.length > 0 ? images : [defaultImage];
  
  // Generate 4 additional images for the grid, with fallbacks if not enough
  const getGridImages = () => {
    if (displayImages.length === 1) {
      return Array(4).fill(displayImages[0]);
    }
    
    // If we have fewer than 5 images, duplicate some
    if (displayImages.length < 5) {
      return Array(4).fill(0).map((_, i) => displayImages[i % displayImages.length]);
    }
    
    // Skip the first image (main image) and get the next 4
    return displayImages.slice(1, 5);
  };
  
  const gridImages = getGridImages();
  
  // Function to handle image change
  const changeImage = (index) => {
    if (!mainImageRef.current) return;
    
    // Create animation for image transition
    gsap.to(mainImageRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      onComplete: () => {
        setCurrentIndex(index);
        if (mainImageRef.current) {
          gsap.to(mainImageRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3
          });
        }
      }
    });
  };
  
  // Handle next/previous image
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % displayImages.length;
    changeImage(nextIndex);
  };
  
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + displayImages.length) % displayImages.length;
    changeImage(prevIndex);
  };
  
  // Toggle full gallery view
  const toggleFullGallery = (e) => {
    e.preventDefault();
    setShowFullGallery(!showFullGallery);
    
    // Animate the gallery expansion
    if (galleryRef.current) {
      if (!showFullGallery) {
        gsap.to(galleryRef.current, {
          height: 'calc(100vh - 100px)',
          duration: 0.5,
          ease: "power3.out"
        });
      } else {
        gsap.to(galleryRef.current, {
          height: 'auto',
          duration: 0.5,
          ease: "power3.out"
        });
      }
    }
  };
  
  // GSAP animation on component mount
  useEffect(() => {
    const thumbs = document.querySelectorAll('.gallery-thumb');
    if (thumbs.length > 0) {
      gsap.fromTo(
        thumbs,
        { opacity: 0, x: 50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.5, 
          stagger: 0.1,
          delay: 0.3,
          ease: "power3.out"
        }
      );
    }
    
    const elements = document.querySelectorAll('.gallery-counter, .gallery-nav-btn, .gallery-btn');
    if (elements.length > 0) {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          delay: 0.5,
          ease: "power3.out"
        }
      );
    }
    
    const gridItems = document.querySelectorAll('.gallery-grid img');
    if (gridItems.length > 0) {
      gsap.fromTo(
        gridItems,
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          stagger: 0.1,
          delay: 0.2,
          ease: "power3.out"
        }
      );
    }
  }, []);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape' && showFullGallery) {
        setShowFullGallery(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, showFullGallery]);
  
  // Make sure we have a valid current index
  useEffect(() => {
    if (currentIndex >= displayImages.length) {
      setCurrentIndex(0);
    }
  }, [displayImages, currentIndex]);
  
  // If there's only one image or no images, don't show navigation controls
  const showControls = displayImages.length > 1;
  
  return (
    <div className={`cafe-image-gallery ${showFullGallery ? 'full-gallery-mode' : ''}`} ref={galleryRef}>
      <div className="main-image">
        <img 
          ref={mainImageRef}
          src={displayImages[currentIndex]?.url || defaultImage.url} 
          alt={displayImages[currentIndex]?.caption || defaultImage.caption} 
          className="hero-img"
        />
        
        <button className="gallery-btn" onClick={toggleFullGallery}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="currentColor"/>
          </svg>
          View All Photos
        </button>
        
        {showControls && (
          <>
            <div className="gallery-counter">
              {currentIndex + 1} / {displayImages.length}
            </div>
            
            <div className="gallery-nav">
              <button className="gallery-nav-btn" onClick={handlePrev}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z" fill="currentColor"/>
                </svg>
              </button>
              <button className="gallery-nav-btn" onClick={handleNext}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
      
      {!showFullGallery && displayImages.length > 1 && (
        <div className="gallery-grid">
          {gridImages.map((image, index) => (
            <img 
              key={image.id || `grid-${index}`}
              src={image.url} 
              alt={image.caption || `Gallery image ${index + 1}`}
              onClick={() => changeImage(index + 1 < displayImages.length ? index + 1 : index)}
            />
          ))}
        </div>
      )}
      
      {showFullGallery && (
        <div className="full-gallery">
          <div className="full-gallery-header">
            <h3>All Photos ({displayImages.length})</h3>
            <button className="close-gallery-btn" onClick={toggleFullGallery}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          <div className="full-gallery-grid">
            {displayImages.map((image, index) => (
              <div 
                key={image.id || `full-${index}`}
                className={`full-gallery-item ${index === currentIndex ? 'active' : ''}`}
                onClick={() => changeImage(index)}
              >
                <img src={image.url} alt={image.caption || `Gallery image ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CafeGallery;