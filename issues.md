# Cafinder Project - Issues and Improvement Areas

## Critical Issues

1. **Coordinates Format Mismatch**
   - In `cafemap.js`, coordinates are swapped (lng/lat instead of lat/lng)
   - Markers are placed incorrectly on the map (around Line 410-412)
   - Correct format is used in `cafemap-leaflet.js`

2. **Missing Dependencies**
   - Empty `dependencies` object in package.json
   - GSAP is loaded from CDN but not listed as a dependency
   - No filesystem dependencies for generate-cafe-pages.js

3. **API Key Security**
   - Mapbox API key is hardcoded in `config.js` (security concern)
   - No environment variable configuration

4. **Data Source Issues**
   - `catalog.js` attempts to fetch from '../cafes_preview.json' which is outside the project directory
   - The `generate-cafe-pages.js` script tries to read from the same missing file

## Functionality Issues

1. **Map Implementation Problems**
   - Multiple error handling fallbacks suggest instability
   - Two parallel implementations: Mapbox (cafemap.js) and Leaflet (cafemap-leaflet.js)
   - Missing Leaflet CSS in cafemap-leaflet.html

2. **Missing Navigation Links**
   - "Smart Finder" and "Tentang Kami" links go nowhere (#)
   - Missing login/signup functionality

3. **Page Generation Issues**
   - Potential problems with the café page generator if parent directory doesn't have cafes_preview.json

4. **Image Loading**
   - Using placeholder images from external services (picsum.photos)
   - Using potentially unreliable image URLs

## Performance & Best Practices

1. **CSS Organization**
   - Multiple separate CSS files (style.css, style-part2.css, etc.)
   - No minification or bundling

2. **JavaScript Structure**
   - No module system or bundler
   - Duplicate code between implementations (cafemap.js vs cafemap-leaflet.js)
   - All JS loaded synchronously

3. **Modern Development Gaps**
   - No build system (Webpack, Parcel, etc.)
   - No framework usage (React, Vue, etc.)
   - Missing type checking (TypeScript)
   - No testing framework

4. **Responsive Design Issues**
   - Limited mobile optimization for map views

## Improvement Recommendations

1. **Fix Coordinate Format**
   - Fix the coordinate format in cafemap.js to match the standard lat/lng format

2. **Update Dependencies**
   - Add all required dependencies to package.json
   - Consider using npm/yarn package management for GSAP instead of CDN

3. **Improve Data Management**
   - Move cafes_preview.json into project directory
   - Consider implementing a simple API or database

4. **Security Enhancements**
   - Move Mapbox API key to environment variables
   - Add .env support for configuration

5. **Development Workflow**
   - Add a modern build system
   - Consider migrating to a JavaScript framework
   - Implement TypeScript for better type safety
   - Add unit and integration tests

6. **Design & UX Improvements**
   - Consolidate CSS files
   - Improve mobile responsiveness
   - Complete missing navigation links

7. **Performance Optimization**
   - Minify CSS and JavaScript
   - Optimize and host images locally
   - Implement lazy loading for images