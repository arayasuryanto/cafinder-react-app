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
      name: 'Araya Suryanto', 
      role: 'FOUNDER & CEO', 
      color: '#F05438', 
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Budi Santoso', 
      role: 'DEVELOPER', 
      color: '#8BC34A', 
      image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Sari Widiarti', 
      role: 'DESIGNER & RESEARCHER', 
      color: '#E91E63', 
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Ahmad Rahman', 
      role: 'PRODUCT MANAGER', 
      color: '#FF5722', 
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Lisa Chen', 
      role: 'MARKETING', 
      color: '#FFEB3B', 
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'David Kurniawan', 
      role: 'DEVELOPER', 
      color: '#FFC107', 
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Maya Putri', 
      role: 'GRAPHIC DESIGNER', 
      color: '#4CAF50', 
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Rian Pratama', 
      role: 'BUSINESS DEVELOPMENT', 
      color: '#2196F3', 
      image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Nina Sari', 
      role: 'CONTENT', 
      color: '#00BCD4', 
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    { 
      name: 'Alex Thompson', 
      role: 'TECHNICAL ADVISOR', 
      color: '#607D8B', 
      image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
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

  const stats = [
    { number: '100+', label: 'Kafe Partner', color: '#F05438' },
    { number: '50+', label: 'Tim Kreatif', color: '#2196F3' },
    { number: '1000+', label: 'Pengguna Aktif', color: '#4CAF50' },
    { number: '25+', label: 'Review Harian', color: '#E91E63' }
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
            karakteristik unik yang layak untuk dijelajahi.
          </p>
          <p>
            Misi kami adalah menghubungkan pecinta kopi dengan tempat-tempat istimewa 
            yang menawarkan lebih dari sekadar minuman - tetapi pengalaman yang 
            berkesan dan komunitas yang hangat.
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
              <div key={index} className="team-card">
                <div className="team-image">
                  {member.image ? (
                    <img src={member.image} alt={member.name} />
                  ) : (
                    <div className="placeholder-avatar" style={{ backgroundColor: member.color }}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p style={{ backgroundColor: member.color }}>{member.role}</p>
                </div>
              </div>
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

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item" style={{ color: stat.color }}>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Note */}
      <section className="founder-section">
        <div className="container">
          <div className="founder-content">
            <div className="founder-text">
              <h2>CATATAN DARI FOUNDER</h2>
              <p>
                "Cafinder lahir dari kecintaan saya terhadap budaya kafe dan keinginan 
                untuk berbagi pengalaman istimewa dengan sesama pecinta kopi. Setiap kafe 
                memiliki cerita uniknya sendiri, dan melalui platform ini, kami ingin 
                membantu Anda menemukan tempat yang tidak hanya menyajikan kopi berkualitas, 
                tetapi juga menciptakan momen-momen berharga."
              </p>
              <p>
                "Kami berkomitmen untuk terus berinovasi dan memberikan nilai terbaik 
                bagi komunitas kafe di Surabaya. Terima kasih telah menjadi bagian dari 
                perjalanan kami."
              </p>
              <div className="founder-signature">
                <div className="signature-badge">
                  <span>Founder</span>
                </div>
                <div className="founder-name">
                  <strong>Araya Suryanto</strong>
                  <span>CEO & Founder, Cafinder</span>
                </div>
              </div>
            </div>
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
                <strong>Sarah Michelle</strong>
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