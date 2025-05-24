import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0Z" fill="#F05438"/>
                <path d="M28 14L20 22L18 20L25 12L28 14Z" fill="white"/>
                <path d="M14 15C15.6569 15 17 13.6569 17 12C17 10.3431 15.6569 9 14 9C12.3431 9 11 10.3431 11 12C11 13.6569 12.3431 15 14 15Z" fill="white"/>
                <path d="M25 29C27.2091 29 29 27.2091 29 25C29 22.7909 27.2091 21 25 21C22.7909 21 21 22.7909 21 25C21 27.2091 22.7909 29 25 29Z" fill="white"/>
              </svg>
              <span style={{ fontWeight: 700, fontSize: 20, marginLeft: 8, color: '#F05438' }}>Cafinder</span>
            </Link>
          </div>
          
          <ul className="nav-links">
            <li>
              <NavLink to="/map">Cafe Map</NavLink>
            </li>
            <li>
              <NavLink to="/catalog">Katalog Cafe</NavLink>
            </li>
            <li>
              <NavLink to="/smart-finder">Smart Finder</NavLink>
            </li>
            <li>
              <NavLink to="/about">Tentang Kami</NavLink>
            </li>
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