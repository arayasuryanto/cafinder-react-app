import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-col">
            <div className="footer-logo">
              <img 
                src="/images/cafinder-logo.png" 
                alt="Cafinder Logo" 
                style={{ height: '40px', width: 'auto' }}
              />
            </div>
            <p className="footer-desc">Discover insights and recommendations to enhance your cafe experience in Surabaya and beyond.</p>
          </div>
          
          <div className="footer-col">
            <h3 className="footer-heading">Menu</h3>
            <ul className="footer-links">
              <li><a href="/cafemap">Cafe Map</a></li>
              <li><a href="/catalog">Katalog Cafe</a></li>
              <li><a href="/finder">Smart Finder</a></li>
              <li><a href="/about">Tentang Kami</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3 className="footer-heading">Support</h3>
            <ul className="footer-links">
              <li><a href="/support">Customer Support</a></li>
              <li><a href="/privacy">Privacy & Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3 className="footer-heading">Join Our Community</h3>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email..." />
              <button>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 20V4H20V20H4ZM12 13L20 8V6L12 11L4 6V8L12 13Z" fill="white"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>Made with ❤️ by Cafinder Teams</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;