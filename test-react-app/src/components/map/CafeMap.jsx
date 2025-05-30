import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './CafeMap.css';
import { getCafeCoordinates as getCoordinatesFromService } from '../../utils/geocodingService';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon
const cafeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Selected marker icon
const selectedCafeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [30, 49],
  iconAnchor: [15, 49],
  popupAnchor: [1, -34],
  shadowSize: [49, 49]
});

// Surabaya coordinates
const SURABAYA_CENTER = [-7.2575, 112.7521];

// Component to handle map movement
function MapController({ selectedCafe, cafes }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedCafe && selectedCafe.coordinates) {
      map.setView(selectedCafe.coordinates, 16, {
        animate: true,
        duration: 1
      });
    } else if (cafes && cafes.length > 0) {
      // Fit bounds to show all cafes on the current page
      const bounds = L.latLngBounds(cafes.map(cafe => cafe.coordinates));
      if (bounds.isValid()) {
        map.fitBounds(bounds, { 
          padding: [50, 50],
          maxZoom: 14 
        });
      }
    }
  }, [selectedCafe, cafes, map]);
  
  return null;
}


const CafeMap = () => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const itemsPerPage = 30;
  const cafeListRef = useRef(null);

  useEffect(() => {
    fetch('/cleaned_surabaya_cafes.json')
      .then(response => response.json())
      .then(data => {
        // Add coordinates to cafes
        const cafesWithCoords = data.map(cafe => ({
          ...cafe,
          coordinates: getCoordinatesFromService(cafe)
        }));
        // Sort cafes by rating (highest first)
        const sortedCafes = cafesWithCoords.sort((a, b) => {
          const ratingA = parseFloat(a.rating) || 0;
          const ratingB = parseFloat(b.rating) || 0;
          return ratingB - ratingA;
        });
        setCafes(sortedCafes);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading cafe data:', error);
        setLoading(false);
      });
  }, []);
  
  // Reset selected cafe when page or filter changes
  useEffect(() => {
    // Clear selection when page or filter changes
    if (!paginatedCafes.find(c => c.id === selectedCafe?.id)) {
      setSelectedCafe(null);
    }
  }, [currentPage, selectedRegion]);

  const filteredCafes = cafes.filter(cafe => {
    if (selectedRegion !== 'all' && cafe.region !== selectedRegion) {
      return false;
    }
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCafes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCafes = filteredCafes.slice(startIndex, endIndex);

  const regions = ['all', ...new Set(cafes.map(cafe => cafe.region))];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedCafe(null); // Clear selection when changing pages
  };

  const handleCafeClick = (cafe) => {
    setSelectedCafe(cafe);
    
    // Check if the cafe is on the current page
    const cafeIndex = paginatedCafes.findIndex(c => c.id === cafe.id);
    
    if (cafeIndex !== -1) {
      // Cafe is on current page, scroll to it
      if (cafeListRef.current) {
        const cafeElements = cafeListRef.current.querySelectorAll('.cafe-card');
        if (cafeElements[cafeIndex]) {
          cafeElements[cafeIndex].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }
    } else {
      // Cafe is on a different page, find which page and navigate to it
      const allCafeIndex = filteredCafes.findIndex(c => c.id === cafe.id);
      if (allCafeIndex !== -1) {
        const targetPage = Math.floor(allCafeIndex / itemsPerPage) + 1;
        setCurrentPage(targetPage);
      }
    }
  };
  
  const handleDirections = (cafe) => {
    window.open(cafe.google_maps_direction, '_blank');
  };
  
  const handleViewDetails = (cafe) => {
    window.location.href = `/catalog/cafe/${cafe.id}`;
  };

  if (loading) {
    return <div className="loading">Loading cafes...</div>;
  }

  return (
    <div className="cafe-map-container">
      {/* Sidebar with cafe list */}
      <div className="cafe-sidebar">
        <div className="sidebar-header">
          <div className="filter-controls">
            <button className="filter-btn">Filters</button>
            <select 
              value={selectedRegion} 
              onChange={(e) => {
                setSelectedRegion(e.target.value);
                setCurrentPage(1);
              }}
              className="region-select"
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </option>
              ))}
            </select>
          </div>
          <div className="sort-info">
            Sort: Featured <span className="dropdown-icon">▼</span>
          </div>
        </div>
        
        <div className="cafe-list" ref={cafeListRef}>
          {paginatedCafes.map((cafe, index) => (
            <div 
              key={cafe.id} 
              className={`cafe-card ${selectedCafe?.id === cafe.id ? 'selected' : ''}`}
              onClick={() => handleCafeClick(cafe)}
            >
              <div className="cafe-content">
                <div className="cafe-number">{startIndex + index + 1}</div>
                <div className="cafe-image">
                  {cafe.imageUrl ? (
                    <img src={cafe.imageUrl} alt={cafe.name} onError={(e) => e.target.src = '/images/cafe-placeholder.jpg'} />
                  ) : (
                    <div className="image-placeholder">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                        <path d="M20 3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3ZM20 19H4V5H20V19Z" fill="#E5E7EB"/>
                        <path d="M11.5 12.5L8.5 16.5L5.5 12.5L3 16H21L15 8L11.5 12.5Z" fill="#E5E7EB"/>
                      </svg>
                    </div>
                  )}
                  <button className="save-btn" onClick={(e) => { e.stopPropagation(); }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
                <div className="cafe-info">
                  <h3>{cafe.name}</h3>
                  <div className="rating-row">
                    <div className="rating">
                      <span className="stars">★</span>
                      <span className="rating-value">{cafe.rating}</span>
                    </div>
                    <span className="reviews">({cafe.reviewCount})</span>
                  </div>
                  <div className="cafe-meta">
                    <span>{cafe.categories?.[0] || 'Cafe'}</span>
                    <span className="dot">•</span>
                    <span>$$</span>
                    <span className="dot">•</span>
                    <span>{cafe.neighborhood || cafe.region}</span>
                  </div>
                  <div className="cafe-actions">
                    <button 
                      className="action-btn directions-btn" 
                      onClick={(e) => { e.stopPropagation(); handleDirections(cafe); }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M21.71 11.29L12.71 2.29C12.32 1.9 11.68 1.9 11.29 2.29L2.29 11.29C1.9 11.68 1.9 12.32 2.29 12.71L11.29 21.71C11.68 22.1 12.32 22.1 12.71 21.71L21.71 12.71C22.1 12.32 22.1 11.68 21.71 11.29ZM7 14V10L17 10V14L13 10.5V17H11V10.5L7 14Z" fill="currentColor"/>
                      </svg>
                      Directions
                    </button>
                    <button 
                      className="action-btn details-btn"
                      onClick={(e) => { e.stopPropagation(); handleViewDetails(cafe); }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="pagination">
          <div className="results-info">
            Showing results {startIndex + 1}-{Math.min(endIndex, filteredCafes.length)} of {filteredCafes.length}
          </div>
          <div className="page-controls">
            <button 
              className="page-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ←
            </button>
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="page-dots">...</span>
            )}
            <button 
              className="page-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        </div>
      </div>
      
      {/* Map */}
      <div className="map-wrapper">
        <MapContainer 
          center={SURABAYA_CENTER} 
          zoom={12} 
          className="leaflet-map"
          ref={setMapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapController selectedCafe={selectedCafe} cafes={paginatedCafes} />
          {paginatedCafes.map(cafe => (
            <Marker 
              key={cafe.id} 
              position={cafe.coordinates} 
              icon={cafe.id === selectedCafe?.id ? selectedCafeIcon : cafeIcon}
              eventHandlers={{
                click: () => handleCafeClick(cafe)
              }}
            >
              <Popup className="cafe-popup">
                <div className="popup-content">
                  <h3>{cafe.name}</h3>
                  <div className="popup-rating">
                    <span className="stars">★ {cafe.rating}</span>
                    <span className="reviews">({cafe.reviewCount} reviews)</span>
                  </div>
                  <p className="popup-address">{cafe.address}</p>
                  <div className="popup-meta">
                    <span>{cafe.categories?.[0] || 'Cafe'}</span>
                    <span className="dot">•</span>
                    <span>{cafe.neighborhood || cafe.region}</span>
                  </div>
                  <div className="popup-actions">
                    <button 
                      className="popup-btn directions"
                      onClick={() => handleDirections(cafe)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M21.71 11.29L12.71 2.29C12.32 1.9 11.68 1.9 11.29 2.29L2.29 11.29C1.9 11.68 1.9 12.32 2.29 12.71L11.29 21.71C11.68 22.1 12.32 22.1 12.71 21.71L21.71 12.71C22.1 12.32 22.1 11.68 21.71 11.29ZM7 14V10L17 10V14L13 10.5V17H11V10.5L7 14Z" fill="currentColor"/>
                      </svg>
                      Directions
                    </button>
                    <button 
                      className="popup-btn details"
                      onClick={() => handleViewDetails(cafe)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CafeMap;