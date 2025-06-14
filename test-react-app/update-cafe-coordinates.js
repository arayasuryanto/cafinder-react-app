const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  GOOGLE_API_KEY: process.env.GOOGLE_PLACES_API_KEY || 'YOUR_API_KEY_HERE',
  INPUT_FILE: path.join(__dirname, 'public', 'filtered_cafes.json'),
  OUTPUT_FILE: path.join(__dirname, 'public', 'cafes_with_coordinates.json'),
  BACKUP_FILE: path.join(__dirname, 'public', `filtered_cafes_backup_${new Date().toISOString().replace(/:/g, '-')}.json`),
  BATCH_SIZE: 10,
  DELAY_BETWEEN_BATCHES: 1000, // 1 second
  MAX_RETRIES: 3
};

// Google Places API functions
async function getPlaceDetails(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry,name,formatted_address&key=${CONFIG.GOOGLE_API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.result && data.result.geometry) {
      return {
        lat: data.result.geometry.location.lat,
        lng: data.result.geometry.location.lng,
        source: 'google_places_api'
      };
    } else {
      console.error(`Failed to get coordinates for place ${placeId}: ${data.status}`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching place details for ${placeId}:`, error);
    return null;
  }
}

// Parse coordinates from Google Maps URL
function parseCoordinatesFromUrl(url) {
  if (!url) return null;
  
  // Try to extract coordinates from various Google Maps URL patterns
  const patterns = [
    // Pattern 1: @lat,lng,zoom
    /@(-?\d+\.\d+),(-?\d+\.\d+),/,
    // Pattern 2: !3d{lat}!4d{lng}
    /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
    // Pattern 3: ll=lat,lng
    /ll=(-?\d+\.\d+),(-?\d+\.\d+)/,
    // Pattern 4: q=lat,lng
    /q=(-?\d+\.\d+),(-?\d+\.\d+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return {
        lat: parseFloat(match[1]),
        lng: parseFloat(match[2]),
        source: 'parsed_from_url'
      };
    }
  }
  
  return null;
}

// Geocode using address (fallback option)
async function geocodeAddress(address) {
  if (!address) return null;
  
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${CONFIG.GOOGLE_API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK' && data.results && data.results[0]) {
      const location = data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
        source: 'geocoded_from_address',
        accuracy: data.results[0].geometry.location_type
      };
    }
  } catch (error) {
    console.error(`Error geocoding address ${address}:`, error);
  }
  
  return null;
}

// Get coordinates for a single cafe using multiple methods
async function getCoordinatesForCafe(cafe, retries = 0) {
  try {
    // Method 1: Use Google Place ID if available
    if (cafe.placeId) {
      const coordinates = await getPlaceDetails(cafe.placeId);
      if (coordinates) {
        console.log(`✓ Got coordinates for ${cafe.name} using Place ID`);
        return coordinates;
      }
    }
    
    // Method 2: Parse from Google Maps URL
    if (cafe.google_maps_direction) {
      const coordinates = parseCoordinatesFromUrl(cafe.google_maps_direction);
      if (coordinates) {
        console.log(`✓ Got coordinates for ${cafe.name} from URL parsing`);
        return coordinates;
      }
    }
    
    // Method 3: Geocode from address (least accurate)
    if (cafe.address) {
      const coordinates = await geocodeAddress(cafe.address);
      if (coordinates) {
        console.log(`✓ Got coordinates for ${cafe.name} using geocoding`);
        return coordinates;
      }
    }
    
    console.error(`✗ Failed to get coordinates for ${cafe.name}`);
    return null;
    
  } catch (error) {
    if (retries < CONFIG.MAX_RETRIES) {
      console.log(`Retrying ${cafe.name} (attempt ${retries + 1}/${CONFIG.MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return getCoordinatesForCafe(cafe, retries + 1);
    }
    console.error(`✗ Failed to get coordinates for ${cafe.name} after ${CONFIG.MAX_RETRIES} retries`);
    return null;
  }
}

// Process cafes in batches
async function processCafesInBatches(cafes) {
  const results = [];
  const failedCafes = [];
  
  for (let i = 0; i < cafes.length; i += CONFIG.BATCH_SIZE) {
    const batch = cafes.slice(i, i + CONFIG.BATCH_SIZE);
    console.log(`\nProcessing batch ${Math.floor(i / CONFIG.BATCH_SIZE) + 1} of ${Math.ceil(cafes.length / CONFIG.BATCH_SIZE)}`);
    
    const batchPromises = batch.map(async (cafe) => {
      const coordinates = await getCoordinatesForCafe(cafe);
      
      if (coordinates) {
        return {
          ...cafe,
          coordinates: {
            lat: coordinates.lat,
            lng: coordinates.lng
          },
          coordinatesSource: coordinates.source,
          coordinatesAccuracy: coordinates.accuracy || 'high',
          lastUpdated: new Date().toISOString()
        };
      } else {
        failedCafes.push(cafe);
        return {
          ...cafe,
          coordinates: null,
          coordinatesError: 'Failed to retrieve coordinates',
          lastUpdated: new Date().toISOString()
        };
      }
    });
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    // Delay between batches to avoid rate limiting
    if (i + CONFIG.BATCH_SIZE < cafes.length) {
      await new Promise(resolve => setTimeout(resolve, CONFIG.DELAY_BETWEEN_BATCHES));
    }
  }
  
  return { results, failedCafes };
}

// Main function
async function updateCafeCoordinates() {
  try {
    // Check API key
    if (CONFIG.GOOGLE_API_KEY === 'YOUR_API_KEY_HERE') {
      console.error('Please set your Google Places API key in the GOOGLE_PLACES_API_KEY environment variable');
      process.exit(1);
    }
    
    // Read input file
    console.log(`Reading cafes from ${CONFIG.INPUT_FILE}...`);
    const fileContent = await fs.readFile(CONFIG.INPUT_FILE, 'utf-8');
    const cafes = JSON.parse(fileContent);
    console.log(`Found ${cafes.length} cafes to process`);
    
    // Create backup
    console.log(`Creating backup at ${CONFIG.BACKUP_FILE}...`);
    await fs.writeFile(CONFIG.BACKUP_FILE, fileContent);
    
    // Process cafes
    const startTime = Date.now();
    const { results, failedCafes } = await processCafesInBatches(cafes);
    const endTime = Date.now();
    
    // Save results
    console.log(`\nSaving results to ${CONFIG.OUTPUT_FILE}...`);
    await fs.writeFile(CONFIG.OUTPUT_FILE, JSON.stringify(results, null, 2));
    
    // Generate report
    const successCount = results.filter(c => c.coordinates !== null).length;
    const failureCount = failedCafes.length;
    const duration = (endTime - startTime) / 1000;
    
    console.log('\n=== Update Complete ===');
    console.log(`Total cafes processed: ${cafes.length}`);
    console.log(`Successful updates: ${successCount} (${(successCount / cafes.length * 100).toFixed(1)}%)`);
    console.log(`Failed updates: ${failureCount} (${(failureCount / cafes.length * 100).toFixed(1)}%)`);
    console.log(`Time taken: ${duration.toFixed(1)} seconds`);
    
    // Save failed cafes for manual review
    if (failedCafes.length > 0) {
      const failedFile = path.join(__dirname, 'public', 'failed_cafe_coordinates.json');
      await fs.writeFile(failedFile, JSON.stringify(failedCafes, null, 2));
      console.log(`\nFailed cafes saved to ${failedFile} for manual review`);
    }
    
    // Generate coordinate statistics
    const sources = {};
    results.forEach(cafe => {
      if (cafe.coordinatesSource) {
        sources[cafe.coordinatesSource] = (sources[cafe.coordinatesSource] || 0) + 1;
      }
    });
    
    console.log('\n=== Coordinate Sources ===');
    Object.entries(sources).forEach(([source, count]) => {
      console.log(`${source}: ${count} cafes`);
    });
    
  } catch (error) {
    console.error('Error updating cafe coordinates:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  updateCafeCoordinates();
}

module.exports = { getCoordinatesForCafe, parseCoordinatesFromUrl };