import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    // Check if user is already signed in
    const savedUser = authService.getCurrentUser();
    if (savedUser) {
      console.log('Restored user from localStorage:', savedUser);
      setUser(savedUser);
    }
    setLoading(false);

    // Monitor Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        console.log('Firebase user signed in:', firebaseUser.uid);
        console.log('Firebase user email:', firebaseUser.email);
      } else {
        console.log('Firebase user signed out');
      }
    });

    // Set up auth service callbacks
    authService.onSignInSuccess = (userInfo) => {
      console.log('AuthContext: User signed in:', userInfo);
      // Make sure we're setting the same data that was saved
      const savedUser = authService.getCurrentUser();
      console.log('AuthContext: Saved user from storage:', savedUser);
      setUser(savedUser || userInfo);
      setAuthModalOpen(false);
    };

    authService.onSignInError = (error) => {
      console.error('Authentication error:', error);
      // You can add toast notification here
    };

    authService.onSignOutSuccess = () => {
      setUser(null);
    };

    // Listen for auth modal trigger
    const handleShowAuthModal = () => {
      setAuthModalOpen(true);
    };

    window.addEventListener('showAuthModal', handleShowAuthModal);
    
    return () => {
      window.removeEventListener('showAuthModal', handleShowAuthModal);
      unsubscribe(); // Clean up Firebase auth listener
    };
  }, []);

  const signIn = async () => {
    try {
      await authService.signInWithGoogle();
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  const signOut = () => {
    authService.signOut();
  };

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const value = {
    user,
    loading,
    authModalOpen,
    signIn,
    signOut,
    openAuthModal,
    closeAuthModal,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};