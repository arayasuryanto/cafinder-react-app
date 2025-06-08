import { useEffect, useState, useRef, useCallback } from 'react';
import { Map, Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import './CafeMap.css';

// Mapbox access token
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZW5zdGVpbnJheXMiLCJhIjoiY21haHpkc2kyMGF4dTJxb2lneGM5dnluaSJ9.SVb7BdQETWs9s0NPbRynRw';

// Surabaya coordinates (lng, lat format for Mapbox)
const SURABAYA_CENTER = {
  longitude: 112.7521,
  latitude: -7.2575,
  zoom: 12
};


const CafeMap = () => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [viewState, setViewState] = useState(SURABAYA_CENTER);
  const [popupInfo, setPopupInfo] = useState(null);
  const [mobileView, setMobileView] = useState('list'); // 'list' or 'map'
  const itemsPerPage = 30;
  const cafeListRef = useRef(null);
  const mapRef = useRef();

  useEffect(() => {
    fetch('/filtered_cafes.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Loaded filtered cafes count:', data.length);
        
        // Use existing coordinates from filtered_cafes.json
        const cafesWithCoords = data.filter(cafe => {
          return cafe.coordinates && Array.isArray(cafe.coordinates) && cafe.coordinates.length === 2;
        }).map(cafe => ({
          ...cafe,
          coordinates: {
            longitude: cafe.coordinates[1], // Mapbox uses lng, lat format
            latitude: cafe.coordinates[0]
          }
        }));
        
        // Sort cafes by rating (highest first) - this ensures the left navigator shows highest rated cafes first
        const sortedCafes = cafesWithCoords.sort((a, b) => {
          const ratingA = parseFloat(a.rating) || 0;
          const ratingB = parseFloat(b.rating) || 0;
          return ratingB - ratingA;
        });
        
        console.log('Loaded', sortedCafes.length, 'cafes with coordinates');
        setCafes(sortedCafes);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading filtered cafe data:', error);
        setLoading(false);
      });
  }, []);

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
  
  // Reset selected cafe when page or filter changes
  useEffect(() => {
    // Clear selection when page or filter changes
    if (selectedCafe && !paginatedCafes.find(c => c.id === selectedCafe.id)) {
      setSelectedCafe(null);
    }
  }, [currentPage, selectedRegion, paginatedCafes, selectedCafe]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedCafe(null); // Clear selection when changing pages
  };

  const handleCafeClick = useCallback((cafe) => {
    setSelectedCafe(cafe);
    setPopupInfo(cafe);
    
    // Move map to cafe location with precise coordinates
    if (cafe.coordinates) {
      setViewState({
        longitude: cafe.coordinates.longitude,
        latitude: cafe.coordinates.latitude,
        zoom: 16,
        transitionDuration: 1000
      });
    }
    
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
  }, [paginatedCafes, filteredCafes, itemsPerPage]);
  
  const handleDirections = (cafe) => {
    window.open(cafe.google_maps_direction, '_blank');
  };
  
  const handleViewDetails = (cafe) => {
    window.location.href = `/catalog/cafe/${cafe.id}`;
  };

  if (loading) {
    return (
      <div className="cafe-map-container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%',
          width: '100%'
        }}>
          <div className="loading">Loading cafes...</div>
        </div>
      </div>
    );
  }

  if (!cafes || cafes.length === 0) {
    return (
      <div className="cafe-map-container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%',
          width: '100%',
          flexDirection: 'column'
        }}>
          <div>No cafes data available</div>
          <div>Check console for errors</div>
        </div>
      </div>
    );
  }

  return (
    <div className="cafe-map-container">
      {/* Mobile View Toggle */}
      <div className="mobile-view-toggle">
        <button 
          className={mobileView === 'list' ? 'active' : ''}
          onClick={() => setMobileView('list')}
        >
          List View
        </button>
        <button 
          className={mobileView === 'map' ? 'active' : ''}
          onClick={() => setMobileView('map')}
        >
          Map View
        </button>
      </div>

      {/* Sidebar with cafe list */}
      <div className={`cafe-sidebar ${mobileView === 'list' ? 'show-list' : ''}`}>
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
            Sort: Highest Rated <span className="dropdown-icon">▼</span>
          </div>
        </div>
        
        <div className="cafe-list" ref={cafeListRef}>
          {paginatedCafes.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              No cafes found
            </div>
          ) : (
            paginatedCafes.map((cafe, index) => (
            <div 
              key={cafe.id} 
              className={`cafe-card ${selectedCafe?.id === cafe.id ? 'selected' : ''}`}
              onClick={() => handleCafeClick(cafe)}
            >
              <div className="cafe-content">
                <div className="cafe-number">{startIndex + index + 1}</div>
                <div className="cafe-image">
                  {cafe.imageUrl ? (
                    <img 
                      src={cafe.imageUrl} 
                      alt={cafe.name} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMTAwIDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iODAiIGZpbGw9IiNGNUY1RjUiLz48cGF0aCBkPSJNNDAgMjBIMjBDMTguOSAyMCAxOCAyMC45IDE4IDIyVjU4QzE4IDU5LjEgMTguOSA2MCAyMCA2MEg4MEM4MS4xIDYwIDgyIDU5LjEgODIgNThWMjJDODIgMjAuOSA4MS4xIDIwIDgwIDIwSDYwTDU4IDI2SDQyTDQwIDIwWiIgZmlsbD0iI0U1RTdFQiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNDIiIHI9IjgiIGZpbGw9IiNFNUU3RUIiLz48L3N2Zz4=';
                      }} 
                    />
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
          ))
          )}
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
      <div className={`map-wrapper ${mobileView === 'map' ? 'show-map' : ''}`}>
        <Map
          ref={mapRef}
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{width: '100%', height: '100%'}}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          attributionControl={false}
          logoPosition="bottom-right"
        >
          <NavigationControl position="top-right" />
          <FullscreenControl position="top-right" />
          
          {/* Render markers for current page cafes */}
          {paginatedCafes.map(cafe => (
            <Marker
              key={cafe.id}
              longitude={cafe.coordinates.longitude}
              latitude={cafe.coordinates.latitude}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                handleCafeClick(cafe);
              }}
            >
              <div className={`custom-marker ${selectedCafe?.id === cafe.id ? 'selected' : ''}`}>
                <svg width={selectedCafe?.id === cafe.id ? 30 : 25} height={selectedCafe?.id === cafe.id ? 41 : 35} viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.373 0 0 5.373 0 12C0 18.627 12 36 12 36S24 18.627 24 12C24 5.373 18.627 0 12 0Z" fill={selectedCafe?.id === cafe.id ? '#F59E0B' : '#F05438'}/>
                  <circle cx="12" cy="12" r="6" fill="white"/>
                  <circle cx="12" cy="12" r="3" fill={selectedCafe?.id === cafe.id ? '#F59E0B' : '#F05438'}/>
                </svg>
              </div>
            </Marker>
          ))}
          
          {/* Popup for selected cafe */}
          {popupInfo && (
            <Popup
              longitude={popupInfo.coordinates.longitude}
              latitude={popupInfo.coordinates.latitude}
              onClose={() => setPopupInfo(null)}
              closeButton={true}
              closeOnClick={false}
              offsetTop={-30}
              className="cafe-popup"
            >
              <div className="popup-content">
                <h3>{popupInfo.name}</h3>
                <div className="popup-rating">
                  <span className="stars">★ {popupInfo.rating}</span>
                  <span className="reviews">({popupInfo.reviewCount} reviews)</span>
                </div>
                <p className="popup-address">{popupInfo.address}</p>
                <div className="popup-meta">
                  <span>{popupInfo.categories?.[0] || 'Cafe'}</span>
                  <span className="dot">•</span>
                  <span>{popupInfo.neighborhood || popupInfo.region}</span>
                </div>
                <div className="popup-actions">
                  <button 
                    className="popup-btn directions"
                    onClick={() => handleDirections(popupInfo)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M21.71 11.29L12.71 2.29C12.32 1.9 11.68 1.9 11.29 2.29L2.29 11.29C1.9 11.68 1.9 12.32 2.29 12.71L11.29 21.71C11.68 22.1 12.32 22.1 12.71 21.71L21.71 12.71C22.1 12.32 22.1 11.68 21.71 11.29ZM7 14V10L17 10V14L13 10.5V17H11V10.5L7 14Z" fill="currentColor"/>
                    </svg>
                    Directions
                  </button>
                  <button 
                    className="popup-btn details"
                    onClick={() => handleViewDetails(popupInfo)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
};

export default CafeMap;