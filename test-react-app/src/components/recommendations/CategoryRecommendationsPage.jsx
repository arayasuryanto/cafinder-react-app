import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { curatedCafeData, categoryMap } from '../../data/curatedRecommendationData';
import { useCafePhotos } from '../../hooks/useCafePhotos';
import './CategoryRecommendationsPage.css';

// Function to get realistic cafe images based on specific cafe characteristics
const getCafeImage = (cafe, index, category) => {
  // Priority 1: Real Google Places photo
  if (cafe.realPhotoUrl) {
    return cafe.realPhotoUrl;
  }
  
  // Priority 2: If cafe has a specific image URL, use it
  if (cafe.imageUrl && cafe.imageUrl.startsWith('http')) {
    return cafe.imageUrl;
  }
  
  // Specific cafe-matched realistic images based on their actual characteristics
  const cafeSpecificImages = {
    // WiFi-focused cafes with modern, work-friendly vibes
    "monopole-coffee-lab": "1521017432-4e4023ae2755", // laptop and coffee
    "historica-cafe": "1501339847302-ac426a4a7cbb", // colonial vintage interior
    "the-origin-coffee": "1556909709-f3115eece164", // modern minimalist
    "calibre-coffee": "1554118811-1e0d58224f24", // fully AC modern interior
    
    // Aesthetic cafes with Instagram-worthy designs
    "kinokunya-coffee": "1544367567-0f2fcb6e56b3", // beautiful aesthetic design
    "terrasse-cafe": "1493857671505-72967e2e2760", // bright aesthetic space
    "common-ground": "1506368249307-d5b8b6afeea1", // trendy modern interior
    
    // Outdoor cafes with terrace/garden vibes
    "roemah-djawa": "1506368249307-d5b8b6afeea1", // traditional outdoor seating
    "kedai-kebun": "1502635385120-26d4553cd1ce", // garden cafe vibe
    
    // Work-friendly cafes
    "work-cafe": "1504626835365-6797aef4a23c", // co-working space
    "study-space": "1516733725897-1aa73b87c8e8", // quiet work environment
    
    // Pet-friendly cafes
    "paws-cafe": "1559056199-641a0ac025fb", // casual pet-friendly
    
    // 24-hour cafes
    "night-owl": "1509042239860-f550ce710b93", // night cafe atmosphere
    
    // Date-perfect cafes
    "romantic-corner": "1493857671505-72967e2e2760" // warm romantic lighting
  };
  
  // Try to get specific image for this cafe
  let imageId = cafeSpecificImages[cafe.id];
  
  // If no specific image, fall back to category-appropriate images
  if (!imageId) {
    const categoryImages = {
      wifi: ['1521017432-4e4023ae2755', '1556909709-f3115eece164', '1504626835365-6797aef4a23c'],
      aesthetic: ['1501339847302-ac426a4a7cbb', '1544367567-0f2fcb6e56b3', '1493857671505-72967e2e2760'],
      outdoor: ['1506368249307-d5b8b6afeea1', '1502635385120-26d4553cd1ce', '1559056199-641a0ac025fb'],
      work: ['1521017432-4e4023ae2755', '1556909709-f3115eece164', '1504626835365-6797aef4a23c'],
      pet: ['1501339847302-ac426a4a7cbb', '1559056199-641a0ac025fb', '1506368249307-d5b8b6afeea1'],
      hour24: ['1509042239860-f550ce710b93', '1521017432-4e4023ae2755', '1556909709-f3115eece164'],
      date: ['1501339847302-ac426a4a7cbb', '1544367567-0f2fcb6e56b3', '1493857671505-72967e2e2760']
    };
    
    const images = categoryImages[category] || categoryImages.aesthetic;
    imageId = images[index % images.length];
  }
  
  // Variable heights for natural masonry effect
  const heights = [350, 420, 380, 450, 390, 360, 440];
  const height = heights[index % heights.length];
  
  return `https://images.unsplash.com/photo-${imageId}?w=400&h=${height}&fit=crop&auto=format&q=85&fm=jpg`;
};

const CategoryRecommendationsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('wifi');
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get category from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  // Get categories from the category map
  const categories = Object.values(categoryMap).map(cat => ({
    ...cat,
    label: cat.name
  }));

  // Filter cafes based on selected category
  useEffect(() => {
    setIsLoading(true);
    
    // Get cafes from curated data
    const cafesForCategory = curatedCafeData[selectedCategory] || [];
    setFilteredCafes(cafesForCategory);
    
    setIsLoading(false);
  }, [selectedCategory]);

  // Use the custom hook to fetch real photos
  const { cafesWithPhotos, photosLoaded, loading: photosLoading, hasGoogleAPI } = useCafePhotos(filteredCafes);

  // Show all cafes (with real photos if available)
  const currentCafes = cafesWithPhotos;

  // GSAP Animations
  useEffect(() => {
    gsap.fromTo('.hero-section', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    gsap.fromTo('.category-card', 
      { opacity: 0, y: 30, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 0.3
      }
    );
  }, []);

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo('.cafe-card', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    }
  }, [currentCafes, isLoading]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    
    // Update URL without page reload
    const url = new URL(window.location);
    url.searchParams.set('category', categoryId);
    window.history.pushState({}, '', url);
    
    // Animate category switch
    gsap.to('.results-section', {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        gsap.to('.results-section', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.1
        });
      }
    });
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="category-recommendations-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">✨</span>
              <span className="badge-text">Rekomendasi Cafinder</span>
            </div>
            
            <h1 className="hero-title">
              Cari Cafe Sesuai
              <span className="title-highlight"> Kebutuhanmu</span>
            </h1>
            
            <p className="hero-description">
              Temukan cafe terbaik berdasarkan kategori yang kamu butuhkan. 
              Semua rekomendasi dikurasi khusus untukmu!
            </p>
          </div>
          
          <div className="hero-visual">
            <div className="floating-icons">
              <div className="float-icon icon-1">☕</div>
              <div className="float-icon icon-2">📶</div>
              <div className="float-icon icon-3">📸</div>
              <div className="float-icon icon-4">💼</div>
              <div className="float-icon icon-5">🌳</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Pilih Kategori Kebutuhanmu</h2>
          
          <div className="categories-grid">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
                style={{ '--category-color': category.color }}
              >
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-label">{category.label}</h3>
                <p className="category-description">{category.description}</p>
                <div className="category-overlay"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section">
        <div className="container">
          <div className="results-header">
            <div className="results-info">
              <h2 className="results-title">
                <span className="category-icon-large" style={{ color: selectedCategoryData?.color }}>
                  {selectedCategoryData?.icon}
                </span>
                {selectedCategoryData?.label}
              </h2>
              <p className="results-count">
                Ditemukan <strong>{filteredCafes.length}</strong> cafe yang sesuai dengan kebutuhanmu
              </p>
            </div>
            
            <div className="results-actions">
              <button className="filter-btn">
                <span>🔍</span>
                Filter Lainnya
              </button>
              <button className="sort-btn">
                <span>⚡</span>
                Urutkan
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-grid">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="loading-card">
                  <div className="loading-image"></div>
                  <div className="loading-content">
                    <div className="loading-title"></div>
                    <div className="loading-text"></div>
                    <div className="loading-text short"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="cafes-masonry">
                {currentCafes.map((cafe, index) => (
                  <div key={cafe.id} className="cafe-pin">
                    <div className="pin-image">
                      <img 
                        src={getCafeImage(cafe, index, selectedCategory)}
                        alt={`${cafe.name} - ${cafe.address}`}
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to a guaranteed working cafe image
                          e.target.src = 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=350&fit=crop&auto=format&q=85';
                        }}
                      />
                      <div className="pin-overlay">
                        <div className="pin-rating">
                          ⭐ {cafe.rating}
                        </div>
                        <div className="pin-category" style={{ backgroundColor: selectedCategoryData?.color }}>
                          {selectedCategoryData?.icon}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pin-content">
                      <h4 className="pin-title">{cafe.name}</h4>
                      <p className="pin-location">📍 {cafe.address.split(',')[0]}</p>
                      
                      <div className="pin-tags">
                        {cafe.hours && <span className="pin-tag">🕒 {cafe.hours.split(' ')[0]}</span>}
                        {cafe.priceRange && <span className="pin-tag">💰 {cafe.priceRange}</span>}
                      </div>
                      
                      <p className="pin-description">{cafe.description.slice(0, 100)}...</p>
                      
                      {cafe.specialty && (
                        <div className="pin-highlight">
                          ✨ {cafe.specialty}
                        </div>
                      )}
                      
                      <div className="pin-actions">
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.name + ' ' + cafe.address)}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="pin-btn visit"
                        >
                          Visit
                        </a>
                        <button className="pin-btn save">
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryRecommendationsPage;