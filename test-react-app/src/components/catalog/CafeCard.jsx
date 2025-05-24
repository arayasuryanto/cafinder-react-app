import React from 'react';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';

const CafeCard = ({ cafe, onViewCafe }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        delay: 0.1,
        ease: "power3.out"
      }
    );
  }, []);
  
  const handleViewCafe = () => {
    // Call the onViewCafe function with the cafe's ID
    if (onViewCafe) {
      onViewCafe(cafe.id);
    }
  };
  
  // Get the right image source - cafe data structure might differ
  const getImageSource = () => {
    if (cafe.images && cafe.images.length > 0) {
      return cafe.images[0].url;
    } else if (cafe.image) {
      return cafe.image;
    } else if (cafe.imageUrl) {
      return cafe.imageUrl;
    }
    return 'https://via.placeholder.com/400x300?text=No+Image'; // Fallback image
  };
  
  // Get address - different formats might be available
  const getAddress = () => {
    if (cafe.fullAddress) {
      return cafe.fullAddress;
    } else if (cafe.address) {
      return cafe.address;
    }
    return `${cafe.neighborhood || ''}, ${cafe.city || 'Surabaya'}`;
  };
  
  return (
    <div className="cafe-catalog-card" ref={cardRef}>
      <div 
        className="cafe-catalog-img" 
        style={{ backgroundImage: `url(${getImageSource()})` }}
        onClick={handleViewCafe}
      >
        <div className="cafe-price-tag">{cafe.priceRange || "$$"}</div>
        <div className="cafe-rating">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFC107"/>
          </svg>
          <span>{cafe.rating || "0"}</span>
          {cafe.totalReviews > 0 && (
            <small className="review-count">({cafe.totalReviews})</small>
          )}
        </div>
      </div>
      <div className="cafe-catalog-details">
        <h3 className="cafe-catalog-name" onClick={handleViewCafe}>{cafe.name}</h3>
        <p className="cafe-catalog-location">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#6C757D"/>
          </svg>
          <span>{getAddress()}</span>
        </p>
        <div className="cafe-catalog-tags">
          {cafe.tags && cafe.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="cafe-tag">{tag}</span>
          ))}
        </div>
        <p className="cafe-catalog-desc">{cafe.description}</p>
        <button className="view-cafe-btn" onClick={handleViewCafe}>Lihat Detail</button>
      </div>
    </div>
  );
};

export default CafeCard;