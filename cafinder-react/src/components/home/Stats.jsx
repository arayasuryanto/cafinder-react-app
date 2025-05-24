import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './Stats.css';

const Stats = () => {
  const sectionRef = useRef(null);
  const countersRef = useRef([]);
  
  // Add refs to the array
  const addToRefs = (el) => {
    if (el && !countersRef.current.includes(el)) {
      countersRef.current.push(el);
    }
  };
  
  const stats = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 14 10.5356 13.7678 10.7678C13.5356 11 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM4 8C4 4.641 7.554 2 12 2C16.446 2 20 4.641 20 8C20 9.579 19.301 11.008 18.144 12.132C17.768 12.498 17.384 13.83 17.274 13.729C17.736 14.747 19 17.957 19 18.5C19 19.21 18.328 20 17 20C16.596 20 16.2 19.16 16 18.5L13.571 16.714C13.2224 16.6486 12.8634 16.6154 12.504 16.615H11.496C11.1366 16.6154 10.7776 16.6486 10.429 16.714L8 18.5C7.8 19.16 7.404 20 7 20C5.672 20 5 19.21 5 18.5C5 17.957 6.264 14.747 6.726 13.729C6.616 13.83 6.232 12.498 5.856 12.132C4.699 11.008 4 9.579 4 8Z" fill="#F05438"/>
        </svg>
      ),
      number: 1000,
      text: 'Café terdaftar',
      color: 'red'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFC107"/>
        </svg>
      ),
      number: 500,
      text: 'Happy users',
      color: 'yellow'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#0D6EFD"/>
        </svg>
      ),
      number: 300,
      text: 'Kota tersedia',
      color: 'blue'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#198754"/>
        </svg>
      ),
      number: 500,
      text: '5-star ratings',
      color: 'green'
    }
  ];
  
  useEffect(() => {
    // Counter animation
    const animateCounters = () => {
      countersRef.current.forEach((counter, index) => {
        const targetNumber = stats[index].number;
        
        gsap.fromTo(
          counter,
          { innerHTML: 0 },
          {
            innerHTML: targetNumber,
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 }, // Ensures that the innerHTML is always a whole number
            onUpdate: () => {
              // Add + symbol if number is 1000 or more
              if (targetNumber >= 1000 && counter.innerHTML >= 1000) {
                counter.innerHTML = counter.innerHTML + '+';
              }
            }
          }
        );
      });
    };
    
    // Animate section
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        onEnter: animateCounters
      }
    });
    
  }, [stats]);
  
  return (
    <section className="stats" ref={sectionRef}>
      <div className="container">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div className="stat-item" key={index}>
              <div className={`stat-icon ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="stat-number" ref={addToRefs}>0</div>
              <div className="stat-text">{stat.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;