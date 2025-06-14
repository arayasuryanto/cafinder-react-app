import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import styles
import './App.css';

// Import layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Import UI components
import CursorFollower from './components/ui/CursorFollower';
import ProgressBar from './components/ui/ProgressBar';

// Import Home sections
import Hero from './components/home/Hero';
import InteractiveFinder from './components/home/InteractiveFinder';
import MapCTA from './components/home/MapCTA';
import CafeDiscoveryMap from './components/home/CafeDiscoveryMap';
import SmartFinderCTA from './components/home/SmartFinderCTA';
import Testimonials from './components/home/Testimonials';
import './components/home/HomePage.css';

// Import Catalog components
import CatalogPage from './components/catalog/CatalogPage';
import './components/catalog/CatalogPage.css';

// Import Cafe Page components
import SimpleCafePage from './components/cafe/SimpleCafePage';
import './components/cafe/SimpleCafePage.css';

// Import Map components
import CafeMapPage from './components/map/CafeMapPage';

// Import About components
import TentangKamiPage from './components/about/TentangKamiPage';

// Import Smart Finder components
import SmartFinderPage from './components/smartfinder/SmartFinderPage';

// Import Recommendations components
import CategoryRecommendationsPage from './components/recommendations/CategoryRecommendationsPage';
import NeedBasedRecommendations from './components/recommendations/NeedBasedRecommendations';
import RegionalExplorationPage from './components/recommendations/RegionalExplorationPage';

// Import Burndown Chart component
import BurndownChartPage from './components/burndown/BurndownChartPage';

// Import sample cafe data for fallback
import singleCafeData from './data/singleCafeData';

// Import cleaned cafes data utilities
import { fetchCleanedCafesData, fetchCafeById } from './data/cleanedCafesData';

