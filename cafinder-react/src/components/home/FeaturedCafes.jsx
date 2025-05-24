import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeaturedCafes = () => {
  const [featuredCafes, setFeaturedCafes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch featured cafes from our data
    // This would typically come from an API or JSON file
    const fetchFeaturedCafes = async () => {
      try {
        // In a real implementation, we would fetch from an API or import JSON
        // For now, we'll use placeholder data
        const mockData = [
          {
            id: 'ChIJh9U5rh391y0R_D4KjkxgXrY',
            name: 'Filgud+',
            imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipPv4upXMdP5dVBMkpfgRlvh-qXE-YX8TUbgcq38=w408-h408-k-no',
            rating: '4.4',
            neighborhood: 'Lidah Wetan, Lakarsantri'
          },
          {
            id: 'ChIJTTM6WIf91y0RotZGcWHII0k',
            name: 'Ropopang Citraland',
            imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipO8gbrDXMOn72WzBrjLUP6XNe30gkQtsbXWCKY1=w408-h725-k-no',
            rating: '4.6',
            neighborhood: 'Sambikerep'
          },
          {
            id: 'ChIJFz1IIjv91y0ROsMuRaFNAZQ',
            name: 'Gwalk Garden',
            imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipNgdEUv2qSzjnv6F04HRywQtogzmv1r1VhLTYoZ=w408-h337-k-no',
            rating: '4.8',
            neighborhood: 'Lidah Kulon, Lakarsantri'
          }
        ];
        
        setFeaturedCafes(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured cafes:', error);
        setLoading(false);
      }
    };

    fetchFeaturedCafes();
  }, []);

  if (loading) {
    return <div className="loading">Loading featured cafes...</div>;
  }

  return (
    <section className="featured-cafes">
      <div className="container">
        <h2 className="section-title">Featured Cafes</h2>
        <div className="cafes-grid">
          {featuredCafes.map(cafe => (
            <Link to={`/cafe/${cafe.id}`} key={cafe.id} className="cafe-card">
              <div className="cafe-image">
                <img src={cafe.imageUrl} alt={cafe.name} />
                <div className="cafe-rating">{cafe.rating} ★</div>
              </div>
              <div className="cafe-info">
                <h3>{cafe.name}</h3>
                <p>{cafe.neighborhood}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="see-all-link">
          <Link to="/catalog">See All Cafes</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCafes;