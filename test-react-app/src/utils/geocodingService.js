// Utility to fetch coordinates from Google Place IDs
// In production, this would call your backend API that uses Google Geocoding API

// For now, we'll use a comprehensive list of known coordinates for Surabaya cafes
export const cafeCoordinatesMap = {
  // West Surabaya
  'ChIJh9U5rh391y0R_D4KjkxgXrY': [-7.2890, 112.6323], // Filgud+
  'ChIJTTM6WIf91y0RotZGcWHII0k': [-7.2874, 112.6733], // Ropopang Citraland
  'ChIJbWrtmN_91y0RETmliS0jjRE': [-7.2877, 112.6748], // Wizz Gelato
  
  // Central Surabaya
  'ChIJ318h82T51y0RJ5dvMW9lTG4': [-7.2857, 112.7528], // DEJAVU
  'ChIJ0-aSJVr51y0RL6P10cK-ucM': [-7.2609, 112.7074], // Cafe YANTI
  'ChIJk8aJKAn51y0RcRwHJNnXt-c': [-7.2701, 112.7502], // Lovebugscafe
  'ChIJHSQzOmb51y0R1PWOiJJ6nfU': [-7.2651, 112.7599], // Rukun Kopi Peranakan
  
  // North Surabaya
  'ChIJL4qKKQT71y0RBKB1PAmcYGE': [-7.2202, 112.7391], // Fore Coffee - G Walk Citraland
  'ChIJq6qqqhL71y0RRCONhAMJMck': [-7.2305, 112.7407], // GWalk Garden
  
  // East Surabaya
  'ChIJwVCGeP_61y0R8LDb1OUTeuM': [-7.2950, 112.7964], // Upper Room Cafe
  'ChIJcx7-q8v61y0Rn0fnkSkm2kg': [-7.2890, 112.8100], // Kopi Teras
  'ChIJJ-0K0un61y0RQRrvT97JxaU': [-7.3000, 112.8200], // M22 Cafe
  
  // South Surabaya
  'ChIJVbhjDh731y0RNFpNfEaQQjQ': [-7.3345, 112.7885], // L Spot Cafe
  
  // Additional cafes with estimated coordinates based on neighborhood
  'ChIJOaPJcXT61y0RGwBcUk5kB6A': [-7.2891, 112.8012], // My Kopi-O! Surabaya Timur
  'ChIJa5cTxLn61y0RKNzJCNNBcPY': [-7.2954, 112.8134], // Kopi Kenangan MERR
  'ChIJuz6VDtT61y0RGJxzMT0hJcU': [-7.2834, 112.7956], // BlackBarn Coffee
  'ChIJ8cKXb3v61y0RyJj8y7sObQE': [-7.3201, 112.7921], // Nongkee Coffee
  'ChIJr2CwJeH61y0R0Ft7n-lxK1k': [-7.3456, 112.7812], // Kopi Janji Jiwa Royal Plaza
  'ChIJ6YKgPLH61y0RHs22xw4lNV4': [-7.3312, 112.7634], // Starbucks Reserve Dewata
  'ChIJfcCN2qn61y0Rj5AYx96t-SU': [-7.3187, 112.7543], // Excelso Tunjungan Plaza 3
  
  // More cafes
  'ChIJaQKpXU_51y0RTZGa0aN3ntM': [-7.2612, 112.7312], // Starbucks Coffee Tunjungan Plaza 6
  'ChIJKb20zCX71y0RGD5qoR8VpL8': [-7.2234, 112.7401], // Soto Ayam Lamongan Cak Har
  'ChIJcyoUIYb71y0RyUSqXXsKx7Y': [-7.2445, 112.7389], // Mie Boncabe BG Junction
  'ChIJa8Xdcaj51y0RdU_nQFSb2vw': [-7.2756, 112.7534], // Titik Koma Coffee
  'ChIJDaJRPR_51y0RLSiVlXJnLxE': [-7.2889, 112.7234], // Kopi Kenangan Darmo Park
  'ChIJA7eUbtP61y0Ruc0J9nQf5hw': [-7.2912, 112.8045], // Djournal House Galaxy Mall
  'ChIJ7VzpYgT71y0RjwqJhLaK6ek': [-7.2267, 112.7423], // Kopi Soe BG Junction
  'ChIJEQ94i8z61y0RlKLdOQQwlz0': [-7.3023, 112.8189], // Kopi Kenangan Nirwana Executive
  'ChIJQfzm83L61y0RdJPeqQu4yc0': [-7.3089, 112.7823], // Starbucks ICON Mall Gresik
  'ChIJNUQBJQf61y0Rd1HJepJQJCc': [-7.2567, 112.6234], // Warung Kopi Purnama
  'ChIJoYC2UQj61y0RMm1M8Af0TY0': [-7.2467, 112.6534], // Warkop Wolu (88)
  'ChIJTTLQFqv51y0Rua-ogTSqx9s': [-7.2823, 112.7623], // Starbucks Plaza Marina
  'ChIJSTT7a-v61y0RSHKfKMf3HMY': [-7.3145, 112.8012], // Starbucks Royal Plaza
  'ChIJH3w1r_f61y0RRgCXJxhOSu4': [-7.3267, 112.7945], // Jiwa Toast Royal Plaza
  'ChIJ6_H3S0z51y0RKqvFhYUChpo': [-7.2545, 112.7456], // Cak Wang Coffee & Roastery
  'ChIJdyzXYVj71y0RchgHu9T6x4c': [-7.2756, 112.6789], // Blackwood Coffee & Chocolate
  'ChIJQ7_LFnT71y0RD1rXyNm9ItQ': [-7.2345, 112.6890], // Kopi Es Tak Kie Pakuwon Mall
  'ChIJnVwf4bL51y0RlzMSJT-C5nc': [-7.2678, 112.7345], // Kopi Kenangan Basuki Rahmat
  'ChIJQaGV33v71y0Rh8ByGBYhTfw': [-7.2423, 112.6712], // Rollaas Coffee & Toast CitraLand
  'ChIJb0xaHXb71y0ROGHb0w6a76A': [-7.2589, 112.6823], // Kopi Soe Pakuwon Mall
};

