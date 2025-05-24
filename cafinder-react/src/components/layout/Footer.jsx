import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-col">
            <div className="footer-logo">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0Z" fill="#F05438"/>
                <path d="M28 14L20 22L18 20L25 12L28 14Z" fill="white"/>
                <path d="M14 15C15.6569 15 17 13.6569 17 12C17 10.3431 15.6569 9 14 9C12.3431 9 11 10.3431 11 12C11 13.6569 12.3431 15 14 15Z" fill="white"/>
                <path d="M25 29C27.2091 29 29 27.2091 29 25C29 22.7909 27.2091 21 25 21C22.7909 21 21 22.7909 21 25C21 27.2091 22.7909 29 25 29Z" fill="white"/>
              </svg>
              <span style={{ fontWeight: 700, fontSize: 24, marginLeft: 8, color: 'white' }}>Cafinder</span>
            </div>
            <p className="footer-desc">
              Discover insights and recommendations to enhance your cafe experience in Surabaya and beyond.
            </p>
          </div>
          
          <div className="footer-col">
            <h3 className="footer-heading">About</h3>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/catalog">Find Cafes</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3 className="footer-heading">Support</h3>
            <ul className="footer-links">
              <li><Link to="/support">Customer Support</Link></li>
              <li><Link to="/privacy">Privacy & Policy</Link></li>
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