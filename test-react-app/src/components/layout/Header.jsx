import React from 'react';

const Header = () => {
  return (
    <header>
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
            <li><a href="/about">Tentang Kami</a></li>
          </ul>
          
          <div className="auth-btns">
            <button className="login-btn">Login</button>
            <button className="signup-btn">Sign Up</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;