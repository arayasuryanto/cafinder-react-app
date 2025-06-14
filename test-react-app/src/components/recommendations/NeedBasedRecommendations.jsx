import React, { useState } from 'react';
import './NeedBasedRecommendations.css';

const NeedBasedRecommendations = () => {
  const [selectedCategory, setSelectedCategory] = useState('wifi-kencang');

  const categories = {
    'wifi-kencang': {
      title: 'WiFi Kencang',
      icon: '📶',
      description: 'Kafe dengan internet cepat dan stabil untuk work from cafe',
      cafes: [
        {
          name: 'Monopole Coffee Lab',
          address: 'Jl. Raya Darmo Permai I/38, Dukuh Pakis',
          hours: '9:00 - 22:00',
          price: 'Rp 20.000 - 50.000',
          highlights: ['WiFi super kencang', 'Banyak colokan', 'Specialty coffee lab']
        },
        {
          name: 'Historica Cafe & Pastry',
          address: 'Jl. Sumatera No.40, Gubeng',
          hours: '9:00 - 22:00',
          price: 'Rp 30.000 - 50.000',
          highlights: ['WiFi super cepat', 'Colokan di setiap meja', 'Interior kolonial'],
        },
        {
          name: 'The Origin Coffee',
          address: 'Jl. Raya Jemursari No.71, Wonocolo',
          hours: '9:00 - 24:00',
          price: 'Rp 20.000 - 50.000',
          highlights: ['WiFi kencang', 'Interior minimalis', 'Area AC & semi-outdoor'],
        }
      ]
    },
    'aesthetic': {
      title: 'Aesthetic',
      icon: '📸',
      description: 'Kafe dengan interior instagramable dan spot foto menarik',
      cafes: [
        {
          name: 'One Pose Cafe',
          address: 'Jl. Puncak Permai III No.23A, Sukomanunggal',
          hours: '10:00 - 21:00',
          price: 'Rp 30.000 - 80.000',
          highlights: ['Tema shabby chic', 'Warna pink & pastel', 'Dekorasi teddy bear'],
        },
        {
          name: 'Palacio Sky Cafe',
          address: 'Jl. Nginden Semolo, Sukolilo',
          hours: '11:00 - 23:00',
          price: 'Moderate',
          highlights: ['Rooftop view', 'Tema rustic modern', 'Pemandangan kota'],
        },
        {
          name: 'Le Café Gourmand',
          address: 'Jl. Mayjen Yono Suwoyo, Wiyung',
          hours: '11:00 - 21:30',
          price: 'Rp 45.000+',
          highlights: ['Tema Perancis', 'Interior elegan', 'Dessert unik'],
        }
      ]
    },
    'outdoor-area': {
      title: 'Outdoor Area',
      icon: '🌿',
      description: 'Kafe dengan area outdoor terbaik dan suasana alam',
      cafes: [
        {
          name: 'Tropikal Coffee',
          address: 'Jl. Keputih Tegal Timur No.20, Sukolilo',
          hours: '9:00 - 24:00',
          price: 'Rp 12.000 - 20.000',
          highlights: ['Tema Bali tropis', 'Furniture bambu', 'Aroma terapi'],
        },
        {
          name: "De'Oak Garden Cafe",
          address: 'Jl. Ngagel No.209, Wonokromo',
          hours: '12:00 - 22:00',
          price: 'Rp 30.000 - 78.000',
          highlights: ['Setting taman', 'Live music', 'Meja dari pohon oak'],
        },
        {
          name: 'Garden Cafe XXI',
          address: 'Ciputra World Mall, Level 4',
          hours: '11:00 - 21:00',
          price: 'Under Rp 100.000',
          highlights: ['Rooftop cafe', 'Pemandangan kota', 'Dekat bioskop'],
        }
      ]
    },
    'work-from-cafe': {
      title: 'Work From Cafe',
      icon: '💻',
      description: 'Kafe ideal untuk bekerja dengan fasilitas lengkap',
      cafes: [
        {
          name: 'Noach Cafe and Bistro',
          address: 'Jl. Pregolan No.4, Tegalsari',
          hours: '11:00 - 24:00',
          price: 'Moderate - Upscale',
          highlights: ['Ruang VIP', 'Banyak colokan', 'Area bird cage privat'],
        },
        {
          name: 'Kudos Cafe',
          address: 'Pakuwon Square AK 2 No.3, Lakarsantri',
          hours: '8:00 - 22:00',
          price: 'Rp 100.000+',
          highlights: ['Atmosfer tenang', 'WiFi stabil', 'Jam operasional panjang'],
        },
        {
          name: 'Visma Coworking & Cafe',
          address: 'Jl. Tegalsari No.35',
          hours: 'Sen-Sab 8:00 - 20:00',
          price: 'Rp 35.000 (4 jam)',
          highlights: ['Coworking space', 'Galeri seni', 'Event space'],
        }
      ]
    },
    'pet-friendly': {
      title: 'Pet Friendly',
      icon: '🐕',
      description: 'Kafe yang ramah hewan peliharaan',
      cafes: [
        {
          name: 'Pawvilion Dog Cafe',
          address: 'Jl. Telaga Utama No. 21, Citraland',
          hours: 'Sel-Min 9:00 - 20:00',
          price: 'Min. order Rp 30.000-50.000',
          highlights: ['10 anjing ramah', 'Dog playground', 'Pet grooming'],
        },
        {
          name: 'Breeze Bean Coffee',
          address: 'Jl. Pandegiling No. 63, Tegalsari',
          hours: '7:00 - 22:00',
          price: 'Rp 30.000 - 60.000',
          highlights: ['Pet allowed indoor & outdoor', 'Desain dua lantai', 'Minimalis modern'],
        },
        {
          name: "La'Pet Land",
          address: 'Jl. Telaga Utama Road No.25, Citraland',
          hours: '8:00 - 20:00',
          price: 'Varies',
          highlights: ['Dog paradise', 'Indoor playground', 'Complete pet services'],
        }
      ]
    },
    'hidden-gems': {
      title: 'Hidden Gems',
      icon: '💎',
      description: 'Kafe tersembunyi dengan charm unik',
      cafes: [
        {
          name: 'Omah Rakjat',
          address: 'Jl. Gayung Kebonsari VIII No.38',
          hours: '10:00 - 23:00',
          price: 'Rp 6.000 - 13.000',
          highlights: ['Rumah kayu tradisional', 'Koleksi buku', 'Interior Jawa'],
        },
        {
          name: 'Moeng Kopi (JiwARTspace)',
          address: 'Jl. Medokan Ayu Blok MA III D-35',
          hours: 'Sen-Jum 15:00-22:00, Sab 8:00-22:00',
          price: 'Moderate',
          highlights: ['Vine-covered entrance', 'Art gallery', 'VIP meeting rooms'],
        },
        {
          name: 'Rahasia Space & Eatery',
          address: 'Perumahan YKP I, Jl. Pandugo Timur I',
          hours: '13:00 - 21:00',
          price: 'Rp 15.000 - 37.000',
          highlights: ['Herbal tea specialist', 'Secret menu', 'Vintage-tropical decor'],
        }
      ]
    },
    'perfect-date': {
      title: 'Perfect for Date',
      icon: '💕',
      description: 'Kafe romantis untuk kencan spesial',
      cafes: [
        {
          name: 'Citilites Skyclub & Bistro',
          address: 'Hotel Java Paragon Lt. 21',
          hours: 'Varies',
          price: 'Premium',
          highlights: ['Panoramic city view', 'Candlelight dining', 'Sunset view'],
        },
        {
          name: 'de Soematra 1910',
          address: 'Jl. Sumatera No.75',
          hours: 'Reservation only',
          price: 'Fine dining',
          highlights: ['Colonial mansion 1910', 'Private dining rooms', 'Live pianist'],
        },
        {
          name: 'Sky 36 Restaurant',
          address: 'Apartemen Sumatra 36',
          hours: 'Dinner hours',
          price: 'Premium',
          highlights: ['Rooftop dining', 'Premium cuisine', 'City overlook'],
        }
      ]
    },
    'buka-24-jam': {
      title: 'Buka 24 Jam',
      icon: '🌙',
      description: 'Kafe yang buka 24 jam non-stop',
      cafes: [
        {
          name: 'Kedai Ciamso',
          address: 'Jl. Taman Apsari No. 25A & Jl. Bukit Lontar',
          hours: '24 jam',
          price: 'Rp 15.000 - 40.000',
          highlights: ['Tema Cina', 'Makanan halal', 'Multiple cabang'],
        },
        {
          name: 'Jokopi GWalk',
          address: 'Jl. Niaga Gapura No. 9, Lakarsantri',
          hours: '24 jam',
          price: 'Rp 25.000 - 50.000',
          highlights: ['Desain industrial', 'Area indoor & outdoor', 'Dekat G-Walk'],
        },
        {
          name: 'Kollabora',
          address: 'Jl. Raya Kupang Indah No. 51',
          hours: '24 jam',
          price: 'Rp 100.000 - 200.000',
          highlights: ['Best Thematic Cafe', 'White forest theme', 'VIP rooms'],
        }
      ]
    },
    'instagramable': {
      title: 'Most Instagramable',
      icon: '📷',
      description: 'Kafe paling instagramable di Surabaya',
      cafes: [
        {
          name: 'Palacio Sky Cafe',
          address: 'Jl. Nginden Semolo No.42',
          hours: '11:00 - 23:00',
          price: 'Moderate',
          highlights: ['Triangular glass chapel', '3-story building', '1000 visitor capacity'],
        },
        {
          name: 'JJ Lake Cafe & Eatery',
          address: 'Bukit Telaga Golf Blok FG No.16',
          hours: '10:00 - 22:00',
          price: 'From Rp 18.000',
          highlights: ['Lotus-filled lake', 'Macaws & Hornbills', 'Natural beauty'],
        },
        {
          name: 'TBRK (Tepi Barat Rumah Kopi)',
          address: 'Jl. Ngagel Jaya Utara No.15',
          hours: 'Daily',
          price: 'Moderate',
          highlights: ['Bali aesthetic', 'White interior', 'Tropical plants'],
        }
      ]
    }
  };

  return (
    <div className="need-based-recommendations">
      <div className="recommendations-header">
        <h1>Cari Cafe Sesuai Kebutuhanmu</h1>
        <p>Rekomendasi kafe terbaik di Surabaya berdasarkan kebutuhan spesifikmu</p>
      </div>

      <div className="category-selector">
        {Object.entries(categories).map(([key, category]) => (
          <div
            key={key}
            className={`category-card ${selectedCategory === key ? 'active' : ''}`}
            onClick={() => setSelectedCategory(key)}
          >
            <div className="category-icon">{category.icon}</div>
            <div className="category-name">{category.title}</div>
          </div>
        ))}
      </div>

      <div className="selected-category-section">
        <div className="section-header">
          <h2>
            <span className="section-icon">{categories[selectedCategory].icon}</span>
            {categories[selectedCategory].title}
          </h2>
          <p>{categories[selectedCategory].description}</p>
        </div>

        <div className="cafes-grid">
          {categories[selectedCategory].cafes.map((cafe, index) => (
            <div key={index} className="cafe-recommendation-card">
              <div className="cafe-header-design">
                <div className="cafe-category-icon">
                  {categories[selectedCategory].icon}
                </div>
                <div className="cafe-price-badge">{cafe.price}</div>
              </div>
              
              <div className="cafe-content">
                <h3>{cafe.name}</h3>
                <p className="cafe-address">📍 {cafe.address}</p>
                <p className="cafe-hours">🕐 {cafe.hours}</p>
                
                <div className="cafe-highlights">
                  {cafe.highlights.map((highlight, idx) => (
                    <span key={idx} className="highlight-tag">{highlight}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="curated-note">
        <p>✨ Curated by Cafinder Team berdasarkan riset mendalam dari berbagai sumber termasuk Google Reviews, media sosial, dan kunjungan langsung.</p>
      </div>
    </div>
  );
};

export default NeedBasedRecommendations;