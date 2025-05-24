import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CursorFollower = () => {
  const cursorRef = useRef(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Fade in cursor when mouse moves
      gsap.to(cursor, {
        opacity: 0.5,
        duration: 0.3
      });
    };
    
    const ticker = () => {
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.2
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.3
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Set up the ticker
    const tickerInstance = gsap.ticker.add(ticker);
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      gsap.ticker.remove(tickerInstance);
    };
  }, []);
  
  return (
    <div className="cursor-follower" ref={cursorRef}></div>
  );
};

export default CursorFollower;