import React, { useState } from 'react';
import './RegionalExplorationPage.css';

const RegionalExplorationPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('surabaya-utara');
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const regions = {
    'surabaya-utara': {
      title: 'Surabaya Utara',
      icon: '🌊',
      description: 'Kawasan bersejarah dengan cafe heritage dan pemandangan sungai',
      cafes: [
        {
          name: "D'Kalimas Coffee",
          address: 'Jalan Prapat Kurung Selatan, Perak Utara, Pabean Cantikan',
          hours: '10:00 - 00:00 WIB',
          price: 'Moderate',
          highlights: ['Interior cozy', 'Tema coklat', 'Lokasi strategis'],
          specialty: 'Menu cafe dan makanan ringan dengan suasana nyaman',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.1!2d112.7459!3d-7.2417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTQnMzAuMSJTIDExMsKwNDQnNDUuMiJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        },
        {
          name: 'Kopilot Surabaya',
          address: 'Terminal Gapura Surya Nusantara, Tanjung Perak',
          hours: 'Daily',
          price: 'Moderate',
          highlights: ['Lokasi unik', 'Pemandangan maritim', 'Barista profesional'],
          specialty: 'Berbagai jenis kopi Indonesia dengan view pelabuhan',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.2!2d112.7419!3d-7.2397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTQnMjMuMSJTIDExMsKwNDQnMzEuMSJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        },
        {
          name: 'Omah Tua Coffee & Library',
          address: 'Jalan Maspati V No.31, Bubutan',
          hours: 'Sabtu-Kamis 16:00-22:00 (Jumat tutup)',
          price: 'Rp 18.000-50.000',
          highlights: ['Bangunan kolonial 1907', 'Coffee & perpustakaan', 'Bersejarah'],
          specialty: 'Kopi, teh, milkshake dalam bangunan heritage',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.3!2d112.7389!3d-7.2377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTQnMTUuNyJTIDExMsKwNDQnMjAuMCJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        },
        {
          name: 'Petekan Riverside',
          address: 'Tepi barat Sungai Kalimas, sebelah utara Jembatan Petekan',
          hours: '11:00-21:30 WIB',
          price: 'Moderate',
          highlights: ['Tepi sungai bersejarah', 'Suasana malam cantik', 'Pemandangan sungai'],
          specialty: 'Menu cafe dengan view sungai legendaris Kalimas',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.4!2d112.7359!3d-7.2357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTQnMDguNSJTIDExMsKwNDQnMDkuMiJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        }
      ]
    },
    'surabaya-barat': {
      title: 'Surabaya Barat',
      icon: '🏞️',
      description: 'Kawasan modern dengan cafe specialty coffee dan konsep industrial',
      cafes: [
        {
          name: 'GATHERINC BISTRO & BAKERY',
          address: 'Jl. Taman Puspa Raya A2/11, Sambikerep',
          hours: '09:00-22:00 WIB',
          price: 'Rp 36.000-69.000',
          highlights: ['Industrial-rustic', 'Area indoor/outdoor', 'Rating 4.5/5'],
          specialty: 'Asian cuisine, healthy menu, pastries premium',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.8!2d112.6589!3d-7.2287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTMnNDMuMSJTIDExMsKwMzknMzIuMCJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        },
        {
          name: 'REDBACK SPECIALTY COFFEE',
          address: 'Jl. Raya Golf Graha Famili Blok K, Dukuhpakis',
          hours: '06:00-22:00 WIB',
          price: 'Premium',
          highlights: ['Pemandangan golf', 'Interior hitam elegan', 'Premium coffee'],
          specialty: 'Single-origin Indonesian beans, V60 brewing',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.9!2d112.6719!3d-7.2317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTMnNTMuMSJTIDExMsKwNDAn1OC4uME!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        },
        {
          name: 'MILES COFFEE',
          address: 'Jl. Taman Gapura BB7, G-Walk Citraland',
          hours: '07:00-23:00 WIB',
          price: 'Moderate',
          highlights: ['Spot trendy baru', 'Dua lantai', 'Dekat G-Walk'],
          specialty: 'Kopi, Western food, chicken burger premium',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.7!2d112.6649!3d-7.2267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTMnMzYuMSJTIDExMsKwMzknNTMuNiJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        },
        {
          name: 'BUGS CAFE',
          address: 'Jl. Puri Widya Kencana, Lidah Kulon',
          hours: '11:00-21:00 WIB',
          price: 'Budget-friendly',
          highlights: ['Tema otomotif unik', 'Display VW Bug', 'Harga terjangkau'],
          specialty: 'Western food dan burger dengan konsep automotive',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.6!2d112.6689!3d-7.2247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTMnMjguOSJTIDExMsKwNDAnMDguMCJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        }
      ]
    },
    'surabaya-timur': {
      title: 'Surabaya Timur',
      icon: '🎓',
      description: 'Kawasan mahasiswa dengan cafe study-friendly dan specialty coffee',
      cafes: [
        {
          name: 'Casa Coffee',
          address: 'Jl. Wisma Permai I No.85, Mulyorejo',
          hours: 'Daily',
          price: 'Moderate',
          highlights: ['Manual brewing focus', 'Lokasi tenang', 'Single-origin'],
          specialty: 'Single-origin coffee dengan metode manual brewing',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.5!2d112.7929!3d-7.2687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTYnMDcuMyJTIDExMsKwNDcnMzQuNCJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        },
        {
          name: 'Communal Coffee & Eatery',
          address: 'Jl. Kertajaya Indah Tengah 24, Manyar Sabrangan',
          hours: '11:00-22:00 WIB',
          price: 'Moderate',
          highlights: ['Atmosfer homey', 'Tanaman hijau', 'Dua lantai'],
          specialty: 'Contemporary coffee dan modern food menu',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.4!2d112.7859!3d-7.2657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnNTYuNSJTIDExMsKwNDcnMDkuMiJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        },
        {
          name: 'TECO Specialty Coffee',
          address: 'Jl. Dharmawangsa No.78, Airlangga, Gubeng',
          hours: '08:00-00:00 WIB',
          price: 'Mulai Rp 15.000',
          highlights: ['Dekat UNAIR', 'Strategis mahasiswa', '24 jam operasi'],
          specialty: 'Specialty coffee dengan harga student-friendly',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.3!2d112.7789!3d-7.2627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnNDYuNiJTIDExMsKwNDYnNDQuMCJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        },
        {
          name: 'The Localist Coffee and Bistro',
          address: 'Jl. Arief Rahman Hakim No.40, Klampis Ngasem',
          hours: '09:00-21:00 WIB',
          price: 'Rp 20.000-70.000',
          highlights: ['Tropical garden', 'AC indoor', 'Fusion menu'],
          specialty: 'Fusion Indonesia dan Western dalam suasana tropis',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.2!2d112.7719!3d-7.2597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnMzQuOSJTIDExMsKwNDYnMTguOCJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        }
      ]
    },
    'surabaya-selatan': {
      title: 'Surabaya Selatan',
      icon: '🌆',
      description: 'Kawasan modern dengan cafe aesthetic dan rooftop view',
      cafes: [
        {
          name: 'KUNI Rumah Makan & Ruang Kopi',
          address: 'Jl. Ngagel Jaya Selatan No. 143, Baratajaya',
          hours: '09:00-21:00 WIB',
          price: 'Moderate',
          highlights: ['Rooftop cafe', 'Pemandangan kota', 'Masakan tradisional'],
          specialty: 'Traditional Indonesian dengan rooftop city view',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.8!2d112.7689!3d-7.2927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTcnMzMuNyJTIDExMsKwNDYnMDguMCJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        },
        {
          name: 'Le Café Gourmand',
          address: 'Jl. Mayjend Yono Suwoyo, Babatan, Wiyung',
          hours: '08:00-23:00 WIB',
          price: 'Rp 45.000+',
          highlights: ['French-inspired', 'Outdoor seating', 'Rating 4.6/5'],
          specialty: 'French pastries dan gelato artisanal premium',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.7!2d112.7019!3d-7.2897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTcnMjMuMSJTIDExMsKwNDInMDYuOCJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        },
        {
          name: "D'Coffee Cup",
          address: 'Jl. Ngagel Jaya Selatan No. 63, Pucang Sewu',
          hours: '24 jam',
          price: 'Rp 12.000-37.000',
          highlights: ['Buka 24 jam', '3 lantai', 'Indoor/outdoor'],
          specialty: 'Menu lengkap 24 jam dengan harga terjangkau',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.6!2d112.7659!3d-7.2877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTcnMTUuNyJTIDExMsKwNDUnNTcuMiJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        },
        {
          name: 'Scrt Coffee & Eatery',
          address: 'Jl. Ngagel Jaya Barat No. 63, Pucang Sewu',
          hours: 'Daily',
          price: 'Moderate',
          highlights: ['Aesthetic modern', 'Area outdoor', 'Rating 4.7/5'],
          specialty: 'Specialty coffee dengan cuisine modern aesthetic',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.5!2d112.7629!3d-7.2857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTcnMDYuOSJTIDExMsKwNDUnNDYuNCJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        }
      ]
    },
    'surabaya-pusat': {
      title: 'Surabaya Pusat',
      icon: '🏛️',
      description: 'Pusat kota dengan cafe heritage dan specialty roasters',
      cafes: [
        {
          name: 'Zangrandi Ice Cream',
          address: 'Jl. Yos Sudarso No. 15, Genteng',
          hours: '10:00-22:00 WIB',
          price: 'Heritage pricing',
          highlights: ['Sejak 1930', 'Interior kolonial', 'Es krim Italia'],
          specialty: 'Banana Split, Avocadocano, heritage Italian gelato',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.0!2d112.7409!3d-7.2567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnMjQuNCJTIDExMsKwNDQnMjcuMiJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        },
        {
          name: 'Calibre Coffee Roasters',
          address: 'Jl. Walikota Mustajab No. 67-69, Ketabang',
          hours: 'Min-Kam 10:00-22:00, Jum-Sab 10:00-23:30',
          price: 'Premium',
          highlights: ['In-house roasting', 'Urban minimalis', 'Rating 4.5/5'],
          specialty: 'Single-origin Indonesian beans, V60 brewing',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.9!2d112.7379!3d-7.2537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnMTMuMyJTIDExMsKwNDQnMTYuNCJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        },
        {
          name: 'BlackBarn Coffee',
          address: 'Jl. Untung Suropati No. 79, DR. Soetomo',
          hours: 'Daily',
          price: 'Moderate',
          highlights: ['Industrial-vintage', 'Semi-tropis outdoor', 'Manual brew'],
          specialty: 'Manual brew coffee dengan hamburger signature',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.8!2d112.7349!3d-7.2507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTUnMDIuNSJTIDExMsKwNDQnMDUuNiJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        },
        {
          name: 'Thirty Three Brew',
          address: 'Jl. Tunjungan No. 88, Genteng',
          hours: '07:00-22:00 WIB',
          price: 'Moderate',
          highlights: ['Japanese-inspired', 'Kopi dalam kaleng', 'Minimalis'],
          specialty: 'Es Kopi Baileys, Es Kopi Aren, coffee cans',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.7!2d112.7389!3d-7.2477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTQnNTEuNyJTIDExMsKwNDQnMjAuMCJF!5e0!3m2!1sen!2sid!4v1609459200000!5m2!1sen!2sid'
        }
      ]
    }
  };

  const handleCafeClick = (cafe) => {
    setSelectedCafe(cafe);
    setShowMap(true);
  };

  const closeMap = () => {
    setShowMap(false);
    setSelectedCafe(null);
  };

  return (
    <div className="regional-exploration">
      <div className="exploration-header">
        <h1>Jelajahi Cafe di Seluruh Surabaya</h1>
        <p>Temukan cafe terbaik berdasarkan wilayah geografis Surabaya</p>
      </div>

      <div className="region-selector">
        {Object.entries(regions).map(([key, region]) => (
          <div
            key={key}
            className={`region-card ${selectedRegion === key ? 'active' : ''}`}
            onClick={() => setSelectedRegion(key)}
          >
            <div className="region-icon">{region.icon}</div>
            <div className="region-name">{region.title}</div>
          </div>
        ))}
      </div>

      <div className="selected-region-section">
        <div className="region-header">
          <h2>
            <span className="region-icon">{regions[selectedRegion].icon}</span>
            {regions[selectedRegion].title}
          </h2>
          <p>{regions[selectedRegion].description}</p>
        </div>

        <div className="regional-cafes-grid">
          {regions[selectedRegion].cafes.map((cafe, index) => (
            <div key={index} className="regional-cafe-card">
              <div className="regional-cafe-header">
                <div className="regional-cafe-icon">
                  {regions[selectedRegion].icon}
                </div>
                <div className="regional-cafe-price">{cafe.price}</div>
              </div>
              
              <div className="regional-cafe-content">
                <h3>{cafe.name}</h3>
                <p className="regional-cafe-address">📍 {cafe.address}</p>
                <p className="regional-cafe-hours">🕐 {cafe.hours}</p>
                <p className="regional-cafe-specialty">✨ {cafe.specialty}</p>
                
                <div className="regional-cafe-highlights">
                  {cafe.highlights.map((highlight, idx) => (
                    <span key={idx} className="regional-highlight-tag">{highlight}</span>
                  ))}
                </div>

                <button 
                  className="view-location-btn"
                  onClick={() => handleCafeClick(cafe)}
                >
                  📍 Lihat Lokasi
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showMap && selectedCafe && (
        <div className="map-modal">
          <div className="map-modal-content">
            <div className="map-modal-header">
              <h3>{selectedCafe.name}</h3>
              <button className="close-map-btn" onClick={closeMap}>✕</button>
            </div>
            <div className="map-container">
              <iframe
                src={selectedCafe.mapUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${selectedCafe.name}`}
              ></iframe>
            </div>
            <div className="map-modal-info">
              <p><strong>Alamat:</strong> {selectedCafe.address}</p>
              <p><strong>Jam Buka:</strong> {selectedCafe.hours}</p>
              <p><strong>Specialty:</strong> {selectedCafe.specialty}</p>
            </div>
          </div>
        </div>
      )}

      <div className="regional-curated-note">
        <p>🗺️ Curated by Cafinder Team - Setiap cafe telah diverifikasi melalui berbagai sumber untuk memastikan akurasi informasi lokasi dan operasional.</p>
      </div>
    </div>
  );
};

export default RegionalExplorationPage;