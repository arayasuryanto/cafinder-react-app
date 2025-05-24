import mapboxgl from 'mapbox-gl';

// Mapbox token from original project
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZW5zdGVpbnJheXMiLCJhIjoiY21haHpkc2kyMGF4dTJxb2lneGM5dnluaSJ9.SVb7BdQETWs9s0NPbRynRw';

// Initialize Mapbox with the token
mapboxgl.accessToken = MAPBOX_TOKEN;

// Create a new map instance
export const createMap = (container, options = {}) => {
  const defaultOptions = {
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [112.7378, -7.2756], // Surabaya coordinates
    zoom: 12
  };
  
  const mapOptions = { ...defaultOptions, ...options };
  
  return new mapboxgl.Map({
    container,
    ...mapOptions
  });
};

// Add markers to the map
export const addMarkers = (map, cafes, onClick) => {
  const markers = [];
  
  cafes.forEach(cafe => {
    // Skip cafes without coordinates
    if (!cafe.coordinates) return;
    
    // Create a marker element
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundSize = 'cover';
    el.style.width = '30px';
    el.style.height = '30px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = '#F05438';
    el.style.cursor = 'pointer';
    
    // Add the marker to the map
    const marker = new mapboxgl.Marker(el)
      .setLngLat(cafe.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(
            `<h3>${cafe.name}</h3>
             <p>Rating: ${cafe.rating} ★</p>
             <a href="/cafe/${cafe.id}" class="view-details">View Details</a>`
          )
      )
      .addTo(map);
    
    // Add click handler if provided
    if (onClick) {
      el.addEventListener('click', () => onClick(cafe));
    }
    
    markers.push(marker);
  });
  
  return markers;
};

// Add navigation controls to the map
export const addNavigationControls = (map, options = {}) => {
  map.addControl(new mapboxgl.NavigationControl(options));
};

// Add geolocation control to the map
export const addGeolocationControl = (map, options = {}) => {
  const defaultOptions = {
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  };
  
  const geoOptions = { ...defaultOptions, ...options };
  
  map.addControl(new mapboxgl.GeolocateControl(geoOptions));
};

// Fly to a specific location on the map
export const flyTo = (map, coordinates, options = {}) => {
  const defaultOptions = {
    zoom: 15,
    speed: 1.2,
    curve: 1.5
  };
  
  const flyOptions = { ...defaultOptions, ...options };
  
  map.flyTo({
    center: coordinates,
    ...flyOptions
  });
};

// Filter markers based on criteria
export const filterMarkers = (markers, cafes, filters) => {
  markers.forEach((marker, index) => {
    const cafe = cafes[index];
    let visible = true;
    
    // Apply filters
    if (filters.categories && filters.categories.length > 0) {
      visible = visible && cafe.categories.some(category => 
        filters.categories.includes(category.toLowerCase().replace(' ', '_'))
      );
    }
    
    if (filters.rating > 0) {
      visible = visible && parseFloat(cafe.rating) >= filters.rating;
    }
    
    // Toggle marker visibility
    if (visible) {
      marker.getElement().style.display = 'block';
    } else {
      marker.getElement().style.display = 'none';
    }
  });
};

export default {
  createMap,
  addMarkers,
  addNavigationControls,
  addGeolocationControl,
  flyTo,
  filterMarkers
};