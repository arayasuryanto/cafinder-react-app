#!/usr/bin/env node
/**
 * Demo script to update coordinates for a small batch of cafes
 * This demonstrates the process without using your API quota
 */

const fs = require('fs').promises;
const path = require('path');

// Mock Google Places API response for demo
const MOCK_COORDINATES = {
  'ChIJh9U5rh391y0R_D4KjkxgXrY': { lat: -7.257472, lng: 112.623099 }, // Filgud+
  'ChIJTTM6WIf91y0RotZGcWHII0k': { lat: -7.252345, lng: 112.615678 }, // Ropopang
  'ChIJYwLbGQD91y0R2pb1qgsh06s': { lat: -7.249876, lng: 112.618901 }, // LoveBugsCafe
  'ChIJfVbuGoT91y0RNhWAjHd-e0o': { lat: -7.255432, lng: 112.621234 }, // Kopi teras
  'ChIJVzXd5Mf91y0Rz7fXcuH6LkE': { lat: -7.258765, lng: 112.624567 }  // L Spot Cafe
};

async function demoCoordinateUpdate() {
  try {
    // Read cafes
    const inputPath = path.join(__dirname, 'public', 'filtered_cafes.json');
    console.log('📖 Reading cafe data...');
    const cafesData = await fs.readFile(inputPath, 'utf-8');
    const cafes = JSON.parse(cafesData);
    
    // Process first 5 cafes as demo
    const demoCount = 5;
    const demoCafes = cafes.slice(0, demoCount);
    
    console.log(`\n🔍 Processing first ${demoCount} cafes as demo...\n`);
    
    // Update cafes with coordinates
    const updatedCafes = demoCafes.map((cafe, index) => {
      const mockCoords = MOCK_COORDINATES[cafe.placeId];
      
      if (mockCoords) {
        console.log(`✅ ${index + 1}. ${cafe.name}`);
        console.log(`   Place ID: ${cafe.placeId}`);
        console.log(`   Coordinates: ${mockCoords.lat}, ${mockCoords.lng}`);
        console.log(`   Address: ${cafe.address}`);
        console.log('');
        
        return {
          ...cafe,
          coordinates: {
            lat: mockCoords.lat,
            lng: mockCoords.lng
          },
          coordinatesSource: 'google_places_api',
          coordinatesAccuracy: 'high',
          lastUpdated: new Date().toISOString()
        };
      } else {
        console.log(`❌ ${index + 1}. ${cafe.name} - No mock data available`);
        return cafe;
      }
    });
    
    // Combine with remaining cafes (unchanged)
    const allCafes = [...updatedCafes, ...cafes.slice(demoCount)];
    
    // Save demo output
    const outputPath = path.join(__dirname, 'public', 'cafes_demo_coordinates.json');
    await fs.writeFile(outputPath, JSON.stringify(allCafes, null, 2));
    
    console.log('\n📊 Demo Summary:');
    console.log('================');
    console.log(`Total cafes: ${cafes.length}`);
    console.log(`Processed in demo: ${demoCount}`);
    console.log(`Updated with coordinates: ${Object.keys(MOCK_COORDINATES).length}`);
    console.log(`\n✅ Demo output saved to: ${outputPath}`);
    
    // Show sample of updated data structure
    console.log('\n📋 Sample Updated Cafe Structure:');
    console.log(JSON.stringify(updatedCafes[0], null, 2));
    
    console.log('\n💡 Next Steps:');
    console.log('1. Get a Google Places API key');
    console.log('2. Set environment variable: export GOOGLE_PLACES_API_KEY="your-key"');
    console.log('3. Run the full update script: node update-cafe-coordinates.js');
    console.log('\n⚠️  Note: This demo uses mock coordinates for illustration only.');
    
  } catch (error) {
    console.error('Error in demo:', error);
  }
}

// Show what the actual API call would look like
function showApiExample() {
  console.log('\n📚 Example Google Places API Request:');
  console.log('=====================================');
  console.log(`
// For each cafe with a Place ID:
const placeId = 'ChIJh9U5rh391y0R_D4KjkxgXrY';
const apiKey = 'YOUR_API_KEY';

const url = \`https://maps.googleapis.com/maps/api/place/details/json?
  place_id=\${placeId}
  &fields=geometry,name,formatted_address
  &key=\${apiKey}\`;

// Response will include:
{
  "result": {
    "geometry": {
      "location": {
        "lat": -7.257472,
        "lng": 112.623099
      }
    },
    "name": "Filgud+",
    "formatted_address": "Jl. Raya Lidah Wetan..."
  },
  "status": "OK"
}
  `);
}

// Run demo
console.log('🚀 Cafe Coordinate Update Demo');
console.log('==============================\n');
demoCoordinateUpdate().then(() => {
  showApiExample();
});