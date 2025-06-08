import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './RegionalExplorationPage.css';

// Regional cafe data based on the user's list
const regionalCafeData = {
  utara: [
    {
      id: "dkalimas-coffee",
      name: "D'Kalimas Coffee",
      address: "Jalan Prapat Kurung Selatan, Perak Utara, Pabean Cantikan (dalam area PHC Hospital)",
      hours: "10:00 - 00:00 WIB",
      description: "Interior cozy dengan tema coklat, sofa nyaman, lokasi strategis dalam kompleks rumah sakit",
      specialty: "Menu cafe dan makanan ringan dengan suasana nyaman",
      rating: "4.5",
      category: "Cozy Interior"
    },
    {
      id: "kopilot-surabaya",
      name: "Kopilot Surabaya",
      address: "Terminal Gapura Surya Nusantara, Tanjung Perak (dalam Surabaya North Quay)",
      description: "Lokasi unik di terminal pelabuhan dengan pemandangan aktivitas maritim",
      specialty: "Berbagai jenis kopi Indonesia dengan barista profesional",
      rating: "4.4",
      category: "Unique Location"
    },
    {
      id: "omah-tua-coffee",
      name: "Omah Tua Coffee & Library",
      address: "Jalan Maspati V No.31, Bubutan",
      hours: "Sabtu-Kamis 16:00-22:00 (Jumat tutup)",
      description: "Bangunan kolonial bersejarah tahun 1907, gabungan coffee shop dan perpustakaan",
      priceRange: "Rp 18.000 - 50.000",
      specialty: "Kopi, teh, milkshake, nasi goreng",
      rating: "4.7",
      category: "Heritage Building"
    },
    {
      id: "petekan-riverside",
      name: "Petekan Riverside",
      address: "Tepi barat Sungai Kalimas, sebelah utara Jembatan Petekan (dekat Ampel)",
      hours: "11:00-21:30 WIB",
      description: "Lokasi tepi sungai bersejarah dengan suasana malam yang cantik",
      specialty: "Menu cafe dengan pemandangan sungai legendaris",
      rating: "4.6",
      category: "Riverside View"
    },
    {
      id: "house-of-sampoerna-cafe",
      name: "House of Sampoerna Cafe",
      address: "Taman Sampoerna No.6 (dekat Surabaya North Quay)",
      description: "Dalam kompleks museum House of Sampoerna yang terkenal",
      specialty: "Kopi dan makanan ringan dengan atmosfer museum bersejarah",
      rating: "4.5",
      category: "Museum Cafe"
    }
  ],
  barat: [
    {
      id: "gatherinc-bistro",
      name: "GATHERINC BISTRO & BAKERY",
      address: "Jl. Taman Puspa Raya A2/11, Sambikerep",
      hours: "09:00-22:00 WIB",
      description: "Desain industrial-rustic, area indoor/outdoor yang luas",
      priceRange: "Rp 36.000 - 69.000",
      specialty: "Asian cuisine, healthy menu (smoothie bowls), pastries",
      rating: "4.5",
      category: "Industrial Design"
    },
    {
      id: "redback-specialty-coffee",
      name: "REDBACK SPECIALTY COFFEE",
      address: "Jl. Raya Golf Graha Famili Blok K, Dukuhpakis",
      hours: "06:00-22:00 WIB",
      description: "Pemandangan lapangan golf, interior hitam elegan dengan lampu kuning",
      specialty: "Premium specialty coffee, menu sarapan",
      rating: "4.6",
      category: "Golf View"
    },
    {
      id: "miles-coffee",
      name: "MILES COFFEE",
      address: "Jl. Taman Gapura BB7, G-Walk Citraland",
      hours: "07:00-23:00 WIB",
      description: "Spot trendy baru (buka Desember 2023), dua lantai",
      specialty: "Kopi, Western food, chicken burger, nasi goreng",
      rating: "4.4",
      category: "New Trendy"
    },
    {
      id: "bugs-cafe",
      name: "BUGS CAFE",
      address: "Jl. Puri Widya Kencana, Lidah Kulon (belakang G-Walk Citraland)",
      hours: "11:00-21:00 WIB",
      description: "Tema otomotif unik dengan display VW Bug",
      specialty: "Western food, burger dengan harga terjangkau",
      rating: "4.3",
      category: "Automotive Theme"
    },
    {
      id: "tanamera-coffee",
      name: "TANAMERA COFFEE",
      address: "Area Komersial Graha Famili, Jl. Mayjen Yono Suwoyo, Babatan, Wiyung",
      description: "Chain coffee nasional dengan self-roasted beans premium",
      specialty: "Kopi roasted premium, ayam geprek, soto bebek",
      rating: "4.5",
      category: "Premium Chain"
    }
  ],
  timur: [
    {
      id: "casa-coffee",
      name: "Casa Coffee",
      address: "Jl. Wisma Permai I No.85, Mulyorejo",
      description: "Fokus pada manual brewing methods, lokasi tenang",
      specialty: "Single-origin coffee dengan metode manual brewing",
      rating: "4.6",
      category: "Manual Brewing"
    },
    {
      id: "communal-coffee",
      name: "Communal Coffee & Eatery",
      address: "Jl. Kertajaya Indah Tengah 24, Manyar Sabrangan, Mulyorejo",
      hours: "11:00-22:00 WIB",
      description: "Atmosfer homey dengan tanaman, dua lantai",
      specialty: "Contemporary coffee dan modern food menu",
      rating: "4.5",
      category: "Homey Atmosphere"
    },
    {
      id: "historica-cafe-kitchen",
      name: "Historica Cafe & Kitchen",
      address: "Jl. Sumatera No.40, Gubeng",
      hours: "09:00-22:00 WIB",
      description: "Berdiri sejak 2014, tema historical/vintage, live music",
      specialty: "Pizza, sandwiches, pasta, specialty coffee",
      rating: "4.6",
      category: "Historical Theme"
    },
    {
      id: "teco-specialty-coffee",
      name: "TECO Specialty Coffee",
      address: "Jl. Dharmawangsa No.78, Airlangga, Gubeng (depan UNAIR Kampus B)",
      hours: "08:00-00:00 WIB",
      description: "Lokasi strategis untuk mahasiswa",
      priceRange: "Mulai Rp 15.000",
      specialty: "Specialty coffee",
      rating: "4.4",
      category: "Student Friendly"
    },
    {
      id: "the-localist-coffee",
      name: "The Localist Coffee and Bistro",
      address: "Jl. Arief Rahman Hakim No.40, Klampis Ngasem, Sukolilo",
      hours: "09:00-21:00 WIB",
      description: "Konsep tropical garden dengan AC",
      priceRange: "Rp 20.000 - 70.000",
      specialty: "Fusion Indonesia dan Western",
      rating: "4.5",
      category: "Tropical Garden"
    }
  ],
  selatan: [
    {
      id: "kuni-rumah-makan",
      name: "KUNI Rumah Makan & Ruang Kopi",
      address: "Jl. Ngagel Jaya Selatan No. 143, Baratajaya, Gubeng",
      hours: "09:00-21:00 WIB",
      description: "Rooftop cafe dengan pemandangan kota",
      specialty: "Masakan tradisional Indonesia (Rawon, Nasi Goreng Kuni)",
      rating: "4.6",
      category: "Rooftop View"
    },
    {
      id: "le-cafe-gourmand-regional",
      name: "Le Café Gourmand",
      address: "Jl. Mayjend Yono Suwoyo, Babatan, Wiyung",
      hours: "08:00-23:00 WIB",
      description: "Suasana French-inspired, outdoor seating",
      specialty: "French pastries, gelato artisanal dengan rasa unik",
      rating: "4.6",
      category: "French Inspired"
    },
    {
      id: "dcoffee-cup-regional",
      name: "D'Coffee Cup",
      address: "Jl. Ngagel Jaya Selatan No. 63, Pucang Sewu, Gubeng",
      hours: "24 jam",
      description: "Buka 24 jam, 3 lantai dengan area indoor/outdoor",
      priceRange: "Rp 12.000 - 37.000",
      specialty: "Menu lengkap dengan harga terjangkau",
      rating: "4.3",
      category: "24 Hours"
    },
    {
      id: "cattura-espresso",
      name: "Cattura Espresso",
      address: "Jl. Anjasmoro No. 32, Sawahan",
      hours: "10:00-22:00 WIB",
      description: "Interior Instagram-worthy, sering untuk pre-wedding",
      specialty: "Signature drink \"Lestretto\" (espresso dengan soda dan lime)",
      rating: "4.7",
      category: "Instagram Worthy"
    },
    {
      id: "scrt-coffee",
      name: "Scrt Coffee & Eatery",
      address: "Jl. Ngagel Jaya Barat No. 63, Pucang Sewu, Gubeng",
      description: "Desain aesthetic modern, area outdoor",
      specialty: "Specialty coffee dengan cuisine modern",
      rating: "4.7",
      category: "Modern Aesthetic"
    }
  ],
  pusat: [
    {
      id: "zangrandi-ice-cream",
      name: "Zangrandi Ice Cream",
      address: "Jl. Yos Sudarso No. 15, Genteng",
      hours: "10:00-22:00 WIB",
      description: "Es krim Italia bersejarah sejak 1930, interior klasik kolonial",
      specialty: "Banana Split, Avocadocano, Macedonia, Tutti Frutti",
      rating: "4.8",
      category: "Historic Ice Cream"
    },
    {
      id: "calibre-coffee-regional",
      name: "Calibre Coffee Roasters",
      address: "Jl. Walikota Mustajab No. 67-69, Ketabang, Genteng",
      hours: "Minggu-Kamis 10:00-22:00, Jumat-Sabtu 10:00-23:30 WIB",
      description: "Fasilitas roasting in-house, desain urban minimalis",
      specialty: "Single-origin Indonesian beans, V60 brewing",
      rating: "4.5",
      category: "Coffee Roasters"
    },
    {
      id: "blackbarn-coffee-regional",
      name: "BlackBarn Coffee",
      address: "Jl. Untung Suropati No. 79, DR. Soetomo, Tegalsari",
      description: "Atmosfer industrial-vintage, area outdoor semi-tropis",
      specialty: "Manual brew coffee, hamburger",
      rating: "4.6",
      category: "Industrial Vintage"
    },
    {
      id: "thirty-three-brew-regional",
      name: "Thirty Three Brew",
      address: "Jl. Tunjungan No. 88, Genteng",
      hours: "07:00-22:00 WIB",
      description: "Desain minimalis Japanese-inspired, kopi dalam kaleng",
      specialty: "Es Kopi Baileys, Es Kopi Aren, coffee cans 180ml/330ml",
      rating: "4.5",
      category: "Japanese Inspired"
    },
    {
      id: "carpentier-kitchen-regional",
      name: "Carpentier Kitchen",
      address: "Jl. Untung Suropati No. 83, DR. Soetomo, Tegalsari",
      description: "Gabungan cafe dengan fashion store (ORE Store), 3 lantai",
      specialty: "Willa's Chicken, pasta Western, pancakes Nutella",
      rating: "4.8",
      category: "Concept Store"
    }
  ]
};

