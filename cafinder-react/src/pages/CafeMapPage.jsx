import React from 'react';
import CafeMap from '../components/cafemap/CafeMap';
import MapControls from '../components/cafemap/MapControls';
import SavedCafes from '../components/cafemap/SavedCafes';

const CafeMapPage = () => {
  return (
    <div className="cafe-map-page">
      <div className="map-container">
        <CafeMap />
        <MapControls />
      </div>
      <SavedCafes />
    </div>
  );
};

export default CafeMapPage;