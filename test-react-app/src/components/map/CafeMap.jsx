import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './CafeMap.css';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon
const cafeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Surabaya coordinates
const SURABAYA_CENTER = [-7.2575, 112.7521];

// Sample coordinates for some known locations in Surabaya
const locationCoordinates = {
  'ChIJh9U5rh391y0R_D4KjkxgXrY': [-7.3029, 112.6789], // Filgud+ (West Surabaya)
  'ChIJ318h82T51y0RJ5dvMW9lTG4': [-7.2856, 112.7527], // DEJAVU (Central Surabaya)
  'ChIJwVCGeP_61y0R8LDb1OUTeuM': [-7.2950, 112.7964], // Upper Room Cafe (East Surabaya)
  'ChIJ0-aSJVr51y0RL6P10cK-ucM': [-7.2609, 112.7074], // Cafe YANTI (Central Surabaya)
  'ChIJbWrtmN_91y0RETmliS0jjRE': [-7.2877, 112.6749], // Wizz Gelato (West Surabaya)
  'ChIJL4qKKQT71y0RBKB1PAmcYGE': [-7.2203, 112.7392], // Fore Coffee (North Surabaya)
  'ChIJVbhjDh731y0RNFpNfEaQQjQ': [-7.3345, 112.7885], // L Spot Cafe (South Surabaya)
  'ChIJq6qqqhL71y0RRCONhAMJMck': [-7.2306, 112.7408], // GWalk Garden (North Surabaya)
  'ChIJcx7-q8v61y0Rn0fnkSkm2kg': [-7.2890, 112.8100], // Kopi Teras (East Surabaya)
  'ChIJk8aJKAn51y0RcRwHJNnXt-c': [-7.2700, 112.7500], // Lovebugscafe (Central Surabaya)
  'ChIJJ-0K0un61y0RQRrvT97JxaU': [-7.3000, 112.8200], // M22 Cafe (East Surabaya)
  'ChIJz3aGQx_91y0Rzdi_GHKo-xo': [-7.2800, 112.6700], // Ropopang Citraland (West Surabaya)
  'ChIJHSQzOmb51y0R1PWOiJJ6nfU': [-7.2650, 112.7600], // Rukun Kopi Peranakan (Central Surabaya)
};

const CafeMap = () => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const itemsPerPage = 30;

  useEffect(() => {
    fetch('/cleaned_surabaya_cafes.json')
      .then(response => response.json())
      .then(data => {
        // Add coordinates to cafes
        const cafesWithCoords = data.map(cafe => {
          if (locationCoordinates[cafe.id]) {
            return {
              ...cafe,
              coordinates: locationCoordinates[cafe.id]
            };
          }
          // Generate random coordinates around Surabaya for cafes without known coords
          return {
            ...cafe,
            coordinates: [
              SURABAYA_CENTER[0] + (Math.random() - 0.5) * 0.1,
              SURABAYA_CENTER[1] + (Math.random() - 0.5) * 0.1
            ]
          };
        });
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
  };

  const handleCafeClick = (cafe) => {
    setSelectedCafe(cafe);
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
        
        <div className="cafe-list">
          {paginatedCafes.map((cafe, index) => (
            <div 
              key={cafe.id} 
              className={`cafe-card ${selectedCafe?.id === cafe.id ? 'selected' : ''}`}
              onClick={() => handleCafeClick(cafe)}
            >
              <div className="cafe-number">{startIndex + index + 1}.</div>
              <div className="cafe-image">
                <img src={cafe.imageUrl || '/images/cafe-placeholder.jpg'} alt={cafe.name} />
                <button className="save-btn">♡</button>
              </div>
              <div className="cafe-details">
                <h3>{cafe.name}</h3>
                <div className="rating-info">
                  <span className="rating">⭐ {cafe.rating}</span>
                  <span className="reviews">({cafe.reviewCount} reviews)</span>
                </div>
                <div className="cafe-meta">
                  <span className="category">{cafe.categories?.[0] || 'Cafe'}</span>
                  <span className="separator">·</span>
                  <span className="price">$$</span>
                  <span className="separator">·</span>
                  <span className="price">{cafe.neighborhood || cafe.region}</span>
                </div>
                <div className="open-status">
                  <span className="status-dot">●</span> Open now
                </div>
                <button className="menu-btn">Menu</button>
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
          center={selectedCafe ? selectedCafe.coordinates : SURABAYA_CENTER} 
          zoom={selectedCafe ? 15 : 12} 
          className="leaflet-map"
          key={selectedCafe?.id}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {paginatedCafes.map(cafe => (
            <Marker 
              key={cafe.id} 
              position={cafe.coordinates} 
              icon={cafe.id === selectedCafe?.id ? cafeIcon : cafeIcon}
              eventHandlers={{
                click: () => handleCafeClick(cafe)
              }}
            >
              <Popup className="cafe-popup">
                <div className="popup-content">
                  <h3>{cafe.name}</h3>
                  <div className="rating">
                    <span className="stars">⭐ {cafe.rating}</span>
                    <span className="reviews">({cafe.reviewCount})</span>
                  </div>
                  <p className="address">{cafe.address}</p>
                  <div className="popup-actions">
                    <a 
                      href={cafe.google_maps_direction} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="directions-link"
                    >
                      Get Directions
                    </a>
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