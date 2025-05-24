import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CafeHeader from '../components/cafeDetail/CafeHeader';
import CafeInfo from '../components/cafeDetail/CafeInfo';
import CafeGallery from '../components/cafeDetail/CafeGallery';
import CafeReviews from '../components/cafeDetail/CafeReviews';

const CafeDetailPage = () => {
  const { id } = useParams();
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch cafe details based on ID
    // This will be implemented later
    // For now, just set loading to false
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="loading">Loading cafe details...</div>;
  }

  if (error) {
    return <div className="error">Error loading cafe: {error}</div>;
  }

  if (!cafe) {
    return <div className="not-found">Cafe not found</div>;
  }

  return (
    <div className="cafe-detail-page">
      <CafeHeader cafe={cafe} />
      <div className="cafe-detail-content">
        <CafeInfo cafe={cafe} />
        <CafeGallery cafe={cafe} />
      </div>
      <CafeReviews cafe={cafe} />
    </div>
  );
};

export default CafeDetailPage;