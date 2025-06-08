import { useState, useEffect, useRef } from 'react';
import googlePlacesService from '../services/googlePlacesService';

// Custom hook for fetching real cafe photos
export const useCafePhotos = (cafes) => {
  const [photosLoaded, setPhotosLoaded] = useState(false);
  const [cafesWithPhotos, setCafesWithPhotos] = useState(cafes);
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef(new Set());

  useEffect(() => {
    // Only fetch if Google Places API is configured and we have cafes
    if (!googlePlacesService.isConfigured() || !cafes || cafes.length === 0) {
      setCafesWithPhotos(cafes);
      setPhotosLoaded(true);
      return;
    }

    // Create a unique key for this set of cafes
    const cafesKey = cafes.map(cafe => cafe.id).sort().join(',');
    
    // Skip if we've already fetched photos for this exact set of cafes
    if (fetchedRef.current.has(cafesKey)) {
      return;
    }

    const fetchPhotos = async () => {
      setLoading(true);
      
      try {
        // Batch fetch photos for all cafes
        const cafesWithRealPhotos = await googlePlacesService.batchFetchCafePhotos(cafes);
        
        setCafesWithPhotos(cafesWithRealPhotos);
        fetchedRef.current.add(cafesKey);
        setPhotosLoaded(true);
      } catch (error) {
        console.error('Error fetching cafe photos:', error);
        // Fallback to original cafes if photo fetch fails
        setCafesWithPhotos(cafes);
        setPhotosLoaded(true);
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to avoid hitting rate limits
    const timeoutId = setTimeout(fetchPhotos, 100);
    
    return () => clearTimeout(timeoutId);
  }, [cafes]);

  return {
    cafesWithPhotos,
    photosLoaded,
    loading,
    hasGoogleAPI: googlePlacesService.isConfigured()
  };
};

// Hook for fetching a single cafe photo
export const useSingleCafePhoto = (cafeName, cafeAddress) => {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!googlePlacesService.isConfigured() || !cafeName || !cafeAddress) {
      return;
    }

    const fetchPhoto = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const url = await googlePlacesService.getCafePrimaryPhoto(cafeName, cafeAddress);
        setPhotoUrl(url);
      } catch (err) {
        setError(err);
        console.error('Error fetching single cafe photo:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [cafeName, cafeAddress]);

  return { photoUrl, loading, error };
};