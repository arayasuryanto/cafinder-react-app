import React, { useState } from 'react';

const CafeGallery = ({ cafe }) => {
  const [currentImage, setCurrentImage] = useState(0);
  
  if (!cafe) return null;
  
  // In a real implementation, we would have multiple images
  // For now, we'll simulate a gallery with the main image
  const images = [
    cafe.imageUrl,
    // Additional images would go here in a real implementation
  ];
  
  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const handleNextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  
  if (images.length === 0) {
    return (
      <div className="cafe-gallery empty-gallery">
        <div className="no-images">
          <p>No images available for this cafe.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cafe-gallery">
      <div className="gallery-main">
        <img src={images[currentImage]} alt={cafe.name} />
        
        {images.length > 1 && (
          <>
            <button 
              className="gallery-nav prev" 
              onClick={handlePrevImage}
              aria-label="Previous image"
            >
              &#10094;
            </button>
            <button 
              className="gallery-nav next" 
              onClick={handleNextImage}
              aria-label="Next image"
            >
              &#10095;
            </button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`thumbnail ${index === currentImage ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)}
            >
              <img src={image} alt={`${cafe.name} thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CafeGallery;