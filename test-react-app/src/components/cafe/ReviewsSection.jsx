import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

const defaultRatings = {
  overall: 0,
  categories: {}
};

const ReviewsSection = ({ 
  ratings = defaultRatings, 
  reviews = [], 
  totalReviews = 0 
}) => {
  const sectionRef = useRef(null);
  const summaryRef = useRef(null);
  const categoriesRef = useRef(null);
  const reviewsRef = useRef(null);
  const filtersRef = useRef(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  
  // Helper function to render star ratings
  const renderStars = (rating, size = 'small') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg 
          key={`full-${i}`} 
          width={size === 'small' ? '14' : '18'} 
          height={size === 'small' ? '14' : '18'} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg 
          key="half" 
          width={size === 'small' ? '14' : '18'} 
          height={size === 'small' ? '14' : '18'} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22 9.24L14.81 8.62L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.55 13.97L22 9.24ZM12 15.4V6.1L13.71 10.14L18.09 10.52L14.77 13.4L15.77 17.68L12 15.4Z" fill="currentColor"/>
        </svg>
      );
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg 
          key={`empty-${i}`} 
          width={size === 'small' ? '14' : '18'} 
          height={size === 'small' ? '14' : '18'} 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22 9.24L14.81 8.62L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.55 13.97L22 9.24ZM12 15.4L8.24 17.67L9.24 13.39L5.92 10.51L10.3 10.13L12 6.1L13.71 10.14L18.09 10.52L14.77 13.4L15.77 17.68L12 15.4Z" fill="currentColor"/>
        </svg>
      );
    }
    
    return stars;
  };
  
  // Function to filter reviews by rating
  const filterReviews = (filter) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredReviews(reviews);
    } else {
      const ratingValue = parseInt(filter.split('-')[0]);
      setFilteredReviews(reviews.filter(review => Math.floor(review.rating) === ratingValue));
    }
    setVisibleReviews(3);
  };
  
  // Calculate count for each star rating
  const calculateRatingDistribution = () => {
    const distribution = {
      '5': 0,
      '4': 0,
      '3': 0,
      '2': 0,
      '1': 0
    };
    
    if (!reviews || reviews.length === 0) return distribution;
    
    reviews.forEach(review => {
      const ratingKey = Math.floor(review.rating).toString();
      if (distribution[ratingKey] !== undefined) {
        distribution[ratingKey]++;
      }
    });
    
    return distribution;
  };
  
  const ratingDistribution = calculateRatingDistribution();
  
  // Calculate percentage for rating bar
  const calculatePercentage = (count) => {
    if (!reviews || reviews.length === 0) return 0;
    return (count / reviews.length) * 100;
  };
  
  // Load more reviews
  const handleLoadMore = () => {
    setVisibleReviews(prev => Math.min(prev + 3, filteredReviews.length));
    
    // Animate new reviews
    setTimeout(() => {
      const newReviews = document.querySelectorAll('.review-card:nth-child(n+' + (visibleReviews + 1) + ')');
      if (newReviews.length > 0) {
        gsap.from(newReviews, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out"
        });
      }
    }, 100);
  };
  
  // Update filtered reviews when reviews prop changes
  useEffect(() => {
    setFilteredReviews(reviews);
  }, [reviews]);
  
  useEffect(() => {
    // Animate section title
    const title = sectionRef.current?.querySelector('h2');
    if (title) {
      gsap.from(title, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out"
      });
    }
    
    // Animate reviews summary
    if (summaryRef.current && summaryRef.current.children.length > 0) {
      gsap.from(summaryRef.current.children, {
        scrollTrigger: {
          trigger: summaryRef.current,
          start: "top 80%"
        },
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.2,
        ease: "power3.out"
      });
    }
    
    // Animate write review button
    const reviewBtn = sectionRef.current?.querySelector('.write-review-btn');
    if (reviewBtn) {
      gsap.from(reviewBtn, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        },
        opacity: 0,
        x: 20,
        duration: 0.5,
        delay: 0.3,
        ease: "power3.out"
      });
    }
    
    // Animate rating categories
    if (categoriesRef.current && categoriesRef.current.children.length > 0) {
      gsap.from(categoriesRef.current.children, {
        scrollTrigger: {
          trigger: categoriesRef.current,
          start: "top 85%"
        },
        opacity: 0,
        y: 15,
        stagger: 0.05,
        duration: 0.4,
        delay: 0.4,
        ease: "power3.out"
      });
    }
    
    // Animate filters
    if (filtersRef.current && filtersRef.current.children.length > 0) {
      gsap.from(filtersRef.current.children, {
        scrollTrigger: {
          trigger: filtersRef.current,
          start: "top 85%"
        },
        opacity: 0,
        y: 10,
        stagger: 0.05,
        duration: 0.4,
        delay: 0.5,
        ease: "power3.out"
      });
    }
    
    // Animate review cards
    if (reviewsRef.current) {
      const cards = reviewsRef.current.querySelectorAll('.review-card');
      if (cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: reviewsRef.current,
            start: "top 85%"
          },
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          delay: 0.6,
          ease: "power3.out"
        });
      }
    }
  }, [filteredReviews]);
  
  // Check if we have any reviews to display
  if (!ratings || !reviews || reviews.length === 0) {
    return (
      <div className="reviews-section" ref={sectionRef}>
        <h2 className="section-title">Reviews</h2>
        <p className="no-reviews-message">No reviews available for this cafe yet.</p>
        <button className="write-review-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>
          </svg>
          Write a Review
        </button>
      </div>
    );
  }
  
  return (
    <div className="reviews-section" ref={sectionRef}>
      <div className="reviews-header">
        <h2 className="section-title">Reviews</h2>
        <button className="write-review-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="currentColor"/>
          </svg>
          Write a Review
        </button>
      </div>
      
      <div className="rating-summary">
        <div className="overall-rating">
          <span className="big-rating">{ratings.overall.toFixed(1)}</span>
          <div className="rating-stars">
            {renderStars(ratings.overall, 'large')}
          </div>
          <p className="review-count">{totalReviews} reviews</p>
        </div>
        
        <div className="rating-breakdown">
          {[5, 4, 3, 2, 1].map(stars => (
            <div className="rating-bar" key={stars}>
              <span>{stars}</span>
              <div className="bar">
                <div className="fill" style={{ width: `${calculatePercentage(ratingDistribution[stars.toString()])}%` }}></div>
              </div>
              <span>{ratingDistribution[stars.toString()]}</span>
            </div>
          ))}
        </div>
      </div>
      
      {ratings.categories && Object.keys(ratings.categories).length > 0 && (
        <div className="rating-categories" ref={categoriesRef}>
          {Object.entries(ratings.categories).map(([category, value]) => (
            <div key={category} className="rating-category">
              <span className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              <div className="category-rating">
                <div className="rating-bar">
                  <div className="rating-fill" style={{ width: `${(value / 5) * 100}%` }}></div>
                </div>
                <span className="category-value">{value.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="reviews-filters" ref={filtersRef}>
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => filterReviews('all')}
        >
          All
        </button>
        {[5, 4, 3, 2, 1].map(stars => (
          <button 
            key={`filter-${stars}`}
            className={`filter-btn ${activeFilter === `${stars}-stars` ? 'active' : ''}`}
            onClick={() => filterReviews(`${stars}-stars`)}
          >
            {stars} {stars === 1 ? 'star' : 'stars'}
          </button>
        ))}
      </div>
      
      <div className="review-list" ref={reviewsRef}>
        {filteredReviews.slice(0, visibleReviews).map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  <img 
                    src={review.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(review.user?.name || 'User')}&background=F05438&color=fff`} 
                    alt={review.user?.name || 'User'} 
                  />
                </div>
                <div className="reviewer-details">
                  <h4>{review.user?.name || 'Anonymous User'}</h4>
                  <p>{review.user?.reviewCount || 0} reviews • {review.user?.photoCount || 0} photos</p>
                </div>
              </div>
              <div className="review-rating">
                <div className="stars">
                  {renderStars(review.rating)}
                </div>
                <span className="review-date">{review.date || 'recently'}</span>
              </div>
            </div>
            <div className="review-content">
              <p>{review.text}</p>
            </div>
            
            {review.photos && review.photos.length > 0 && (
              <div className="review-photos">
                {review.photos.map((photo, index) => (
                  <img 
                    key={`photo-${index}`} 
                    src={photo} 
                    alt={`Review photo ${index + 1}`} 
                  />
                ))}
              </div>
            )}
            
            <div className="review-actions">
              <button className="like-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 17L12 21L16 17H13V9H11V17H8Z" fill="currentColor"/>
                </svg>
                Helpful ({review.helpfulCount || 0})
              </button>
              <button className="share-btn">Share</button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredReviews.length === 0 && (
        <div className="no-filtered-reviews">
          <p>No reviews match the current filter. Try a different filter.</p>
        </div>
      )}
      
      {visibleReviews < filteredReviews.length && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More Reviews
        </button>
      )}
    </div>
  );
};

export default ReviewsSection;