import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TentangKamiPage.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const TentangKamiPage = () => {
  useEffect(() => {
    // Hero animations
    gsap.fromTo('.about-hero h1', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
    
    gsap.fromTo('.about-hero p', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power2.out' }
    );

    // Team cards animations
    gsap.fromTo('.team-card', 
      { opacity: 0, y: 50, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.team-grid',
          start: 'top 80%'
        }
      }
    );

    // Values animations
    gsap.fromTo('.value-card', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 80%'
        }
      }
    );

    // Stats animations
    gsap.fromTo('.stat-item', 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 80%'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const teamMembers = [
    { 
      name: 'Araya', 
      role: 'PROJECT LEAD & BUILDER', 
      color: '#F05438', 
      image: '/images/team-araya.jpeg',
      instagram: 'http://instagram.com/arayasuryanto/'
    },
    { 
      name: 'Gega', 
      role: 'SPRINT & DOC LEAD', 
      color: '#8BC34A', 
      image: '/images/team-gega.jpeg',
      instagram: 'http://instagram.com/gegadafaa'
    },
    { 
      name: 'Haydar', 
      role: 'SPRINT & DOC SUPPORT', 
      color: '#E91E63', 
      image: '/images/team-haydar.jpeg',
      instagram: 'https://www.instagram.com/haydarthoriq28_/'
    },
    { 
      name: 'Semmi', 
      role: 'ADMIN, PR, & COST LEAD', 
      color: '#FF5722', 
      image: '/images/team-semmi.jpeg',
      instagram: 'https://www.instagram.com/semmi.23/'
    },
    { 
      name: 'Sutan', 
      role: 'ADMIN, PR, & COST SUPPORT', 
      color: '#FFC107', 
      image: '/images/team-Sutan.jpeg',
      instagram: 'https://www.instagram.com/_sutanbatara/'
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'VISI KAMI',
      description: 'Menjadi platform utama untuk menemukan dan menikmati pengalaman kafe terbaik di Surabaya.'
    },
    {
      icon: '💡',
      title: 'INOVASI & KREATIVITAS',
      description: 'Selalu berinovasi dengan teknologi terdepan untuk memberikan pengalaman pengguna yang luar biasa.'
    },
    {
      icon: '✨',
      title: 'KUALITAS LAYANAN',
      description: 'Berkomitmen memberikan informasi akurat dan layanan berkualitas tinggi kepada setiap pengguna.'
    },
    {
      icon: '🤝',
      title: 'KOLABORASI',
      description: 'Bekerja sama dengan pemilik kafe lokal untuk membangun ekosistem yang saling menguntungkan.'
    },
    {
      icon: '❤️',
      title: 'PASSION',
      description: 'Didorong oleh kecintaan terhadap budaya kafe dan keinginan berbagi pengalaman terbaik.'
    },
    {
      icon: '🚀',
      title: 'PERTUMBUHAN',
      description: 'Terus berkembang untuk memberikan nilai lebih bagi komunitas pecinta kafe di Indonesia.'
    }
  ];


  return (
    <div className="tentang-kami-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>TENTANG KAMI</h1>
          <p>
            Selamat datang di Cafinder, platform inovatif yang didedikasikan untuk 
            membantu Anda menemukan pengalaman kafe terbaik di Surabaya. Kami percaya 
            bahwa setiap cangkir kopi memiliki cerita, dan setiap kafe memiliki 
            karakteristik unik yang layak untuk dijelajahi. Misi kami adalah menghubungkan 
            pecinta kopi dengan tempat-tempat istimewa yang menawarkan lebih dari sekadar 
            minuman - tetapi pengalaman yang berkesan dan komunitas yang hangat.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>BERTEMU DENGAN TIM KAMI</h2>
          <p className="team-description">
            Tim kreatif dan berpengalaman yang berdedikasi untuk menghadirkan 
            pengalaman terbaik dalam menemukan kafe impian Anda.
          </p>
          
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <a 
                key={index} 
                href={member.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="team-card" 
                style={{ backgroundColor: member.color }}
              >
                <div className="team-name-vertical">
                  {member.name.toUpperCase()}
                </div>
                <div className="team-role-badge">
                  {member.role}
                </div>
                <div className="team-image">
                  {member.image ? (
                    <img src={member.image} alt={member.name} />
                  ) : (
                    <div className="placeholder-avatar">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>TIM YANG DIDASARKAN PADA NILAI-NILAI BAIK</h2>
          <p className="values-description">
            Kami membangun Cafinder dengan nilai-nilai yang kuat, berkomitmen untuk 
            memberikan yang terbaik bagi komunitas pecinta kafe dan mitra-mitra kami.
          </p>
          
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="container">
          <div className="testimonial-content">
            <blockquote>
              "Bekerja dengan tim Cafinder telah menjadi pengalaman yang luar biasa. 
              Tim mereka memadukan kreativitas dengan keahlian teknis, menghadirkan 
              platform yang visual menarik dan user-friendly yang sempurna 
              merepresentasikan visi kami. Profesionalisme, responsivitas, dan 
              perhatian terhadap detail membuat kolaborasi ini sangat menyenangkan. 
              Saya sangat merekomendasikan Cafinder untuk siapa saja yang mencari 
              pengalaman kafe terbaik di Surabaya."
            </blockquote>
            <div className="testimonial-author">
              <div className="author-info">
                <strong>Niko Airlangga</strong>
                <span>Pemilik Kafe Artisan, Surabaya</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TentangKamiPage;