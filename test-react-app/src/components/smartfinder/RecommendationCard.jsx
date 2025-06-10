import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const RecommendationCard = ({ cafe, onSwipe, currentIndex, totalCount, isActive = true }) => {
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Direct use of Google Photos URLs
  const images = React.useMemo(() => {
    console.log('RECOMM CARD DEBUG - Cafe:', cafe.name);
    console.log('RECOMM CARD DEBUG - imageUrl:', cafe.imageUrl);
    console.log('RECOMM CARD DEBUG - images array:', cafe.images);
    
    // Direct use of imageUrl (Google Photos URL)
    if (cafe.imageUrl) {
      console.log('RECOMM CARD - Using Google Photos URL:', cafe.imageUrl);
      return [cafe.imageUrl, cafe.imageUrl, cafe.imageUrl];
    }
    
    // Use images array if available
    if (cafe.images && Array.isArray(cafe.images) && cafe.images.length > 0) {
      console.log('RECOMM CARD - Using images array:', cafe.images);
      return cafe.images;
    }
    
    // Final fallback
    console.log('RECOMM CARD - Using fallback for:', cafe.name);
    return ['https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'];
  }, [cafe.imageUrl, cafe.images, cafe.name]);

  useEffect(() => {
    // Only animate if this is the active card
    if (isActive && cardRef.current) {
      cardRef.current.classList.add('recommendation-card-active');
      
      // Instant reveal using CSS
      cardRef.current.style.opacity = '1';
      cardRef.current.style.transform = 'scale(1)';
    }

    // Reset scroll state for new card
    setIsScrolled(false);
    setCurrentImageIndex(0);
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [cafe, isActive]);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    setIsScrolled(scrollTop > 20);
  };

  const handleImageNavigation = (direction) => {
    if (direction === 'next' && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else if (direction === 'prev' && currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    }
  };

  const handleStart = (e) => {
    if (!isActive) return; // Only active card can be swiped
    
    isDragging.current = true;
    startX.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    
    // Disable transitions for immediate response
    const card = cardRef.current;
    card.style.transition = 'none';
    card.style.willChange = 'transform';
  };

  const handleMove = (e) => {
    if (!isDragging.current || !isActive) return;
    
    e.preventDefault();
    currentX.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const deltaX = currentX.current - startX.current;
    const rotation = deltaX * 0.03; // Even less rotation for smoother feel
    
    // Direct DOM manipulation for zero lag
    const card = cardRef.current;
    if (!card) return;
    
    // Use transform3d for hardware acceleration
    card.style.transform = `translate3d(${deltaX}px, 0, 0) rotateZ(${rotation}deg)`;
    
    // Optimize indicator updates
    const threshold = 80;
    const hasRight = card.classList.contains('swiping-right');
    const hasLeft = card.classList.contains('swiping-left');
    
    if (deltaX > threshold && !hasRight) {
      card.classList.add('swiping-right');
      card.classList.remove('swiping-left');
    } else if (deltaX < -threshold && !hasLeft) {
      card.classList.add('swiping-left');
      card.classList.remove('swiping-right');
    } else if (Math.abs(deltaX) <= threshold && (hasRight || hasLeft)) {
      card.classList.remove('swiping-right', 'swiping-left');
    }
  };

  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    const deltaX = currentX.current - startX.current;
    const threshold = 90;
    const card = cardRef.current;
    card.style.willChange = 'auto';
    
    if (Math.abs(deltaX) > threshold) {
      // Swipe detected - ultra fast animation
      const direction = deltaX > 0 ? 'right' : 'left';
      
      // Use CSS for smooth GPU-accelerated animation
      card.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1), opacity 0.15s ease-out';
      card.style.transform = `translate3d(${direction === 'right' ? 600 : -600}px, 0, 0) rotateZ(${direction === 'right' ? 20 : -20}deg)`;
      card.style.opacity = '0';
      
      // Trigger callback quickly
      setTimeout(() => {
        if (onSwipe) onSwipe(direction);
      }, 150);
    } else {
      // Snap back with spring animation
      card.style.transition = 'transform 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      card.style.transform = 'translate3d(0, 0, 0) rotateZ(0deg)';
      card.classList.remove('swiping-right', 'swiping-left');
      
      // Clean up transition
      setTimeout(() => {
        card.style.transition = '';
      }, 150);
    }
  };

  const handleButtonSwipe = (direction) => {
    if (!isActive) return;
    
    const card = cardRef.current;
    
    // Add swipe indicator
    card.classList.add(direction === 'left' ? 'swiping-left' : 'swiping-right');
    
    // Ultra fast swipe animation
    card.style.willChange = 'transform, opacity';
    card.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1), opacity 0.15s ease-out';
    card.style.transform = `translate3d(${direction === 'right' ? 600 : -600}px, 0, 0) rotateZ(${direction === 'right' ? 20 : -20}deg)`;
    card.style.opacity = '0';
    
    // Quick callback
    setTimeout(() => {
      if (onSwipe) onSwipe(direction);
    }, 150);
  };

  return (
    <div className="recommendation-screen phase-content">
      <div className="recommendation-header">
        <div className="counter">{currentIndex} / {totalCount}</div>
        <div className="match-badge">Rekomendasi</div>
      </div>
      
      <div 
        className={`recommendation-card bumble-style-full ${isScrolled ? 'scrolled' : ''}`}
        ref={cardRef}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        {/* Swipe Indicators - Fixed position */}
        <div className="swipe-indicator left">
          <span>SKIP</span>
        </div>
        <div className="swipe-indicator right">
          <span>SAVE</span>
        </div>

        {/* Full Scrollable Content */}
        <div 
          className="full-scroll-content"
          ref={contentRef}
          onScroll={handleScroll}
        >
          {/* Image Gallery Section */}
          <div className="image-gallery-section">
            <div className="main-image">
              <img 
                src={images[currentImageIndex]} 
                alt={cafe.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
                onError={(e) => {
                  console.log('Image failed to load:', images[currentImageIndex]);
                  console.log('Trying fallback image...');
                  // Use a different fallback image to avoid infinite loops
                  e.target.src = 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
                  e.target.onerror = null; // Prevent infinite loop
                }}
                onLoad={() => {
                  console.log('Image loaded successfully:', images[currentImageIndex]);
                }}
              />
              <div className="image-overlay-bg" />
              {/* Image Navigation Areas */}
              {images.length > 1 && (
                <>
                  <div 
                    className="image-nav-area left"
                    onClick={() => handleImageNavigation('prev')}
                  />
                  <div 
                    className="image-nav-area right"
                    onClick={() => handleImageNavigation('next')}
                  />
                </>
              )}

              {/* Image Indicators */}
              {images.length > 1 && (
                <div className="image-indicators">
                  {images.map((_, index) => (
                    <div 
                      key={index}
                      className={`image-dot ${index === currentImageIndex ? 'active' : ''}`}
                    />
                  ))}
                </div>
              )}

              {/* Bottom Gradient Overlay */}
              <div className="image-overlay" />

              {/* Key Info Overlay - Bumble Style */}
              <div className="cafe-info-overlay">
                <div className="cafe-name-large">{cafe.name}</div>
                <div className="cafe-location-main">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M21 10C21 17L12 23L3 10C3 6.134 7.134 2 12 2S21 6.134 21 10Z" stroke="white" strokeWidth="2"/>
                    <circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2"/>
                  </svg>
                  {cafe.location}
                </div>
                
                {/* Quick Tags */}
                <div className="quick-tags">
                  {cafe.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="quick-tag">
                      {feature.icon} {feature.text}
                    </span>
                  ))}
                </div>

                {/* Rating if available */}
                {cafe.rating && (
                  <div className="rating-display">
                    <span className="star">⭐</span>
                    <span>{cafe.rating}</span>
                    {cafe.reviewCount && <span className="review-count">({cafe.reviewCount})</span>}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Details Section */}
          <div className="content-details-section">
            {/* Scroll Indicator */}
            <div className="scroll-indicator-mini">
              <div className="scroll-bar-mini" />
            </div>

            {/* Detailed Content */}
            <div className="detailed-content-full">
              {/* Description - Same as catalog page */}
              <div className="detail-block">
                <h4>Tentang Cafe</h4>
                <p>{cafe.description}</p>
                {cafe.aboutDetails && cafe.aboutDetails.length > 0 && (
                  <div className="about-details">
                    {cafe.aboutDetails.slice(0, 2).map((detail, index) => (
                      <p key={index} className="about-detail">{detail}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* Opening Hours - Same format as catalog page */}
              <div className="detail-block">
                <h4>Jam Buka</h4>
                {cafe.openingHours && (
                  <div className="opening-hours">
                    {Array.isArray(cafe.openingHours) ? (
                      // Handle array format (from the JSON data)
                      cafe.openingHours.slice(0, 7).map((hours, index) => (
                        <div key={index} className="hours-item">
                          {typeof hours === 'string' ? hours : `${hours.day || `Day ${index + 1}`}: ${hours.hours || hours.time || 'Jam buka tersedia'}`}
                        </div>
                      ))
                    ) : (
                      // Handle object format (from the adapter)
                      Object.entries(cafe.openingHours).slice(0, 7).map(([day, hours], index) => (
                        <div key={index} className="hours-item">
                          {day}: {hours.close === "Closed" ? "Closed" : `${hours.open} to ${hours.close}`}
                        </div>
                      ))
                    )}
                    {(!cafe.openingHours || (Array.isArray(cafe.openingHours) && cafe.openingHours.length === 0)) && (
                      <div className="hours-item">Jam buka tersedia - hubungi langsung</div>
                    )}
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="detail-block">
                <h4>Fasilitas</h4>
                <div className="features-grid">
                  {cafe.features && cafe.features.length > 0 ? (
                    cafe.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <span className="feature-text">{feature}</span>
                      </div>
                    ))
                  ) : (
                    <div className="feature-item">
                      <span className="feature-text">Fasilitas basic cafe tersedia</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Match Reasons */}
              <div className="detail-block">
                <h4>Mengapa Cocok untuk Anda</h4>
                <div className="match-reasons-list">
                  {cafe.matchReasons.map((reason, index) => (
                    <div key={index} className="match-reason-item">
                      <span className="check-icon">✓</span>
                      {reason}
                    </div>
                  ))}
                </div>
              </div>

              {/* All Tags */}
              <div className="detail-block">
                <h4>Tags</h4>
                <div className="all-tags">
                  {cafe.tags.map((tag, index) => (
                    <span key={index} className="detail-tag">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Spacer for action buttons */}
              <div className="bottom-spacer-full" />
            </div>
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom */}
        <div className="card-actions-bumble-fixed">
          <button 
            className="action-btn-bumble skip"
            onClick={() => handleButtonSwipe('left')}
            title="Skip"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button 
            className="action-btn-bumble save"
            onClick={() => handleButtonSwipe('right')}
            title="Save to Favorites"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61C19.58 3.35 17.56 3.35 16.3 4.61L12 8.91L7.7 4.61C6.44 3.35 4.42 3.35 3.16 4.61C1.9 5.87 1.9 7.89 3.16 9.15L12 18L20.84 9.15C22.1 7.89 22.1 5.87 20.84 4.61Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;