# Cafe Coordinate Update Guide

This guide explains how to update cafe coordinates to get precise locations that match Google Maps.

## Overview

The current cafe data may have inaccurate or missing coordinates. This solution provides multiple methods to obtain precise coordinates:

1. **Google Places API** - Most accurate, using Place IDs
2. **URL Parsing** - Extract coordinates from Google Maps URLs
3. **Geocoding** - Convert addresses to coordinates (least accurate)

## Available Scripts

### 1. Node.js Script (`update-cafe-coordinates.js`)

**Features:**
- Uses Google Places API for high accuracy
- Falls back to URL parsing and geocoding
- Processes cafes in batches to avoid rate limiting
- Generates detailed reports

**Usage:**
```bash
# Set your Google API key
export GOOGLE_PLACES_API_KEY="your-api-key-here"

# Run the script
node update-cafe-coordinates.js
```

**Output:**
- `cafes_with_coordinates.json` - Updated cafe data
- `failed_cafe_coordinates.json` - Cafes that couldn't be updated
- Backup of original data with timestamp

### 2. Python Script (`update_cafe_coordinates.py`)

**Features:**
- Same functionality as Node.js version
- Parallel processing for faster updates
- Detailed logging
- Multiple retry mechanisms

**Usage:**
```bash
# Install required packages
pip install requests

# Set your Google API key
export GOOGLE_PLACES_API_KEY="your-api-key-here"

# Run the script
python update_cafe_coordinates.py
```

### 3. Test Script (`test-coordinate-extraction.js`)

**Purpose:** Test how many cafes have coordinates that can be extracted from URLs without API calls.

**Usage:**
```bash
node test-coordinate-extraction.js
```

This will show:
- How many cafes have extractable coordinates
- Which URL patterns are present
- Sample results
- Recommendations for your approach

## React Integration

### Coordinate Service (`src/utils/coordinateService.js`)

This service can be used in your React app to:
- Parse coordinates from URLs in real-time
- Get coordinates using Google Maps JavaScript API
- Calculate distances between cafes
- Create map markers

**Example usage in React:**

```javascript
import { getCoordinatesForCafe, parseCoordinatesFromUrl } from './utils/coordinateService';

// Method 1: Quick URL parsing (no API needed)
const coords = parseCoordinatesFromUrl(cafe.google_maps_direction);

// Method 2: Full coordinate resolution (requires Google Maps API)
const coordinates = await getCoordinatesForCafe(cafe);
```

## Getting a Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - Places API
   - Geocoding API
   - Maps JavaScript API (for React integration)
4. Create credentials (API Key)
5. Restrict the key:
   - For server scripts: IP restrictions
   - For React app: HTTP referrer restrictions

## Configuration Options

Both scripts support these options:

```javascript
CONFIG = {
  GOOGLE_API_KEY: 'your-key',
  INPUT_FILE: 'path/to/input.json',
  OUTPUT_FILE: 'path/to/output.json',
  BATCH_SIZE: 10,  // Cafes per batch
  DELAY_BETWEEN_BATCHES: 1000,  // milliseconds
  MAX_RETRIES: 3
}
```

## Expected Results

After running the update script:

1. **Coordinates added to each cafe:**
   ```json
   {
     "id": "ChIJh9U5rh391y0R_D4KjkxgXrY",
     "name": "Filgud+",
     "coordinates": {
       "lat": -7.257472,
       "lng": 112.623099
     },
     "coordinatesSource": "google_places_api",
     "coordinatesAccuracy": "high",
     "lastUpdated": "2025-06-07T..."
   }
   ```

2. **Statistics showing:**
   - Success rate (typically 95%+ with Place IDs)
   - Coordinate sources used
   - Processing time

## Troubleshooting

### Common Issues:

1. **"API key not set"**
   - Set environment variable: `export GOOGLE_PLACES_API_KEY="your-key"`

2. **"Rate limit exceeded"**
   - Increase `DELAY_BETWEEN_BATCHES`
   - Reduce `BATCH_SIZE`

3. **"Failed to get coordinates"**
   - Check if cafe has valid Place ID
   - Verify API key has correct permissions
   - Check API quotas in Google Cloud Console

4. **Coordinates seem wrong**
   - Verify against Google Maps using Place ID
   - Check `coordinatesSource` field
   - Higher accuracy sources: `google_places_api` > `parsed_from_url` > `geocoded_address`

## Best Practices

1. **Always backup data** before running updates
2. **Test with small batch** first (modify script to process only first 10 cafes)
3. **Monitor API usage** to avoid unexpected charges
4. **Validate results** by checking a few cafes manually on Google Maps
5. **Use URL parsing first** if you want to minimize API calls

## Integration with Map Display

Once coordinates are updated, they can be used in:
- Leaflet maps
- Google Maps
- Mapbox
- Any mapping library

Example with updated coordinates:
```javascript
// Now each cafe has precise coordinates
cafes.forEach(cafe => {
  if (cafe.coordinates) {
    L.marker([cafe.coordinates.lat, cafe.coordinates.lng])
      .bindPopup(cafe.name)
      .addTo(map);
  }
});
```

## Next Steps

1. Run the test script to assess current data
2. Get Google API key
3. Run update script
4. Verify results
5. Update your map components to use new coordinates

For questions or issues, check the generated log files for detailed error messages.