/**
 * This file imports the cleaned_surabaya_cafes.json data
 * We're importing just a reference to the file path to avoid loading the entire dataset at once
 */

// Export the path to the JSON file for use in fetch operations
export const cleanedCafesJsonPath = '/cleaned_surabaya_cafes.json';

/**
 * Function to fetch ALL cafes data from the JSON file
 * @returns {Promise<Array>} - Promise that resolves to array of all cafe data
 */
export const fetchAllCafesData = async () => {
  try {
    const response = await fetch(cleanedCafesJsonPath);
    if (!response.ok) {
      throw new Error('Failed to fetch cafes data');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all cafes data:', error);
    return [];
  }
};

/**
 * Function to fetch cafes data from the JSON file with pagination
 * @param {number} limit - Optional limit of cafes to fetch (default: 20)
 * @param {number} offset - Optional offset for pagination (default: 0)
 * @returns {Promise<Array>} - Promise that resolves to array of cafe data
 */
export const fetchCleanedCafesData = async (limit = 20, offset = 0) => {
  try {
    const response = await fetch(cleanedCafesJsonPath);
    if (!response.ok) {
      throw new Error('Failed to fetch cafes data');
    }
    
    const data = await response.json();
    return data.slice(offset, offset + limit);
  } catch (error) {
    console.error('Error fetching cafes data:', error);
    return [];
  }
};

/**
 * Fetch a single cafe by ID from the cleaned_surabaya_cafes.json file
 * @param {string} id - The cafe ID to look for
 * @returns {Promise<Object|null>} - Promise that resolves to cafe data or null if not found
 */
export const fetchCafeById = async (id) => {
  try {
    const response = await fetch(cleanedCafesJsonPath);
    if (!response.ok) {
      throw new Error('Failed to fetch cafes data');
    }
    
    const data = await response.json();
    return data.find(cafe => cafe.id === id) || null;
  } catch (error) {
    console.error('Error fetching cafe by ID:', error);
    return null;
  }
};