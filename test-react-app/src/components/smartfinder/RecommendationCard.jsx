import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const RecommendationCard = ({ cafe, onSwipe, currentIndex, totalCount }) => {
  const cardRef = useRef(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    // Animate card entrance
    gsap.fromTo(cardRef.current,
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
    );

    // Add class for active card
    if (cardRef.current) {
      cardRef.current.classList.add('recommendation-card-active');
    }
  }, [cafe]);

  const handleStart = (e) => {
    isDragging.current = true;
    startX.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    
    // Remove transition during drag
    gsap.set(cardRef.current, { transition: 'none' });
  };

  const handleMove = (e) => {
    if (!isDragging.current) return;
    
    currentX.current = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const deltaX = currentX.current - startX.current;
    const rotation = deltaX * 0.1;
    
    // Move and rotate card
    gsap.set(cardRef.current, {
      x: deltaX,
      rotation: rotation,
      scale: 1 - Math.abs(deltaX) * 0.0005
    });
    
    // Show swipe indicators
    if (deltaX > 50) {
      cardRef.current.classList.add('swiping-right');
      cardRef.current.classList.remove('swiping-left');
    } else if (deltaX < -50) {
      cardRef.current.classList.add('swiping-left');
      cardRef.current.classList.remove('swiping-right');
    } else {
      cardRef.current.classList.remove('swiping-right', 'swiping-left');
    }
  };

  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    const deltaX = currentX.current - startX.current;
    const threshold = 100;
    
    if (Math.abs(deltaX) > threshold) {
      // Swipe detected
      onSwipe(deltaX > 0 ? 'right' : 'left');
    } else {
      // Snap back to center
      gsap.to(cardRef.current, {
        x: 0,
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(2)'
      });
      cardRef.current.classList.remove('swiping-right', 'swiping-left');
    }
  };

  const handleButtonSwipe = (direction) => {
    // Animate before swiping
    gsap.to(cardRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => onSwipe(direction)
    });
  };

  return (
    <div className="recommendation-screen phase-content">
      <div className="recommendation-header">
        <div className="counter">{currentIndex} / {totalCount}</div>
        <div className="match-badge">Rekomendasi</div>
      </div>
      
      <div 
        className="recommendation-card"
        ref={cardRef}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <div className="card-image" style={{ 
          backgroundImage: `url(${cafe.imageUrl || '/images/placeholder-cafe.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div className="card-gradient" />
          <div className="swipe-indicator left">
            <span>SKIP</span>
          </div>
          <div className="swipe-indicator right">
            <span>SAVE</span>
          </div>
        </div>
        
        <div className="card-content">
          <h3 className="cafe-name">{cafe.name}</h3>
          <p className="cafe-location">{cafe.location}</p>
          
          <div className="cafe-tags">
            {cafe.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
          
          <div className="cafe-features">
            {cafe.features.map((feature, index) => (
              <div key={index} className="feature">
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-text">{feature.text}</span>
              </div>
            ))}
          </div>
          
          <p className="cafe-description">{cafe.description}</p>
          
          <div className="match-reasons">
            <h4>Mengapa cocok untuk Anda:</h4>
            <ul>
              {cafe.matchReasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="card-actions">
          <button 
            className="action-btn skip"
            onClick={() => handleButtonSwipe('left')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          
          <button 
            className="action-btn save"
            onClick={() => handleButtonSwipe('right')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M20.84 4.61C19.58 3.35 17.56 3.35 16.3 4.61L12 8.91L7.7 4.61C6.44 3.35 4.42 3.35 3.16 4.61C1.9 5.87 1.9 7.89 3.16 9.15L12 18L20.84 9.15C22.1 7.89 22.1 5.87 20.84 4.61Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;