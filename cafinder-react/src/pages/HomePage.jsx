import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/home/Hero';
import SearchForm from '../components/home/SearchForm';
import CafeCategories from '../components/home/CafeCategories';
import PerfectExperience from '../components/home/PerfectExperience';
import Stats from '../components/home/Stats';
import './HomePage.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  useEffect(() => {
    // Progress bar animation
    const progressBar = document.querySelector('.progress-bar');
    
    if (progressBar) {
      window.addEventListener('scroll', () => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const scrollPercentage = (scrollPosition / totalScroll) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
      });
    }
    
    // Cursor follower
    const cursor = document.querySelector('.cursor-follower');
    
    if (cursor) {
      document.addEventListener('mousemove', (e) => {
        // Small delay for smooth following effect
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2
        });
      });
      
      // Show cursor when mouse enters the page
      document.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
          opacity: 1,
          scale: 1,
          duration: 0.3
        });
      });
      
      // Hide cursor when mouse leaves the page
      document.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3
        });
      });
      
      // Make cursor larger when hovering over links and buttons
      const interactiveElements = document.querySelectorAll('a, button');
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          gsap.to(cursor, {
            width: 60,
            height: 60,
            duration: 0.3
          });
        });
        
        element.addEventListener('mouseleave', () => {
          gsap.to(cursor, {
            width: 40,
            height: 40,
            duration: 0.3
          });
        });
      });
    }
    
    // Clean up event listeners on component unmount
    return () => {
      if (progressBar) {
        window.removeEventListener('scroll', () => {});
      }
      
      if (cursor) {
        document.removeEventListener('mousemove', () => {});
        document.removeEventListener('mouseenter', () => {});
        document.removeEventListener('mouseleave', () => {});
        
        const interactiveElements = document.querySelectorAll('a, button');
        
        interactiveElements.forEach(element => {
          element.removeEventListener('mouseenter', () => {});
          element.removeEventListener('mouseleave', () => {});
        });
      }
    };
  }, []);
  
  return (
    <div className="home-page">
      {/* Progress indicator */}
      <div className="progress-container">
        <div className="progress-bar"></div>
      </div>
      
      {/* Cursor follower */}
      <div className="cursor-follower"></div>
      
      {/* Hero Section */}
      <Hero />
      
      {/* Search Form */}
      <SearchForm />
      
      {/* Popular Category */}
      <CafeCategories />
      
      {/* Perfect Experience */}
      <PerfectExperience />
      
      {/* Stats */}
      <Stats />
    </div>
  );
};

export default HomePage;