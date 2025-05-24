import React, { useEffect, useRef } from 'react';

const ProgressBar = () => {
  const progressBarRef = useRef(null);
  
  useEffect(() => {
    const progressBar = progressBarRef.current;
    
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const scrollPercentRounded = Math.round(scrollPercent * 100);
      
      progressBar.style.width = scrollPercentRounded + '%';
    };
    
    window.addEventListener('scroll', updateProgress);
    
    // Call once to set initial state
    updateProgress();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);
  
  return (
    <div className="progress-container">
      <div className="progress-bar" ref={progressBarRef}></div>
    </div>
  );
};

export default ProgressBar;