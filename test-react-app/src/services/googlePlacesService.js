// Google Places API service for fetching real cafe photos
class GooglePlacesService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
    this.baseUrl = 'https://maps.googleapis.com/maps/api/place';
    
    // Cache for storing place photos to avoid repeated API calls
    this.photoCache = new Map();
  }

  // Find place ID by cafe name and address
  async findPlaceByText(cafeName, cafeAddress) {
    if (!this.apiKey || this.apiKey === 'your_google_places_api_key_here') {
      console.warn('Google Places API key not configured');
      return null;
    }

    try {
      const query = `${cafeName} ${cafeAddress}`;
      const response = await fetch(
        `${this.baseUrl}/findplacefromtext/json?` +
        `input=${encodeURIComponent(query)}&` +
        `inputtype=textquery&` +
        `fields=place_id,name,photos,rating&` +
        `key=${this.apiKey}`
      );

      const data = await response.json();
      
      if (data.status === 'OK' && data.candidates && data.candidates.length > 0) {
        return data.candidates[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error finding place:', error);
      return null;
    }
  }

  // Get photo URL from photo reference
  getPhotoUrl(photoReference, maxWidth = 400, maxHeight = 400) {
    if (!this.apiKey || !photoReference) {
      return null;
    }

    return `${this.baseUrl}/photo?` +
           `maxwidth=${maxWidth}&` +
           `maxheight=${maxHeight}&` +
           `photo_reference=${photoReference}&` +
           `key=${this.apiKey}`;
  }

  // Get multiple photos for a cafe
  async getCafePhotos(cafeName, cafeAddress, maxPhotos = 3) {
    // Check cache first
    const cacheKey = `${cafeName}-${cafeAddress}`;
    if (this.photoCache.has(cacheKey)) {
      return this.photoCache.get(cacheKey);
    }

    try {
      const place = await this.findPlaceByText(cafeName, cafeAddress);
      
      if (!place || !place.photos) {
        return [];
      }

      const photos = place.photos
        .slice(0, maxPhotos)
        .map(photo => ({
          url: this.getPhotoUrl(photo.photo_reference, 400, 350),
          reference: photo.photo_reference,
          width: photo.width,
          height: photo.height
        }));

      // Cache the results
      this.photoCache.set(cacheKey, photos);
      
      return photos;
    } catch (error) {
      console.error('Error getting cafe photos:', error);
      return [];
    }
  }

  // Get the best (first) photo for a cafe
  async getCafePrimaryPhoto(cafeName, cafeAddress) {
    const photos = await this.getCafePhotos(cafeName, cafeAddress, 1);
    return photos.length > 0 ? photos[0].url : null;
  }

  // Batch fetch photos for multiple cafes (more efficient)
  async batchFetchCafePhotos(cafes) {
    const promises = cafes.map(async (cafe) => {
      const photoUrl = await this.getCafePrimaryPhoto(cafe.name, cafe.address);
      return {
        ...cafe,
        realPhotoUrl: photoUrl
      };
    });

    try {
      const results = await Promise.allSettled(promises);
      return results.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          console.warn(`Failed to fetch photo for ${cafes[index].name}:`, result.reason);
          return cafes[index]; // Return original cafe without photo
        }
      });
    } catch (error) {
      console.error('Error in batch fetch:', error);
      return cafes; // Return original cafes if batch fails
    }
  }

  // Clear photo cache (useful for development)
  clearCache() {
    this.photoCache.clear();
  }

  // Check if API is configured
  isConfigured() {
    return this.apiKey && this.apiKey !== 'your_google_places_api_key_here';
  }
}

// Create singleton instance
const googlePlacesService = new GooglePlacesService();

export default googlePlacesService;

// Export utility functions for easier use
export const {
  getCafePhotos,
  getCafePrimaryPhoto,
  batchFetchCafePhotos,
  isConfigured
} = googlePlacesService;