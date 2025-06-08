/**
 * Coordinate Service
 * Utilities for working with cafe coordinates and Google Maps integration
 */

// Configuration
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY || '';

/**
 * Parse coordinates from various Google Maps URL formats
 * @param {string} url - Google Maps URL
 * @returns {Object|null} - { lat, lng } or null if not found
 */
export function parseCoordinatesFromUrl(url) {
  if (!url) return null;
  
  // Decode URL
  const decodedUrl = decodeURIComponent(url);
  
  // Patterns to match coordinates in various Google Maps URL formats
  const patterns = [
    // Pattern 1: @lat,lng,zoom
    /@(-?\d+\.\d+),(-?\d+\.\d+),/,
    // Pattern 2: !3d{lat}!4d{lng}
    /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
    // Pattern 3: ll=lat,lng
    /ll=(-?\d+\.\d+),(-?\d+\.\d+)/,
    // Pattern 4: q=lat,lng
    /q=(-?\d+\.\d+),(-?\d+\.\d+)/,
    // Pattern 5: /place/.../@lat,lng
    /\/place\/[^/]+\/@(-?\d+\.\d+),(-?\d+\.\d+)/,
    // Pattern 6: center=lat,lng
    /center=(-?\d+\.\d+),(-?\d+\.\d+)/
  ];
  
  for (const pattern of patterns) {
    const match = decodedUrl.match(pattern);
    if (match) {
      return {
        lat: parseFloat(match[1]),
        lng: parseFloat(match[2])
      };
    }
  }
  
  return null;
}

/**
 * Get place details from Google Places API
 * @param {string} placeId - Google Place ID
 * @returns {Promise<Object|null>} - Place details including coordinates
 */
export async function getPlaceDetails(placeId) {
  if (!placeId || !GOOGLE_API_KEY) {
    console.error('Place ID or API key missing');
    return null;
  }
  
  const service = new window.google.maps.places.PlacesService(
    document.createElement('div')
  );
  
  return new Promise((resolve) => {
    service.getDetails(
      {
        placeId: placeId,
        fields: ['geometry', 'name', 'formatted_address']
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place.geometry) {
          resolve({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            name: place.name,
            address: place.formatted_address
          });
        } else {
          console.error(`Failed to get place details: ${status}`);
          resolve(null);
        }
      }
    );
  });
}

/**
 * Geocode an address to get coordinates
 * @param {string} address - Address to geocode
 * @returns {Promise<Object|null>} - Coordinates or null
 */
export async function geocodeAddress(address) {
  if (!address || !window.google) {
    return null;
  }
  
  const geocoder = new window.google.maps.Geocoder();
  
  return new Promise((resolve) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        resolve({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
          accuracy: results[0].geometry.location_type
        });
      } else {
        console.error(`Geocoding failed: ${status}`);
        resolve(null);
      }
    });
  });
}

/**
 * Get coordinates for a cafe using multiple methods
 * @param {Object} cafe - Cafe object
 * @returns {Promise<Object|null>} - Coordinates with source info
 */
export async function getCoordinatesForCafe(cafe) {
  // If coordinates already exist and are valid, return them
  if (cafe.coordinates && cafe.coordinates.lat && cafe.coordinates.lng) {
    return {
      ...cafe.coordinates,
      source: 'existing_data'
    };
  }
  
  // Method 1: Try to parse from Google Maps URL
  if (cafe.google_maps_direction) {
    const coords = parseCoordinatesFromUrl(cafe.google_maps_direction);
    if (coords) {
      return {
        ...coords,
        source: 'parsed_from_url'
      };
    }
  }
  
  // Method 2: Use Google Place ID if available (requires Google Maps JS API)
  if (cafe.placeId && window.google && window.google.maps) {
    try {
      const details = await getPlaceDetails(cafe.placeId);
      if (details) {
        return {
          lat: details.lat,
          lng: details.lng,
          source: 'google_places_api'
        };
      }
    } catch (error) {
      console.error('Error getting place details:', error);
    }
  }
  
  // Method 3: Geocode from address (least accurate)
  if (cafe.address && window.google && window.google.maps) {
    try {
      const coords = await geocodeAddress(cafe.address);
      if (coords) {
        return {
          ...coords,
          source: 'geocoded_address'
        };
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
    }
  }
  
  return null;
}

/**
 * Calculate distance between two coordinates (in kilometers)
 * @param {Object} coord1 - { lat, lng }
 * @param {Object} coord2 - { lat, lng }
 * @returns {number} - Distance in kilometers
 */
export function calculateDistance(coord1, coord2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Validate coordinates
 * @param {Object} coords - { lat, lng }
 * @returns {boolean} - True if valid
 */
export function isValidCoordinates(coords) {
  if (!coords || typeof coords.lat !== 'number' || typeof coords.lng !== 'number') {
    return false;
  }
  
  // Check if coordinates are within valid ranges
  // Latitude: -90 to 90
  // Longitude: -180 to 180
  return coords.lat >= -90 && coords.lat <= 90 &&
         coords.lng >= -180 && coords.lng <= 180;
}

/**
 * Get Google Maps direction URL for coordinates
 * @param {Object} coords - { lat, lng }
 * @param {string} placeName - Optional place name
 * @returns {string} - Google Maps URL
 */
export function getGoogleMapsUrl(coords, placeName = '') {
  if (!isValidCoordinates(coords)) {
    return '';
  }
  
  const baseUrl = 'https://www.google.com/maps/dir/?api=1';
  const destination = `${coords.lat},${coords.lng}`;
  const params = new URLSearchParams({
    destination: destination
  });
  
  if (placeName) {
    params.append('destination_place_id', placeName);
  }
  
  return `${baseUrl}&${params.toString()}`;
}

/**
 * Create a Google Maps marker for a cafe
 * @param {Object} map - Google Maps instance
 * @param {Object} cafe - Cafe object with coordinates
 * @param {Object} options - Additional marker options
 * @returns {Object|null} - Google Maps Marker instance
 */
export function createCafeMarker(map, cafe, options = {}) {
  const coords = cafe.coordinates || parseCoordinatesFromUrl(cafe.google_maps_direction);
  
  if (!coords || !window.google || !window.google.maps) {
    return null;
  }
  
  const marker = new window.google.maps.Marker({
    position: coords,
    map: map,
    title: cafe.name,
    ...options
  });
  
  // Add info window if needed
  if (options.showInfoWindow) {
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="padding: 10px;">
          <h3 style="margin: 0 0 5px 0;">${cafe.name}</h3>
          <p style="margin: 0 0 5px 0; color: #666;">${cafe.address || 'No address available'}</p>
          ${cafe.rating ? `<p style="margin: 0;">Rating: ${cafe.rating} ⭐</p>` : ''}
        </div>
      `
    });
    
    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  }
  
  return marker;
}

/**
 * Load Google Maps JavaScript API
 * @returns {Promise<void>}
 */
export function loadGoogleMapsAPI() {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default {
  parseCoordinatesFromUrl,
  getPlaceDetails,
  geocodeAddress,
  getCoordinatesForCafe,
  calculateDistance,
  isValidCoordinates,
  getGoogleMapsUrl,
  createCafeMarker,
  loadGoogleMapsAPI
};