// Region mapping for easy access
const regionMap = {
  utara: {
    id: 'utara',
    name: 'Surabaya Utara',
    icon: '🏛️',
    description: 'Heritage & riverside cafes',
    color: '#3B82F6'
  },
  barat: {
    id: 'barat',
    name: 'Surabaya Barat',
    icon: '🏌️',
    description: 'Modern & premium venues',
    color: '#10B981'
  },
  timur: {
    id: 'timur',
    name: 'Surabaya Timur',
    icon: '🎓',
    description: 'Student-friendly & specialty',
    color: '#F59E0B'
  },
  selatan: {
    id: 'selatan',
    name: 'Surabaya Selatan',
    icon: '🌆',
    description: 'Modern & aesthetic spots',
    color: '#EC4899'
  },
  pusat: {
    id: 'pusat',
    name: 'Surabaya Pusat',
    icon: '🏢',
    description: 'Historic & central locations',
    color: '#8B5CF6'
  }
};

const RegionalExplorationPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('utara');
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const cafesPerPage = 8;

  // Get region from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const regionParam = urlParams.get('region');
    if (regionParam) {
      setSelectedRegion(regionParam);
    }
  }, []);

  // Get regions from the region map
  const regions = Object.values(regionMap).map(region => ({
    ...region,
    label: region.name
  }));

  // Filter cafes based on selected region
  useEffect(() => {
    setIsLoading(true);
    
    // Get cafes from regional data
    const cafesForRegion = regionalCafeData[selectedRegion] || [];
    setFilteredCafes(cafesForRegion);
    
    setCurrentPage(1);
    setIsLoading(false);
  }, [selectedRegion]);

  // Paginated cafes
  const currentCafes = filteredCafes.slice(
    (currentPage - 1) * cafesPerPage,
    currentPage * cafesPerPage
  );

  const totalPages = Math.ceil(filteredCafes.length / cafesPerPage);

  // GSAP Animations
  useEffect(() => {
    gsap.fromTo('.hero-section', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    gsap.fromTo('.region-card', 
      { opacity: 0, y: 30, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 0.3
      }
    );
  }, []);

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo('.cafe-card', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    }
  }, [currentCafes, isLoading]);

  const handleRegionChange = (regionId) => {
    setSelectedRegion(regionId);
    
    // Update URL without page reload
    const url = new URL(window.location);
    url.searchParams.set('region', regionId);
    window.history.pushState({}, '', url);
    
    // Animate region switch
    gsap.to('.results-section', {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        gsap.to('.results-section', {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.1
        });
      }
    });
  };

  const selectedRegionData = regions.find(region => region.id === selectedRegion);

  return (
    <div className="regional-exploration-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">🗺️</span>
              <span className="badge-text">Eksplorasi Regional</span>
            </div>
            
            <h1 className="hero-title">
              Jelajahi Cafe di
              <span className="title-highlight"> Seluruh Surabaya</span>
            </h1>
            
            <p className="hero-description">
              Temukan hidden gems dan cafe terbaik di setiap wilayah Surabaya. 
              Dari heritage Surabaya Utara hingga modern Surabaya Barat!
            </p>
          </div>
          
          <div className="hero-visual">
            <div className="floating-icons">
              <div className="float-icon icon-1">🏛️</div>
              <div className="float-icon icon-2">🏌️</div>
              <div className="float-icon icon-3">🎓</div>
              <div className="float-icon icon-4">🌆</div>
              <div className="float-icon icon-5">🏢</div>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="regions-section">
        <div className="container">
          <h2 className="section-title">Pilih Wilayah Surabaya</h2>
          
          <div className="regions-grid">
            {regions.map((region) => (
              <div
                key={region.id}
                className={`region-card ${selectedRegion === region.id ? 'active' : ''}`}
                onClick={() => handleRegionChange(region.id)}
                style={{ '--region-color': region.color }}
              >
                <div className="region-icon">{region.icon}</div>
                <h3 className="region-label">{region.label}</h3>
                <p className="region-description">{region.description}</p>
                <div className="region-overlay"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section">
        <div className="container">
          <div className="results-header">
            <div className="results-info">
              <h2 className="results-title">
                <span className="region-icon-large" style={{ color: selectedRegionData?.color }}>
                  {selectedRegionData?.icon}
                </span>
                {selectedRegionData?.label}
              </h2>
              <p className="results-count">
                Ditemukan <strong>{filteredCafes.length}</strong> cafe di wilayah ini
              </p>
            </div>
            
            <div className="results-actions">
              <button className="filter-btn">
                <span>🔍</span>
                Filter Lainnya
              </button>
              <button className="sort-btn">
                <span>⚡</span>
                Urutkan
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-grid">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="loading-card">
                  <div className="loading-image"></div>
                  <div className="loading-content">
                    <div className="loading-title"></div>
                    <div className="loading-text"></div>
                    <div className="loading-text short"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="cafes-grid">
                {currentCafes.map((cafe, index) => (
                  <div key={cafe.id} className="cafe-card">
                    <div className="cafe-image">
                      <img 
                        src={`https://images.unsplash.com/photo-${
                          ['1554118811-1e0d58224f24', '1521017432-4e4023ae2755', '1556909709-f3115eece164', 
                           '1559056199-641a0ac025fb', '1516733725897-1aa73b87c8e8', '1501339847302-ac426a4a7cbb',
                           '1453614512566-6ad58d3a5d02', '1509042239860-f550ce710b93', '1544367567-0f2fcb6e56b3',
                           '1521478959141-ac5dcd8a0985'][index % 10]
                        }?w=400&h=300&fit=crop&auto=format&q=80`}
                        alt={cafe.name}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop&auto=format&q=80';
                        }}
                      />
                      <div className="cafe-rating">
                        <span className="star">⭐</span>
                        <span>{cafe.rating}</span>
                      </div>
                      <div className="cafe-category-tag" style={{ backgroundColor: selectedRegionData?.color }}>
                        {selectedRegionData?.icon}
                      </div>
                    </div>
                    
                    <div className="cafe-content">
                      <div className="cafe-header">
                        <h3 className="cafe-name">{cafe.name}</h3>
                        <p className="cafe-address">{cafe.address}</p>
                      </div>
                      
                      <div className="cafe-info">
                        {cafe.hours && (
                          <div className="cafe-hours">🕒 {cafe.hours}</div>
                        )}
                        
                        {cafe.priceRange && (
                          <div className="cafe-price">💰 {cafe.priceRange}</div>
                        )}
                        
                        <p className="cafe-description">{cafe.description}</p>
                        
                        {cafe.specialty && (
                          <div className="cafe-specialty">✨ {cafe.specialty}</div>
                        )}
                      </div>
                      
                      <div className="cafe-footer">
                        <div className="cafe-highlights">
                          <span className="highlight-tag">{cafe.category}</span>
                          <span className="highlight-tag">⭐ {cafe.rating}</span>
                        </div>
                        
                        <div className="cafe-actions">
                          <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.name + ' ' + cafe.address)}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="action-btn primary"
                          >
                            <span>📍</span>
                            Lihat Lokasi
                          </a>
                          <button className="action-btn secondary">
                            <span>❤️</span>
                            Simpan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="page-btn prev"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    ← Sebelumnya
                  </button>
                  
                  <div className="page-numbers">
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    className="page-btn next"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Selanjutnya →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default RegionalExplorationPage;