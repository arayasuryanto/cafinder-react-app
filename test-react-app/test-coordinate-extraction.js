#!/usr/bin/env node
/**
 * Test script to check coordinate extraction from existing cafe data
 * This helps verify which cafes have extractable coordinates from URLs
 */

const fs = require('fs');
const path = require('path');

// Function to parse coordinates from URL (same as in main script)
function parseCoordinatesFromUrl(url) {
  if (!url) return null;
  
  // Decode URL
  const decodedUrl = decodeURIComponent(url);
  
  // Patterns to match coordinates
  const patterns = [
    { regex: /@(-?\d+\.\d+),(-?\d+\.\d+),/, name: '@lat,lng pattern' },
    { regex: /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/, name: '!3d!4d pattern' },
    { regex: /ll=(-?\d+\.\d+),(-?\d+\.\d+)/, name: 'll= pattern' },
    { regex: /q=(-?\d+\.\d+),(-?\d+\.\d+)/, name: 'q= pattern' },
    { regex: /\/place\/[^/]+\/@(-?\d+\.\d+),(-?\d+\.\d+)/, name: '/place/ pattern' },
    { regex: /center=(-?\d+\.\d+),(-?\d+\.\d+)/, name: 'center= pattern' }
  ];
  
  for (const { regex, name } of patterns) {
    const match = decodedUrl.match(regex);
    if (match) {
      return {
        lat: parseFloat(match[1]),
        lng: parseFloat(match[2]),
        pattern: name
      };
    }
  }
  
  return null;
}

// Main test function
async function testCoordinateExtraction() {
  try {
    // Read the filtered cafes file
    const filePath = path.join(__dirname, 'public', 'filtered_cafes.json');
    console.log(`Reading cafes from ${filePath}...`);
    
    const data = fs.readFileSync(filePath, 'utf-8');
    const cafes = JSON.parse(data);
    
    console.log(`\nTotal cafes: ${cafes.length}`);
    console.log('='*50);
    
    // Statistics
    const stats = {
      total: cafes.length,
      hasPlaceId: 0,
      hasGoogleMapsUrl: 0,
      extractableCoords: 0,
      patterns: {}
    };
    
    // Sample results
    const samples = {
      withCoords: [],
      withoutCoords: []
    };
    
    // Test each cafe
    cafes.forEach((cafe, index) => {
      if (cafe.placeId) stats.hasPlaceId++;
      if (cafe.google_maps_direction) stats.hasGoogleMapsUrl++;
      
      // Try to extract coordinates
      const coords = parseCoordinatesFromUrl(cafe.google_maps_direction);
      
      if (coords) {
        stats.extractableCoords++;
        stats.patterns[coords.pattern] = (stats.patterns[coords.pattern] || 0) + 1;
        
        // Save first 5 samples with coordinates
        if (samples.withCoords.length < 5) {
          samples.withCoords.push({
            name: cafe.name,
            url: cafe.google_maps_direction,
            coords: { lat: coords.lat, lng: coords.lng },
            pattern: coords.pattern
          });
        }
      } else if (cafe.google_maps_direction && samples.withoutCoords.length < 5) {
        // Save samples without extractable coordinates
        samples.withoutCoords.push({
          name: cafe.name,
          url: cafe.google_maps_direction,
          placeId: cafe.placeId
        });
      }
    });
    
    // Print results
    console.log('\n📊 STATISTICS:');
    console.log(`- Cafes with Place ID: ${stats.hasPlaceId} (${(stats.hasPlaceId/stats.total*100).toFixed(1)}%)`);
    console.log(`- Cafes with Google Maps URL: ${stats.hasGoogleMapsUrl} (${(stats.hasGoogleMapsUrl/stats.total*100).toFixed(1)}%)`);
    console.log(`- URLs with extractable coordinates: ${stats.extractableCoords} (${(stats.extractableCoords/stats.total*100).toFixed(1)}%)`);
    
    console.log('\n🎯 COORDINATE EXTRACTION PATTERNS:');
    Object.entries(stats.patterns).forEach(([pattern, count]) => {
      console.log(`- ${pattern}: ${count} URLs`);
    });
    
    console.log('\n✅ SAMPLE CAFES WITH EXTRACTABLE COORDINATES:');
    samples.withCoords.forEach((sample, i) => {
      console.log(`\n${i + 1}. ${sample.name}`);
      console.log(`   Coordinates: ${sample.coords.lat}, ${sample.coords.lng}`);
      console.log(`   Pattern: ${sample.pattern}`);
      console.log(`   URL: ${sample.url.substring(0, 80)}...`);
    });
    
    console.log('\n❌ SAMPLE CAFES WITHOUT EXTRACTABLE COORDINATES:');
    samples.withoutCoords.forEach((sample, i) => {
      console.log(`\n${i + 1}. ${sample.name}`);
      console.log(`   Place ID: ${sample.placeId}`);
      console.log(`   URL: ${sample.url.substring(0, 80)}...`);
    });
    
    // Recommendations
    console.log('\n💡 RECOMMENDATIONS:');
    if (stats.extractableCoords < stats.total * 0.5) {
      console.log('- Less than 50% of URLs have extractable coordinates');
      console.log('- Using Google Places API with Place IDs is recommended');
    } else {
      console.log('- Many URLs have extractable coordinates');
      console.log('- You can use URL parsing as a primary method');
      console.log('- Use Places API as fallback for remaining cafes');
    }
    
    if (stats.hasPlaceId === stats.total) {
      console.log('- All cafes have Place IDs - ideal for Places API usage');
    } else {
      console.log(`- ${stats.total - stats.hasPlaceId} cafes missing Place IDs`);
      console.log('- Consider geocoding addresses for these cafes');
    }
    
    // Save test results
    const resultsPath = path.join(__dirname, 'coordinate-extraction-test-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify({
      statistics: stats,
      samples: samples,
      timestamp: new Date().toISOString()
    }, null, 2));
    
    console.log(`\n📁 Full test results saved to: ${resultsPath}`);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the test
testCoordinateExtraction();