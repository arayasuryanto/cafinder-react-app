import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CuratedCollections = () => {
  const sectionRef = useRef(null);
  const [activeCollection, setActiveCollection] = useState(0);

  const collections = [
    {
      id: 'instagramable',
      title: 'Most Instagramable',
      icon: '📸',
      description: 'Spot foto terbaik untuk feed Instagram aesthetic',
      count: 28,
      color: '#E11D48',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600'
    },
    {
      id: 'work-friendly',
      title: 'Work Friendly',
      icon: '💻',
      description: 'WiFi kencang, colokan banyak, suasana tenang',
      count: 45,
      color: '#3B82F6',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600'
    },
    {
      id: 'hidden-gems',
      title: 'Hidden Gems',
      icon: '💎',
      description: 'Cafe tersembunyi yang wajib kamu coba',
      count: 18,
      color: '#8B5CF6',
      image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600'
    },
    {
      id: 'date-night',
      title: 'Perfect for Date',
      icon: '💕',
      description: 'Suasana romantis untuk quality time berdua',
      count: 22,
      color: '#EC4899',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section entrance
      gsap.fromTo('.collections-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.curated-collections',
            start: 'top 80%'
          }
        }
      );

      // Animate collection cards
      gsap.fromTo('.collection-card',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.collections-grid',
            start: 'top 80%'
          }
        }
      );

      // Auto-rotate collections
      const interval = setInterval(() => {
        setActiveCollection((prev) => (prev + 1) % collections.length);
      }, 4000);

      return () => clearInterval(interval);
    }, sectionRef);

    return () => ctx.revert();
  }, [collections.length]);

  return (
    <section className="curated-collections" ref={sectionRef}>
      <div className="container">
        <div className="collections-header">
          <h2 className="section-title">
            Koleksi <span className="highlight">Kurasi Spesial</span>
          </h2>
          <p className="section-subtitle">
            Cafe pilihan yang sudah kami kategorikan khusus untukmu
          </p>
        </div>

        <div className="collections-content">
          <div className="collections-grid">
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className={`collection-card ${activeCollection === index ? 'active' : ''}`}
                onClick={() => setActiveCollection(index)}
                style={{ '--collection-color': collection.color }}
              >
                <div className="card-header">
                  <span className="collection-icon">{collection.icon}</span>
                  <span className="collection-count">{collection.count} cafe</span>
                </div>
                <h3 className="collection-title">{collection.title}</h3>
                <p className="collection-description">{collection.description}</p>
                <a href={`/catalog?collection=${collection.id}`} className="explore-link">
                  Explore →
                </a>
              </div>
            ))}
          </div>

          <div className="collection-preview">
            <div className="preview-image">
              <img 
                src={collections[activeCollection].image} 
                alt={collections[activeCollection].title}
              />
              <div className="preview-overlay">
                <h3>{collections[activeCollection].title}</h3>
                <a 
                  href={`/catalog?collection=${collections[activeCollection].id}`} 
                  className="preview-cta"
                >
                  Lihat Koleksi Lengkap
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Collection Tags */}
        <div className="collection-tags">
          <span className="tag-label">Trending tags:</span>
          <div className="tags-list">
            <a href="/catalog?tag=rooftop" className="tag">#rooftop</a>
            <a href="/catalog?tag=pet-friendly" className="tag">#petfriendly</a>
            <a href="/catalog?tag=live-music" className="tag">#livemusic</a>
            <a href="/catalog?tag=24-hours" className="tag">#24hours</a>
            <a href="/catalog?tag=outdoor" className="tag">#outdoor</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratedCollections;