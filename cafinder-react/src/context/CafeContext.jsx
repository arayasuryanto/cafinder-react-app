import React, { createContext, useState, useEffect, useContext } from 'react';
import * as cafeService from '../services/cafeService';

// Create the context
const CafeContext = createContext();

// Custom hook to use the cafe context
export const useCafeContext = () => useContext(CafeContext);

// Provider component
export const CafeProvider = ({ children }) => {
  const [cafes, setCafes] = useState([]);
  const [featuredCafes, setFeaturedCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load all cafes on initial render
  useEffect(() => {
    const loadCafes = async () => {
      try {
        setLoading(true);
        
        // Load all cafes
        const allCafes = await cafeService.getAllCafes();
        setCafes(allCafes);
        
        // Load featured cafes
        const featured = await cafeService.getFeaturedCafes(3);
        setFeaturedCafes(featured);
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading cafes:', err);
        setError('Failed to load cafe data. Please try again later.');
        setLoading(false);
      }
    };
    
    loadCafes();
  }, []);
  
  // Get a cafe by ID
  const getCafeById = async (id) => {
    // First check if we already have it in state
    const existingCafe = cafes.find(cafe => cafe.id === id);
    if (existingCafe) {
      return existingCafe;
    }
    
    // Otherwise fetch it
    try {
      return await cafeService.getCafeById(id);
    } catch (err) {
      console.error(`Error fetching cafe ${id}:`, err);
      throw err;
    }
  };
  
  // Search cafes
  const searchCafes = async (term, type = 'name') => {
    try {
      return await cafeService.searchCafes(term, type);
    } catch (err) {
      console.error('Error searching cafes:', err);
      throw err;
    }
  };
  
  // Filter cafes
  const filterCafes = async (filters) => {
    try {
      return await cafeService.filterCafes(filters);
    } catch (err) {
      console.error('Error filtering cafes:', err);
      throw err;
    }
  };
  
  // Search and filter combined
  const searchAndFilterCafes = async (searchTerm, searchType, filters) => {
    try {
      // First search by term
      let results = [];
      
      if (searchTerm) {
        results = await cafeService.searchCafes(searchTerm, searchType);
      } else {
        results = [...cafes];
      }
      
      // Then apply filters if provided
      if (filters && Object.keys(filters).some(key => 
        Array.isArray(filters[key]) ? filters[key].length > 0 : filters[key]
      )) {
        // Apply filters manually to the search results
        if (filters.rating && filters.rating > 0) {
          results = results.filter(cafe => parseFloat(cafe.rating) >= filters.rating);
        }
        
        if (filters.neighborhood) {
          results = results.filter(cafe => cafe.neighborhood === filters.neighborhood);
        }
        
        if (filters.categories && filters.categories.length > 0) {
          results = results.filter(cafe => {
            return cafe.categories.some(category => 
              filters.categories.includes(category.toLowerCase().replace(' ', '_'))
            );
          });
        }
        
        if (filters.features && filters.features.length > 0) {
          results = results.filter(cafe => {
            // Check if the cafe has any of the selected features
            return filters.features.some(feature => {
              // Search through additionalInfo for the feature
              return Object.values(cafe.additionalInfo || {}).some(categoryItems => {
                return categoryItems.some(item => {
                  const [itemFeature, value] = Object.entries(item)[0];
                  return value && itemFeature.toLowerCase().replace(/\s+/g, '_') === feature;
                });
              });
            });
          });
        }
      }
      
      return results;
    } catch (err) {
      console.error('Error in searchAndFilterCafes:', err);
      throw err;
    }
  };
  
  // Context value
  const contextValue = {
    cafes,
    featuredCafes,
    loading,
    error,
    getCafeById,
    searchCafes,
    filterCafes,
    searchAndFilterCafes
  };
  
  return (
    <CafeContext.Provider value={contextValue}>
      {children}
    </CafeContext.Provider>
  );
};

export default CafeContext;