import authPersistence from '../utils/authPersistence';

class AuthService {
  constructor() {
    this.isGoogleLoaded = false;
    this.loadGoogleScript();
  }

  async loadGoogleScript() {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded from index.html
      if (window.google && window.google.accounts) {
        console.log('Google Identity Services already loaded');
        this.isGoogleLoaded = true;
        resolve();
        return;
      }

      if (this.isGoogleLoaded) {
        resolve();
        return;
      }

      // Wait for the script to load from index.html
      let attempts = 0;
      const checkInterval = setInterval(() => {
        attempts++;
        if (window.google && window.google.accounts) {
          console.log('Google Identity Services loaded');
          this.isGoogleLoaded = true;
          clearInterval(checkInterval);
          resolve();
        } else if (attempts > 20) { // 2 seconds timeout
          clearInterval(checkInterval);
          reject(new Error('Google Identity Services failed to load'));
        }
      }, 100);
    });
  }

  async initializeGoogleAuth() {
    await this.loadGoogleScript();
    
    if (!window.google) {
      throw new Error('Google API failed to load');
    }

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your_google_client_id_here';
    console.log('Initializing Google Auth with client ID:', clientId);

    return new Promise((resolve) => {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      resolve();
    });
  }

  handleCredentialResponse(response) {
    console.log('Google credential response received');
    try {
      const userInfo = this.parseJWT(response.credential);
      console.log('Parsed user info:', userInfo);
      this.onSignInSuccess(userInfo);
    } catch (error) {
      console.error('Failed to parse credential response:', error);
      this.onSignInError(error);
    }
  }

  parseJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  async signInWithGoogle() {
    try {
      console.log('Starting Google Sign-In process...');
      await this.initializeGoogleAuth();
      
      // Create a temporary button to trigger the sign-in
      const buttonDiv = document.createElement('div');
      buttonDiv.style.display = 'none';
      document.body.appendChild(buttonDiv);
      
      window.google.accounts.id.renderButton(
        buttonDiv,
        {
          theme: 'outline',
          size: 'large',
          type: 'standard',
        }
      );
      
      // Click the rendered button programmatically
      setTimeout(() => {
        const googleButton = buttonDiv.querySelector('div[role="button"]');
        if (googleButton) {
          console.log('Clicking Google button...');
          googleButton.click();
        } else {
          console.error('Google button not found in rendered div');
        }
        // Clean up
        setTimeout(() => {
          if (buttonDiv.parentNode) {
            document.body.removeChild(buttonDiv);
          }
        }, 100);
      }, 100);
      
    } catch (error) {
      console.error('Google Sign-In error:', error);
      alert('Failed to initialize Google Sign-In. Please check the console for errors.');
      this.onSignInError(error);
    }
  }

  signOut() {
    // Clear user data from local storage
    authPersistence.removeUser();
    
    // Sign out from Google
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    
    if (this.onSignOutSuccess) {
      this.onSignOutSuccess();
    }
  }

  getCurrentUser() {
    return authPersistence.getUser();
  }

  isAuthenticated() {
    return authPersistence.isAuthenticated();
  }

  // Callback methods to be set by the auth context
  onSignInSuccess(userInfo) {
    // Store user info
    const userData = {
      id: userInfo.sub,
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
      verified_email: userInfo.email_verified,
      given_name: userInfo.given_name,
      family_name: userInfo.family_name,
      signedInAt: new Date().toISOString()
    };
    
    // Use the persistence utility
    const saved = authPersistence.saveUser(userData);
    if (!saved) {
      console.error('Failed to persist user data');
    }
    
    // This will be overridden by AuthContext
    console.log('User signed in:', userData);
  }

  onSignInError(error) {
    // This will be overridden by AuthContext
    console.error('Sign in error:', error);
  }

  onSignOutSuccess() {
    // This will be overridden by AuthContext
    console.log('User signed out');
  }
}

// Export singleton instance
export default new AuthService();