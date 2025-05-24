import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import RegionNavigation from './RegionNavigation';
import CafeList from './CafeList';
import { fetchCleanedCafesData } from '../../data/cleanedCafesData';
import { filterCafesByRegion } from '../../utils/regionFilter';

const CatalogPage = ({ cafes = [], onViewCafe, isLoading: initialLoading = false }) => {
  // State for loading and pagination
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [allCafes, setAllCafes] = useState(cafes);
  
  // Load more cafes when page changes
  useEffect(() => {
    const loadMoreCafes = async () => {
      if (page === 1) return; // Skip for initial load (already handled in App.js)
      
      setIsLoading(true);
      try {
        // Load next batch of cafes (30 per page)
        const moreCafes = await fetchCleanedCafesData(30, (page - 1) * 30);
        
        if (moreCafes.length === 0) {
          setHasMore(false);
        } else {
          // Add new cafes to existing ones
          setAllCafes(prev => [...prev, ...moreCafes]);
        }
      } catch (error) {
        console.error('Error loading more cafes:', error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMoreCafes();
  }, [page]);
  
  // Update allCafes when cafes prop changes (first load)
  useEffect(() => {
    setAllCafes(cafes);
  }, [cafes]);
  // State for currently selected region and filtered cafes
  const [selectedRegion, setSelectedRegion] = useState("Semua");
  const [filteredCafes, setFilteredCafes] = useState(allCafes);
  
  // Refs for animations
  const headerRef = useRef(null);
  const subheaderRef = useRef(null);
  const searchRef = useRef(null);
  
  // Update filtered cafes when all cafes change
  useEffect(() => {
    setFilteredCafes(allCafes);
  }, [allCafes]);
  
  // Function to filter cafes by region using the new filtering system
  const handleFilterByRegion = (region) => {
    const filtered = filterCafesByRegion(allCafes, region);
    setFilteredCafes(filtered);
  };
  
  // Handle region change from navigation
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    handleFilterByRegion(region);
  };
  
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Apply search filter on top of region filter
  useEffect(() => {
    // First apply region filter
    let filtered = filterCafesByRegion(allCafes, selectedRegion);
    
    // If there's a search term, filter by name or tags
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(cafe => 
        cafe.name.toLowerCase().includes(term) || 
        (cafe.tags && cafe.tags.some(tag => tag.toLowerCase().includes(term))) ||
        (cafe.description && cafe.description.toLowerCase().includes(term))
      );
    }
    
    setFilteredCafes(filtered);
  }, [selectedRegion, searchTerm, allCafes]);
  
  // Animation for page elements on load
  useEffect(() => {
    // Headers animation
    gsap.fromTo(
      headerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    
    gsap.fromTo(
      subheaderRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" }
    );
    
    // Search input animation
    gsap.fromTo(
      searchRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, delay: 0.4, ease: "power3.out" }
    );
  }, []);
  
  return (
    <div className="catalog-page">
      <div className="catalog-hero">
        <div className="container">
          <h1 ref={headerRef}>Katalog Café</h1>
          <p ref={subheaderRef}>Temukan café favoritmu di Surabaya berdasarkan wilayah dan kebutuhanmu</p>
          
          <div className="search-container" ref={searchRef}>
            <div className="search-input-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="#6C757D"/>
              </svg>
              <input 
                type="text" 
                placeholder="Cari nama café, tag, atau deskripsi..." 
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <button 
                  className="clear-search-btn" 
                  onClick={() => setSearchTerm("")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#6C757D"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <RegionNavigation 
          currentRegion={selectedRegion} 
          onRegionChange={handleRegionChange}
          cafes={allCafes}
        />
        
        <CafeList 
          cafes={filteredCafes} 
          region={selectedRegion}
          onViewCafe={onViewCafe}
        />
        
        {/* Load More Button */}
        {hasMore && (
          <div className="load-more-container">
            <button 
              className="load-more-btn"
              onClick={() => setPage(p => p + 1)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="small-loader"></div>
                  Loading More...
                </>
              ) : (
                'Load More Cafes'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;