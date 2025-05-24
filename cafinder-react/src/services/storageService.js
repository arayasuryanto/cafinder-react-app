// Local storage keys
const STORAGE_KEYS = {
  SAVED_CAFES: 'savedCafes',
  USER_SETTINGS: 'userSettings',
  LAST_SEARCH: 'lastSearch',
  RECENT_VIEWS: 'recentViews'
};

// Save item to localStorage
export const setItem = (key, value) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`);
    return false;
  }
};

// Get item from localStorage
export const getItem = (key, defaultValue = null) => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error(`Error getting from localStorage: ${error}`);
    return defaultValue;
  }
};

// Remove item from localStorage
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage: ${error}`);
    return false;
  }
};

// Clear all localStorage
export const clear = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`);
    return false;
  }
};

// Saved cafes
export const getSavedCafes = () => {
  return getItem(STORAGE_KEYS.SAVED_CAFES, []);
};

export const saveCafe = (cafe) => {
  const savedCafes = getSavedCafes();
  
  // Check if cafe is already saved
  if (savedCafes.some(savedCafe => savedCafe.id === cafe.id)) {
    return false;
  }
  
  // Save minimal cafe data
  const cafeToSave = {
    id: cafe.id,
    name: cafe.name,
    imageUrl: cafe.imageUrl,
    rating: cafe.rating,
    neighborhood: cafe.neighborhood
  };
  
  return setItem(STORAGE_KEYS.SAVED_CAFES, [...savedCafes, cafeToSave]);
};

export const removeSavedCafe = (cafeId) => {
  const savedCafes = getSavedCafes();
  const updatedCafes = savedCafes.filter(cafe => cafe.id !== cafeId);
  
  return setItem(STORAGE_KEYS.SAVED_CAFES, updatedCafes);
};

export const isCafeSaved = (cafeId) => {
  const savedCafes = getSavedCafes();
  return savedCafes.some(cafe => cafe.id === cafeId);
};

// User settings
export const getUserSettings = () => {
  return getItem(STORAGE_KEYS.USER_SETTINGS, {
    darkMode: false,
    mapStyle: 'streets-v11',
    language: 'en'
  });
};

export const updateUserSettings = (settings) => {
  const currentSettings = getUserSettings();
  return setItem(STORAGE_KEYS.USER_SETTINGS, { ...currentSettings, ...settings });
};

// Search history
export const saveLastSearch = (searchData) => {
  return setItem(STORAGE_KEYS.LAST_SEARCH, searchData);
};

export const getLastSearch = () => {
  return getItem(STORAGE_KEYS.LAST_SEARCH, {
    term: '',
    type: 'name',
    filters: {}
  });
};

// Recent views
export const addRecentView = (cafeId) => {
  const recentViews = getItem(STORAGE_KEYS.RECENT_VIEWS, []);
  
  // Remove if already exists
  const updatedViews = recentViews.filter(id => id !== cafeId);
  
  // Add to beginning
  updatedViews.unshift(cafeId);
  
  // Keep only last 10
  const limitedViews = updatedViews.slice(0, 10);
  
  return setItem(STORAGE_KEYS.RECENT_VIEWS, limitedViews);
};

export const getRecentViews = (limit = 10) => {
  const recentViews = getItem(STORAGE_KEYS.RECENT_VIEWS, []);
  return recentViews.slice(0, limit);
};

export default {
  setItem,
  getItem,
  removeItem,
  clear,
  getSavedCafes,
  saveCafe,
  removeSavedCafe,
  isCafeSaved,
  getUserSettings,
  updateUserSettings,
  saveLastSearch,
  getLastSearch,
  addRecentView,
  getRecentViews
};