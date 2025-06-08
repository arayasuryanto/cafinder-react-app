import React from 'react';

const Header = () => {
  return (
    <>
      {/* Desktop Header */}
      <header className="desktop-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <a href="/">
                <img 
                  src="/images/cafinder-logo.png" 
                  alt="Cafinder Logo" 
                  style={{ height: '40px', width: 'auto' }}
                />
              </a>
            </div>
            
            <ul className="nav-links">
              <li><a href="/map">Cafe Map</a></li>
              <li><a href="/catalog">Katalog Cafe</a></li>
              <li><a href="/finder">Smart Finder</a></li>
              <li><a href="/tentang-kami">Tentang Kami</a></li>
            </ul>
            
            <div className="auth-btns">
              <button className="login-btn">Login</button>
              <button className="signup-btn">Sign Up</button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="container">
          <div className="mobile-header-content">
            <div className="mobile-logo">
              <a href="/">
                <img 
                  src="/images/cafinder-logo.png" 
                  alt="Cafinder Logo" 
                  style={{ height: '28px', width: 'auto' }}
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <a href="/map" className="nav-item">
          <div className="nav-icon">🗺️</div>
          <span className="nav-label">Cafe Map</span>
        </a>
        <a href="/catalog" className="nav-item">
          <div className="nav-icon">☕</div>
          <span className="nav-label">Katalog</span>
        </a>
        <a href="/finder" className="nav-item">
          <div className="nav-icon">🤖</div>
          <span className="nav-label">Smart Finder</span>
        </a>
        <a href="/tentang-kami" className="nav-item">
          <div className="nav-icon">👥</div>
          <span className="nav-label">Tentang Kami</span>
        </a>
      </nav>
    </>
  );
};

export default Header;