// Import data adapter utilities
import { adaptCafeDataForSinglePage } from './utils/cafeDataAdapter';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  // Use state to track current page and selected cafe
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCafe, setSelectedCafe] = useState(null);
  // State for storing cafe data
  const [cafesData, setCafesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch cafes data from cleaned_surabaya_cafes.json
  useEffect(() => {
    const loadCafesData = async () => {
      setIsLoading(true);
      try {
        // Fetch the first 30 cafes for catalog display
        const cleanedCafes = await fetchCleanedCafesData(30);
        
        // Transform the fetched data using our adapter
        const transformedData = cleanedCafes.map(cafe => {
          const adaptedCafe = adaptCafeDataForSinglePage(cafe);
          // Make sure to preserve the original google_maps_direction
          adaptedCafe.google_maps_direction = cafe.google_maps_direction;
          return adaptedCafe;
        });
        setCafesData(transformedData);
      } catch (error) {
        console.error('Error loading cafes data:', error);
        // Fallback to preview data if fetch fails
        setCafesData([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCafesData();
    
    // Enable ScrollTrigger for all GSAP animations
    ScrollTrigger.refresh();
  }, []);
  
  // Listen for URL changes
  useEffect(() => {
    const handleUrlChange = async () => {
      const path = window.location.pathname;
      
      if (path === '/' || path === '') {
        setCurrentPage('home');
        setSelectedCafe(null);
      } else if (path.includes('/catalog/cafe/')) {
        // Extract cafe ID from URL
        const cafeId = path.split('/catalog/cafe/')[1];
        setCurrentPage('cafe');
        
        // Try to find the cafe in already loaded data first
        let cafeData = cafesData.find(cafe => cafe.id === cafeId);
        
        // If not found in loaded data, fetch it directly by ID
        if (!cafeData) {
          try {
            const fetchedCafe = await fetchCafeById(cafeId);
            if (fetchedCafe) {
              cafeData = adaptCafeDataForSinglePage(fetchedCafe);
              // Make sure to preserve the original google_maps_direction
              cafeData.google_maps_direction = fetchedCafe.google_maps_direction;
            }
          } catch (error) {
            console.error('Error fetching cafe by ID:', error);
            // Fallback to original data for compatibility
            cafeData = singleCafeData;
          }
        }
        
        setSelectedCafe(cafeData);
      } else if (path === '/catalog' || path.includes('catalog')) {
        setCurrentPage('catalog');
        setSelectedCafe(null);
      } else if (path === '/map') {
        setCurrentPage('map');
        setSelectedCafe(null);
      } else if (path === '/tentang-kami' || path === '/about') {
        setCurrentPage('tentang-kami');
        setSelectedCafe(null);
      } else if (path === '/finder' || path === '/smart-finder') {
        setCurrentPage('smart-finder');
        setSelectedCafe(null);
      } else if (path === '/rekomendasi' || path === '/recommendations') {
        setCurrentPage('recommendations');
        setSelectedCafe(null);
      } else if (path === '/need-based-recommendations') {
        setCurrentPage('need-based-recommendations');
        setSelectedCafe(null);
      } else if (path === '/regional-exploration') {
        setCurrentPage('regional-exploration');
        setSelectedCafe(null);
      } else if (path === '/burndown-chart') {
        setCurrentPage('burndown-chart');
        setSelectedCafe(null);
      }
    };
    
    // Initial check
    handleUrlChange();
    
    // Add event listener for popstate (back/forward button)
    window.addEventListener('popstate', handleUrlChange);
    
    // Clean up ScrollTriggers on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [cafesData]);
  
  // Custom navigation function
  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (path === '/' || path === '') {
      setCurrentPage('home');
      setSelectedCafe(null);
    } else if (path.includes('/catalog/cafe/')) {
      setCurrentPage('cafe');
      // We handle cafe selection in the viewCafe function instead of here
    } else if (path === '/catalog' || path.includes('catalog')) {
      setCurrentPage('catalog');
      setSelectedCafe(null);
    } else if (path === '/map') {
      setCurrentPage('map');
      setSelectedCafe(null);
    } else if (path === '/tentang-kami' || path === '/about') {
      setCurrentPage('tentang-kami');
      setSelectedCafe(null);
    } else if (path === '/finder' || path === '/smart-finder') {
      setCurrentPage('smart-finder');
      setSelectedCafe(null);
    } else if (path === '/rekomendasi' || path === '/recommendations') {
      setCurrentPage('recommendations');
      setSelectedCafe(null);
    } else if (path === '/need-based-recommendations') {
      setCurrentPage('need-based-recommendations');
      setSelectedCafe(null);
    } else if (path === '/regional-exploration') {
      setCurrentPage('regional-exploration');
      setSelectedCafe(null);
    } else if (path === '/burndown-chart') {
      setCurrentPage('burndown-chart');
      setSelectedCafe(null);
    }
  };
  
  // Function to view a specific cafe
  const viewCafe = async (cafeId) => {
    // First try to find the cafe in our already loaded data
    let selectedCafeData = cafesData.find(cafe => cafe.id === cafeId);
    
    // If not found, fetch it directly
    if (!selectedCafeData) {
      try {
        const fetchedCafe = await fetchCafeById(cafeId);
        if (fetchedCafe) {
          selectedCafeData = adaptCafeDataForSinglePage(fetchedCafe);
          // Make sure to preserve the original google_maps_direction
          selectedCafeData.google_maps_direction = fetchedCafe.google_maps_direction;
        } else {
          // Fallback to original sample data if fetch fails
          selectedCafeData = singleCafeData;
        }
      } catch (error) {
        console.error('Error fetching cafe data:', error);
        selectedCafeData = singleCafeData;
      }
    }
    
    // Set the selected cafe for viewing
    setSelectedCafe(selectedCafeData);
    navigateTo(`/catalog/cafe/${cafeId}`);
  };
  
  // Function to go back to catalog
  const backToCatalog = () => {
    navigateTo('/catalog');
  };
  
  // Override Header and Footer link clicks with custom navigation
  useEffect(() => {
    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.getAttribute('href').startsWith('/')) {
        e.preventDefault();
        navigateTo(link.getAttribute('href'));
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);
  
  // HomePage component
  const HomePage = () => (
    <>
      <Hero navigateTo={navigateTo} />
      <InteractiveFinder navigateTo={navigateTo} />
      <MapCTA navigateTo={navigateTo} />
      <CafeDiscoveryMap navigateTo={navigateTo} />
      <SmartFinderCTA navigateTo={navigateTo} />
      <Testimonials />
    </>
  );
  
  return (
    <div className="App">
      {/* Cursor follower */}
      <CursorFollower />
      
      {/* Progress Bar */}
      <ProgressBar />
      
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'catalog' && (
          <CatalogPage 
            cafes={cafesData} 
            onViewCafe={viewCafe} 
            isLoading={isLoading} 
          />
        )}
        {currentPage === 'cafe' && selectedCafe && (
          <SimpleCafePage cafeData={selectedCafe} onBackToCatalog={backToCatalog} />
        )}
        {currentPage === 'map' && (
          <CafeMapPage />
        )}
        {currentPage === 'tentang-kami' && (
          <TentangKamiPage />
        )}
        {currentPage === 'smart-finder' && (
          <SmartFinderPage />
        )}
        {currentPage === 'recommendations' && (
          <CategoryRecommendationsPage />
        )}
        {currentPage === 'need-based-recommendations' && (
          <NeedBasedRecommendations />
        )}
        {currentPage === 'regional-exploration' && (
          <RegionalExplorationPage />
        )}
        {currentPage === 'burndown-chart' && (
          <BurndownChartPage />
        )}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;