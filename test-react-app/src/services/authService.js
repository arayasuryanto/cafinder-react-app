class AuthService {
  constructor() {
    this.isGoogleLoaded = false;
    this.loadGoogleScript();
  }

  async loadGoogleScript() {
    return new Promise((resolve, reject) => {
      if (this.isGoogleLoaded) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        this.isGoogleLoaded = true;
        resolve();
      };
      
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async initializeGoogleAuth() {
    await this.loadGoogleScript();
    
    if (!window.google) {
      throw new Error('Google API failed to load');
    }

    return new Promise((resolve) => {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || 'your_google_client_id_here',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      resolve();
    });
  }

  handleCredentialResponse(response) {
    try {
      const userInfo = this.parseJWT(response.credential);
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
      await this.initializeGoogleAuth();
      
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback to popup if prompt is not shown
          this.showGooglePopup();
        }
      });
    } catch (error) {
      console.error('Google Sign-In error:', error);
      this.onSignInError(error);
    }
  }

  showGooglePopup() {
    window.google.accounts.id.renderButton(
      document.createElement('div'),
      {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        click_listener: () => {
          window.google.accounts.id.prompt();
        }
      }
    );
    
    // Trigger the popup directly
    window.google.accounts.id.prompt();
  }

  signOut() {
    // Clear user data from local storage
    localStorage.removeItem('cafinder_user');
    
    // Sign out from Google
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
    
    if (this.onSignOutSuccess) {
      this.onSignOutSuccess();
    }
  }

  getCurrentUser() {
    const userData = localStorage.getItem('cafinder_user');
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated() {
    return !!this.getCurrentUser();
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
    
    localStorage.setItem('cafinder_user', JSON.stringify(userData));
    
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