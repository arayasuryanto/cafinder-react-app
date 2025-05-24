import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const CafeMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Initialize map when component mounts
  useEffect(() => {
    if (map.current) return; // Initialize map only once
    
    // Use the Mapbox token from original project
    mapboxgl.accessToken = 'pk.eyJ1IjoiZW5zdGVpbnJheXMiLCJhIjoiY21haHpkc2kyMGF4dTJxb2lneGM5dnluaSJ9.SVb7BdQETWs9s0NPbRynRw';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [112.7378, -7.2756], // Center on Surabaya
      zoom: 12
    });
    
    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());
    
    // Add geolocation control
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
    
    // Load map
    map.current.on('load', () => {
      loadCafes();
    });
    
    return () => map.current.remove();
  }, []);
  
  // Load cafes data
  const loadCafes = async () => {
    try {
      // In a real implementation, this would fetch from an API
      // For now, we'll use placeholder data based on the JSON file structure
      
      // Fetch would occur here
      
      // Once we have the data, add markers to the map
      addMarkersToMap();
      setLoading(false);
    } catch (error) {
      console.error('Error loading cafes:', error);
      setLoading(false);
    }
  };
  
  // Add markers to the map
  const addMarkersToMap = () => {
    if (!map.current) return;
    
    // Example cafe data with coordinates
    const mockCafes = [
      {
        id: 'ChIJh9U5rh391y0R_D4KjkxgXrY',
        name: 'Filgud+',
        coordinates: [112.7028, -7.3048], // Example coordinates
        rating: '4.4'
      },
      {
        id: 'ChIJTTM6WIf91y0RotZGcWHII0k',
        name: 'Ropopang Citraland',
        coordinates: [112.6943, -7.2892], // Example coordinates
        rating: '4.6'
      }
    ];
    
    mockCafes.forEach(cafe => {
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
               <a href="/cafe/${cafe.id}">View Details</a>`
            )
        )
        .addTo(map.current);
    });
    
    setCafes(mockCafes);
  };
  
  return (
    <div className="cafe-map">
      {loading && <div className="loading-overlay">Loading map...</div>}
      <div ref={mapContainer} className="map-container" style={{ height: '600px' }} />
    </div>
  );
};

export default CafeMap;