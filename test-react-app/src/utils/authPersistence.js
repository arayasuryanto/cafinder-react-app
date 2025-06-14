// Utility for managing auth persistence with better error handling

const AUTH_STORAGE_KEY = 'cafinder_user';

export const authPersistence = {
  // Save user data to localStorage
  saveUser: (userData) => {
    try {
      if (!userData) {
        console.error('No user data to save');
        return false;
      }
      
      const dataToStore = {
        ...userData,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(dataToStore));
      console.log('User data persisted:', dataToStore);
      return true;
    } catch (error) {
      console.error('Failed to save user data:', error);
      return false;
    }
  },

  // Get user data from localStorage
  getUser: () => {
    try {
      const storedData = localStorage.getItem(AUTH_STORAGE_KEY);
      
      if (!storedData) {
        console.log('No stored user data found');
        return null;
      }
      
      const userData = JSON.parse(storedData);
      
      // Check if data is not too old (optional - 7 days expiry)
      const storedTime = new Date(userData.timestamp);
      const now = new Date();
      const daysDiff = (now - storedTime) / (1000 * 60 * 60 * 24);
      
      if (daysDiff > 7) {
        console.log('Stored user data expired');
        authPersistence.removeUser();
        return null;
      }
      
      console.log('Retrieved user data:', userData);
      return userData;
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
      return null;
    }
  },

  // Remove user data from localStorage
  removeUser: () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      console.log('User data removed from storage');
      return true;
    } catch (error) {
      console.error('Failed to remove user data:', error);
      return false;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return authPersistence.getUser() !== null;
  }
};

export default authPersistence;