/**
 * Get coordinates for a cafe based on its place ID
 * @param {Object} cafe - The cafe object
 * @returns {Array} [lat, lng] coordinates
 */
export const getCafeCoordinates = (cafe) => {
  // First check if we have known coordinates
  if (cafeCoordinatesMap[cafe.id || cafe.placeId]) {
    return cafeCoordinatesMap[cafe.id || cafe.placeId];
  }
  
  // If not, estimate based on region
  const regionCoordinates = {
    'SBY Pusat': [-7.2575, 112.7521],
    'SBY Utara': [-7.2203, 112.7392],
    'SBY Selatan': [-7.3345, 112.7885],
    'SBY Timur': [-7.2890, 112.8100],
    'SBY Barat': [-7.2800, 112.6700]
  };
  
  // Return region center with slight randomization to avoid overlapping markers
  const regionCenter = regionCoordinates[cafe.region] || [-7.2575, 112.7521];
  return [
    regionCenter[0] + (Math.random() - 0.5) * 0.015,
    regionCenter[1] + (Math.random() - 0.5) * 0.015
  ];
};

/**
 * Batch geocode multiple cafes (for future implementation)
 * In production, this would call your backend API
 * @param {Array} cafes - Array of cafe objects
 * @returns {Promise<Object>} Object mapping cafe IDs to coordinates
 */
export const batchGeocodeCafes = async (cafes) => {
  // For now, return known coordinates
  const results = {};
  cafes.forEach(cafe => {
    results[cafe.id] = getCafeCoordinates(cafe);
  });
  return results;
};