import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import favoritesService from '../../services/favoritesService';
import './FavoriteButton.css';

const FavoriteButton = ({ cafe, size = 'medium', showLabel = false }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (user && cafe) {
      setIsFavorite(favoritesService.isFavorite(user.id, cafe.id));
    }
  }, [user, cafe]);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      // Show login prompt
      const event = new CustomEvent('showAuthModal');
      window.dispatchEvent(event);
      return;
    }

    setIsAnimating(true);
    const newFavoriteState = !isFavorite;
    
    if (newFavoriteState) {
      favoritesService.addFavorite(user.id, cafe);
      createHeartBurst(e.currentTarget);
    } else {
      favoritesService.removeFavorite(user.id, cafe.id);
    }

    setIsFavorite(newFavoriteState);
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  const createHeartBurst = (button) => {
    const rect = button.getBoundingClientRect();
    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-burst';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + rect.height / 2 + 'px';
        heart.style.setProperty('--random-x', (Math.random() - 0.5) * 100 + 'px');
        heart.style.setProperty('--random-y', -Math.random() * 100 - 50 + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
      }, i * 50);
    }
  };

  return (
    <button
      className={`favorite-btn ${size} ${isFavorite ? 'is-favorite' : ''} ${isAnimating ? 'animating' : ''}`}
      onClick={handleToggleFavorite}
      title={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
    >
      <svg 
        viewBox="0 0 24 24" 
        fill={isFavorite ? 'currentColor' : 'none'} 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
      {showLabel && (
        <span className="favorite-label">
          {isFavorite ? 'Favorit' : 'Favoritkan'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;