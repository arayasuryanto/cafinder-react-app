// This service would normally interact with an API
// For now, we'll simulate data interactions using the JSON file

// Import the cafe data (in a real app, we'd fetch this from an API)
// Since we don't have direct access to import the JSON file in this sandbox,
// we'll need to manually copy the JSON structure here

const cafesData = [
  {
    "id": "ChIJh9U5rh391y0R_D4KjkxgXrY",
    "name": "Filgud+",
    "address": "Jl. Raya Lidah Wetan, Lidah Wetan, Kec. Lakarsantri, Surabaya, Jawa Timur 60213, Indonesia",
    "rating": "4.4",
    "reviewCount": 328,
    "placeId": "ChIJh9U5rh391y0R_D4KjkxgXrY",
    "google_maps_direction": "https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJh9U5rh391y0R_D4KjkxgXrY",
    "categories": ["Cafe"],
    "phone": null,
    "website": null,
    "openingHours": [
      {"day": "Monday", "hours": "12 to 11:30 PM"},
      {"day": "Tuesday", "hours": "12 to 11:30 PM"},
      {"day": "Wednesday", "hours": "12 to 11:30 PM"},
      {"day": "Thursday", "hours": "12 to 11:30 PM"},
      {"day": "Friday", "hours": "12 to 11:30 PM"},
      {"day": "Saturday", "hours": "12 to 11:30 PM"},
      {"day": "Sunday", "hours": "12 to 11:30 PM"}
    ],
    "neighborhood": "Lidah Wetan, Lakarsantri",
    "city": "Surabaya",
    "description": null,
    "imageUrl": "https://lh5.googleusercontent.com/p/AF1QipPv4upXMdP5dVBMkpfgRlvh-qXE-YX8TUbgcq38=w408-h408-k-no",
    "additionalInfo": {
      "Service options": [
        {"No-contact delivery": true},
        {"Delivery": true},
        {"Takeout": true},
        {"Dine-in": true}
      ],
      "Highlights": [
        {"Great tea selection": true}
      ],
      "Popular for": [
        {"Solo dining": true}
      ],
      "Offerings": [
        {"Coffee": true},
        {"Quick bite": true}
      ],
      "Atmosphere": [
        {"Casual": true},
        {"Cozy": true},
        {"Trendy": true}
      ],
      "Crowd": [
        {"College students": true},
        {"Groups": true}
      ],
      "Children": [
        {"Good for kids": true}
      ]
    }
  },
  // Add more cafe data as needed from the JSON file
];

// Get all cafes
export const getAllCafes = async () => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cafesData);
    }, 500);
  });
};

// Get a cafe by ID
export const getCafeById = async (id) => {
  // Simulate API request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cafe = cafesData.find(cafe => cafe.id === id);
      if (cafe) {
        resolve(cafe);
      } else {
        reject(new Error('Cafe not found'));
      }
    }, 500);
  });
};

// Search cafes by term
export const searchCafes = async (searchTerm, searchType = 'name') => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [];
      const term = searchTerm.toLowerCase();
      
      if (searchType === 'name') {
        results = cafesData.filter(cafe => 
          cafe.name.toLowerCase().includes(term)
        );
      } else if (searchType === 'location') {
        results = cafesData.filter(cafe => 
          cafe.neighborhood.toLowerCase().includes(term) || 
          cafe.address.toLowerCase().includes(term)
        );
      } else if (searchType === 'feature') {
        results = cafesData.filter(cafe => {
          // Search through additionalInfo for the feature
          return Object.values(cafe.additionalInfo).some(categoryItems => {
            return categoryItems.some(item => {
              const [feature] = Object.keys(item);
              return feature.toLowerCase().includes(term);
            });
          });
        });
      }
      
      resolve(results);
    }, 800);
  });
};

// Filter cafes by various criteria
export const filterCafes = async (filters) => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...cafesData];
      
      // Filter by rating
      if (filters.rating > 0) {
        results = results.filter(cafe => parseFloat(cafe.rating) >= filters.rating);
      }
      
      // Filter by neighborhood
      if (filters.neighborhood) {
        results = results.filter(cafe => cafe.neighborhood === filters.neighborhood);
      }
      
      // Filter by categories
      if (filters.categories && filters.categories.length > 0) {
        results = results.filter(cafe => {
          return cafe.categories.some(category => {
            return filters.categories.includes(category.toLowerCase().replace(' ', '_'));
          });
        });
      }
      
      // Filter by features
      if (filters.features && filters.features.length > 0) {
        results = results.filter(cafe => {
          // Check if the cafe has any of the selected features
          return filters.features.some(feature => {
            // Search through additionalInfo for the feature
            return Object.values(cafe.additionalInfo).some(categoryItems => {
              return categoryItems.some(item => {
                const [itemFeature, value] = Object.entries(item)[0];
                return value && itemFeature.toLowerCase().replace(/\s+/g, '_') === feature;
              });
            });
          });
        });
      }
      
      resolve(results);
    }, 800);
  });
};

// Get featured cafes
export const getFeaturedCafes = async (limit = 3) => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sort by rating descending and take the top 'limit' cafes
      const featured = [...cafesData]
        .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
        .slice(0, limit);
      
      resolve(featured);
    }, 500);
  });
};

export default {
  getAllCafes,
  getCafeById,
  searchCafes,
  filterCafes,
  getFeaturedCafes
};