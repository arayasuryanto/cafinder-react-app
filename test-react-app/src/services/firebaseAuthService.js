import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

class FirebaseAuthService {
  constructor() {
    // Set persistence to LOCAL (survives browser restarts)
    this.initializePersistence();
  }

  async initializePersistence() {
    try {
      await setPersistence(auth, browserLocalPersistence);
      console.log('Firebase persistence set to LOCAL');
    } catch (error) {
      console.error('Error setting persistence:', error);
    }
  }

  // Sign in with Google
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      console.log('Firebase: User signed in:', user);
      
      // Return formatted user data
      return {
        id: user.uid,
        email: user.email,
        name: user.displayName,
        picture: user.photoURL,
        given_name: user.displayName?.split(' ')[0] || '',
        family_name: user.displayName?.split(' ').slice(1).join(' ') || '',
        verified_email: user.emailVerified
      };
    } catch (error) {
      console.error('Firebase sign in error:', error);
      throw error;
    }
  }

  // Sign out
  async signOut() {
    try {
      await signOut(auth);
      console.log('Firebase: User signed out');
    } catch (error) {
      console.error('Firebase sign out error:', error);
      throw error;
    }
  }

  // Get current user
  getCurrentUser() {
    const user = auth.currentUser;
    if (!user) return null;

    return {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      picture: user.photoURL,
      given_name: user.displayName?.split(' ')[0] || '',
      family_name: user.displayName?.split(' ').slice(1).join(' ') || '',
      verified_email: user.emailVerified
    };
  }

  // Listen to auth state changes
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          picture: firebaseUser.photoURL,
          given_name: firebaseUser.displayName?.split(' ')[0] || '',
          family_name: firebaseUser.displayName?.split(' ').slice(1).join(' ') || '',
          verified_email: firebaseUser.emailVerified
        };
        callback(user);
      } else {
        callback(null);
      }
    });
  }

  // Check if authenticated
  isAuthenticated() {
    return !!auth.currentUser;
  }
}

export default new FirebaseAuthService();