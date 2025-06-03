import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CafeDiscoveryMap = () => {
  const [selectedRegion, setSelectedRegion] = useState('pusat');

  const regions = {
    pusat: { name: 'Surabaya Pusat', cafes: 45, color: '#F05438' },
    timur: { name: 'Surabaya Timur', cafes: 38, color: '#3B82F6' },
    barat: { name: 'Surabaya Barat', cafes: 52, color: '#10B981' },
    utara: { name: 'Surabaya Utara', cafes: 29, color: '#8B5CF6' },
    selatan: { name: 'Surabaya Selatan', cafes: 41, color: '#F59E0B' }
  };

  useEffect(() => {
    // Animate map section
    gsap.fromTo('.discovery-map',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '.discovery-map',
          start: 'top 80%'
        }
      }
    );

    // Animate region cards
    gsap.fromTo('.region-stat',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.region-stats',
          start: 'top 80%'
        }
      }
    );
  }, []);

  return (
    <section className="discovery-map">
      <div className="container">
        <div className="map-header">
          <h2 className="section-title">
            Jelajahi Cafe di <span className="highlight">Seluruh Surabaya</span>
          </h2>
          <p className="section-subtitle">
            Temukan cafe terdekat di wilayahmu
          </p>
        </div>

        <div className="map-content">
          <div className="map-visual">
            {/* Simplified SVG Map */}
            <svg viewBox="0 0 400 300" className="surabaya-map">
              {/* Map regions - simplified representation */}
              <g className="map-regions">
                <path
                  d="M200 50 L250 100 L200 150 L150 100 Z"
                  fill={selectedRegion === 'pusat' ? regions.pusat.color : '#E5E7EB'}
                  onClick={() => setSelectedRegion('pusat')}
                  className="region-path"
                />
                <path
                  d="M250 100 L300 100 L300 150 L250 150 Z"
                  fill={selectedRegion === 'timur' ? regions.timur.color : '#E5E7EB'}
                  onClick={() => setSelectedRegion('timur')}
                  className="region-path"
                />
                <path
                  d="M100 100 L150 100 L150 150 L100 150 Z"
                  fill={selectedRegion === 'barat' ? regions.barat.color : '#E5E7EB'}
                  onClick={() => setSelectedRegion('barat')}
                  className="region-path"
                />
                <path
                  d="M150 50 L200 50 L150 100 L100 50 Z"
                  fill={selectedRegion === 'utara' ? regions.utara.color : '#E5E7EB'}
                  onClick={() => setSelectedRegion('utara')}
                  className="region-path"
                />
                <path
                  d="M150 150 L200 150 L250 200 L100 200 Z"
                  fill={selectedRegion === 'selatan' ? regions.selatan.color : '#E5E7EB'}
                  onClick={() => setSelectedRegion('selatan')}
                  className="region-path"
                />
              </g>

              {/* Cafe dots */}
              <g className="cafe-dots">
                <circle cx="180" cy="100" r="3" fill="#fff" className="cafe-dot" />
                <circle cx="200" cy="120" r="3" fill="#fff" className="cafe-dot" />
                <circle cx="220" cy="100" r="3" fill="#fff" className="cafe-dot" />
                <circle cx="270" cy="125" r="3" fill="#fff" className="cafe-dot" />
                <circle cx="130" cy="125" r="3" fill="#fff" className="cafe-dot" />
              </g>
            </svg>

            {/* Selected Region Info */}
            <div className="selected-region-info">
              <h3>{regions[selectedRegion].name}</h3>
              <p className="cafe-count">{regions[selectedRegion].cafes} Cafe Tersedia</p>
              <a href={`/map?region=${selectedRegion}`} className="explore-btn">
                Explore Area →
              </a>
            </div>
          </div>

          <div className="map-sidebar">
            <h3>Cafe per Wilayah</h3>
            <div className="region-stats">
              {Object.entries(regions).map(([key, region]) => (
                <div
                  key={key}
                  className={`region-stat ${selectedRegion === key ? 'active' : ''}`}
                  onClick={() => setSelectedRegion(key)}
                >
                  <div className="region-color" style={{ backgroundColor: region.color }}></div>
                  <div className="region-info">
                    <h4>{region.name}</h4>
                    <p>{region.cafes} cafe</p>
                  </div>
                  <div className="region-percentage">
                    {Math.round((region.cafes / 205) * 100)}%
                  </div>
                </div>
              ))}
            </div>

            <div className="map-cta">
              <a href="/map" className="full-map-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20.5 3L20.34 3.03L15 5.1L9 3L3.36 4.9C3.15 4.97 3 5.15 3 5.38V20.5C3 20.78 3.22 21 3.5 21L3.66 20.97L9 18.9L15 21L20.64 19.1C20.85 19.03 21 18.85 21 18.62V3.5C21 3.22 20.78 3 20.5 3ZM15 19L9 16.89V5L15 7.11V19Z" fill="currentColor"/>
                </svg>
                Buka Peta Interaktif
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CafeDiscoveryMap;