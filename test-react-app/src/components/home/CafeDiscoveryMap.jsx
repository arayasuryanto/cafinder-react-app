import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CafeDiscoveryMap = ({ navigateTo }) => {
  const [selectedRegion, setSelectedRegion] = useState('pusat');

  const regions = {
    pusat: { 
      name: 'Pusat', 
      cafes: 45, 
      color: '#F05438',
      description: 'Heritage & Modern',
      popularCafes: ['Zangrandi', 'Calibre Coffee']
    },
    timur: { 
      name: 'Timur', 
      cafes: 38, 
      color: '#3B82F6',
      description: 'Student Friendly',
      popularCafes: ['TECO Coffee', 'Casa Coffee']
    },
    barat: { 
      name: 'Barat', 
      cafes: 52, 
      color: '#10B981',
      description: 'Premium & Golf',
      popularCafes: ['Redback', 'Gatherinc']
    },
    utara: { 
      name: 'Utara', 
      cafes: 29, 
      color: '#8B5CF6',
      description: 'Riverside & Historic',
      popularCafes: ['Petekan', "D'Kalimas"]
    },
    selatan: { 
      name: 'Selatan', 
      cafes: 41, 
      color: '#F59E0B',
      description: 'Rooftop & Aesthetic',
      popularCafes: ['KUNI', 'Scrt Coffee']
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section entrance
      gsap.fromTo('.surabaya-discovery',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.surabaya-discovery',
            start: 'top 80%'
          }
        }
      );

      // Animate region cards
      gsap.fromTo('.region-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.regions-list',
            start: 'top 80%'
          }
        }
      );

      // Animate map
      gsap.fromTo('.surabaya-map-container',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.surabaya-map-container',
            start: 'top 80%'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="surabaya-discovery">
      <div className="container">
        <div className="discovery-content">
          
          {/* Left Side - Content */}
          <div className="discovery-text">
            <div className="section-badge">
              <span className="badge-icon">🗺️</span>
              <span className="badge-text">Peta Wilayah</span>
            </div>
            
            <h2 className="discovery-title">
              Jelajahi Cafe di<br />
              <span className="title-highlight">Seluruh Surabaya</span>
            </h2>
            
            <p className="discovery-description">
              Kurasi dari team Cafinder dengan berbagai sumber review cafe terpercaya 
              untuk memberikan rekomendasi terbaik di setiap wilayah Surabaya.
            </p>

            {/* Regions List */}
            <div className="regions-list">
              {Object.entries(regions).map(([key, region]) => (
                <div
                  key={key}
                  className={`region-card ${selectedRegion === key ? 'active' : ''}`}
                  onClick={() => setSelectedRegion(key)}
                  style={{
                    '--region-color': region.color,
                    '--region-color-rgb': key === 'pusat' ? '240, 84, 56' :
                                        key === 'timur' ? '59, 130, 246' :
                                        key === 'barat' ? '16, 185, 129' :
                                        key === 'utara' ? '139, 92, 246' :
                                        '245, 158, 11'
                  }}
                >
                  <div className="region-header">
                    <div className="region-dot"></div>
                    <div className="region-name">{region.name}</div>
                    <div className="region-count">{region.cafes} cafe</div>
                  </div>
                  <div className="region-desc">{region.description}</div>
                  {selectedRegion === key && (
                    <div className="region-details">
                      <div className="popular-cafes">
                        <span className="popular-label">Popular:</span>
                        {region.popularCafes.slice(0, 2).map((cafe, index) => (
                          <span key={index} className="cafe-tag">{cafe}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="discovery-cta">
              <button onClick={() => navigateTo('/regional-exploration')} className="explore-all-btn">
                <span className="btn-icon">🚀</span>
                <span className="btn-text">Explore Semua Area</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>

          {/* Right Side - Surabaya Map */}
          <div className="discovery-visual">
            <div className="surabaya-map-container">
              <div className="map-frame">
                <svg viewBox="0 0 400 300" className="surabaya-map">
                  {/* Map Background */}
                  <defs>
                    <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F8FAFC"/>
                      <stop offset="100%" stopColor="#F1F5F9"/>
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="400" height="300" fill="url(#mapBg)" rx="8"/>
                  
                  {/* Surabaya Regions - More realistic shapes */}
                  <g className="map-regions">
                    {/* Surabaya Utara */}
                    <path
                      d="M80 60 L320 60 L320 120 L200 120 L80 120 Z"
                      fill={selectedRegion === 'utara' ? regions.utara.color : '#E2E8F0'}
                      onClick={() => setSelectedRegion('utara')}
                      className="region-path"
                    />
                    
                    {/* Surabaya Barat */}
                    <path
                      d="M80 120 L160 120 L160 200 L80 200 Z"
                      fill={selectedRegion === 'barat' ? regions.barat.color : '#E2E8F0'}
                      onClick={() => setSelectedRegion('barat')}
                      className="region-path"
                    />
                    
                    {/* Surabaya Pusat */}
                    <path
                      d="M160 120 L240 120 L240 180 L160 180 Z"
                      fill={selectedRegion === 'pusat' ? regions.pusat.color : '#E2E8F0'}
                      onClick={() => setSelectedRegion('pusat')}
                      className="region-path"
                    />
                    
                    {/* Surabaya Timur */}
                    <path
                      d="M240 120 L320 120 L320 200 L240 200 Z"
                      fill={selectedRegion === 'timur' ? regions.timur.color : '#E2E8F0'}
                      onClick={() => setSelectedRegion('timur')}
                      className="region-path"
                    />
                    
                    {/* Surabaya Selatan */}
                    <path
                      d="M160 180 L240 180 L240 240 L160 240 Z"
                      fill={selectedRegion === 'selatan' ? regions.selatan.color : '#E2E8F0'}
                      onClick={() => setSelectedRegion('selatan')}
                      className="region-path"
                    />
                  </g>

                  {/* Region Labels */}
                  <g className="region-labels">
                    <text x="200" y="90" textAnchor="middle" className="region-label">UTARA</text>
                    <text x="120" y="160" textAnchor="middle" className="region-label">BARAT</text>
                    <text x="200" y="150" textAnchor="middle" className="region-label">PUSAT</text>
                    <text x="280" y="160" textAnchor="middle" className="region-label">TIMUR</text>
                    <text x="200" y="210" textAnchor="middle" className="region-label">SELATAN</text>
                  </g>

                  {/* Cafe Dots */}
                  <g className="cafe-indicators">
                    {/* Dynamic dots based on selected region */}
                    {selectedRegion === 'pusat' && (
                      <>
                        <circle cx="190" cy="140" r="4" fill="#FFFFFF" stroke={regions.pusat.color} strokeWidth="2"/>
                        <circle cx="210" cy="150" r="4" fill="#FFFFFF" stroke={regions.pusat.color} strokeWidth="2"/>
                        <circle cx="200" cy="160" r="4" fill="#FFFFFF" stroke={regions.pusat.color} strokeWidth="2"/>
                      </>
                    )}
                    {selectedRegion === 'timur' && (
                      <>
                        <circle cx="260" cy="140" r="4" fill="#FFFFFF" stroke={regions.timur.color} strokeWidth="2"/>
                        <circle cx="280" cy="160" r="4" fill="#FFFFFF" stroke={regions.timur.color} strokeWidth="2"/>
                        <circle cx="290" cy="180" r="4" fill="#FFFFFF" stroke={regions.timur.color} strokeWidth="2"/>
                      </>
                    )}
                    {selectedRegion === 'barat' && (
                      <>
                        <circle cx="120" cy="140" r="4" fill="#FFFFFF" stroke={regions.barat.color} strokeWidth="2"/>
                        <circle cx="140" cy="160" r="4" fill="#FFFFFF" stroke={regions.barat.color} strokeWidth="2"/>
                        <circle cx="130" cy="180" r="4" fill="#FFFFFF" stroke={regions.barat.color} strokeWidth="2"/>
                      </>
                    )}
                    {selectedRegion === 'utara' && (
                      <>
                        <circle cx="150" cy="90" r="4" fill="#FFFFFF" stroke={regions.utara.color} strokeWidth="2"/>
                        <circle cx="200" cy="85" r="4" fill="#FFFFFF" stroke={regions.utara.color} strokeWidth="2"/>
                        <circle cx="250" cy="90" r="4" fill="#FFFFFF" stroke={regions.utara.color} strokeWidth="2"/>
                      </>
                    )}
                    {selectedRegion === 'selatan' && (
                      <>
                        <circle cx="180" cy="210" r="4" fill="#FFFFFF" stroke={regions.selatan.color} strokeWidth="2"/>
                        <circle cx="200" cy="220" r="4" fill="#FFFFFF" stroke={regions.selatan.color} strokeWidth="2"/>
                        <circle cx="220" cy="210" r="4" fill="#FFFFFF" stroke={regions.selatan.color} strokeWidth="2"/>
                      </>
                    )}
                  </g>
                </svg>
              </div>
              
              {/* Map Info */}
              <div className="map-info">
                <div className="selected-region">
                  <h4>{regions[selectedRegion].name}</h4>
                  <p>{regions[selectedRegion].cafes} cafe tersedia</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default CafeDiscoveryMap;