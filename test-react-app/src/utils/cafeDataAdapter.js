/**
 * This utility file adapts data from the cafes_preview.json format 
 * to the format expected by our React components
 */

/**
 * Transform a cafe entry from cafes_preview.json format to SingleCafePage format
 * @param {Object} cafeData - Raw cafe data from cafes_preview.json
 * @returns {Object} - Transformed cafe data for use in SimpleCafePage
 */
export const adaptCafeDataForSinglePage = (cafeData) => {
  if (!cafeData) return null;
  
  // Extract features from additionalInfo
  const features = extractFeatures(cafeData.additionalInfo);
  
  
  // No dummy reviews - use empty array
  const reviews = [];
  
  // Format images (use the main image + generate placeholders)
  const images = generateImages(cafeData);
  
  return {
    id: cafeData.id,
    name: cafeData.name,
    fullAddress: cafeData.address,
    google_maps_direction: cafeData.google_maps_direction, // Preserve the original google_maps_direction field
    coordinates: {
      lat: 0, // These would need to be parsed from Google Maps data or provided
      lng: 0
    },
    phone: cafeData.phone,
    website: cafeData.website,
    contactInfo: {
      phone: cafeData.phone,
      email: null,
      website: cafeData.website,
      socialMedia: {
        instagram: cafeData.website && cafeData.website.includes('instagram.com') ? cafeData.website : null,
        facebook: cafeData.website && cafeData.website.includes('facebook.com') ? cafeData.website : null
      }
    },
    rating: parseFloat(cafeData.rating) || 0,
    totalReviews: cafeData.reviewCount || 0,
    priceRange: "$$", // Default since it's not in the original data
    images: images,
    tags: extractTags(cafeData),
    description: generateDescription(cafeData),
    aboutDetails: generateAboutDetails(cafeData),
    features: features,
    openingHours: cafeData.openingHours, // Use original data directly
    ratings: {
      overall: parseFloat(cafeData.rating) || 0,
      categories: {
        coffee: parseFloat(cafeData.rating) || 0,
        food: parseFloat(cafeData.rating) - 0.2 || 0,
        atmosphere: parseFloat(cafeData.rating) + 0.1 || 0,
        service: parseFloat(cafeData.rating) - 0.1 || 0,
        value: parseFloat(cafeData.rating) - 0.3 || 0,
        wifi: parseFloat(cafeData.rating) || 0
      }
    },
    reviews: reviews,
    nearbyAttractions: [],
    popularTimes: generatePopularTimes()
  };
};

/**
 * Extract features from additionalInfo object
 */
const extractFeatures = (additionalInfo) => {
  if (!additionalInfo) return [];
  
  const features = [];
  
  // Map common categories to collect features
  const categoryMappings = {
    "Service options": (item) => Object.keys(item).filter(key => item[key]),
    "Highlights": (item) => Object.keys(item).filter(key => item[key]),
    "Offerings": (item) => Object.keys(item).filter(key => item[key]),
    "Atmosphere": (item) => Object.keys(item).filter(key => item[key])
  };
  
  // Process each category in additionalInfo
  Object.keys(additionalInfo).forEach(category => {
    if (categoryMappings[category]) {
      additionalInfo[category].forEach(item => {
        features.push(...categoryMappings[category](item));
      });
    }
  });
  
  // Add additional common features
  if (features.indexOf("WiFi") === -1 && features.indexOf("Free WiFi") === -1) {
    features.push("Free WiFi");
  }
  
  if (features.indexOf("Power Outlets") === -1 && 
      features.indexOf("Good for working on laptop") !== -1) {
    features.push("Power Outlets");
  }
  
  return [...new Set(features)]; // Remove duplicates
};





/**
 * Generate images for the cafe
 */
const generateImages = (cafeData) => {
  if (!cafeData) return [];
  
  const mainImage = {
    id: 1,
    url: cafeData.imageUrl,
    caption: "Main view"
  };
  
  // Generate additional image URLs using the cafe name as a seed
  const encodedName = encodeURIComponent(cafeData.name);
  const additionalImages = [
    {
      id: 2,
      url: `https://picsum.photos/seed/${encodedName}-interior/800/600`,
      caption: "Interior"
    },
    {
      id: 3,
      url: `https://picsum.photos/seed/${encodedName}-coffee/800/600`,
      caption: "Coffee selection"
    },
    {
      id: 4,
      url: `https://picsum.photos/seed/${encodedName}-ambience/800/600`,
      caption: "Ambience"
    },
    {
      id: 5,
      url: `https://picsum.photos/seed/${encodedName}-food/800/600`,
      caption: "Food & drinks"
    }
  ];
  
  return [mainImage, ...additionalImages];
};

/**
 * Extract tags from cafe data categories and additionalInfo
 */
const extractTags = (cafeData) => {
  const tags = [...(cafeData.categories || [])];
  
  if (cafeData.additionalInfo) {
    // Add atmosphere tags
    if (cafeData.additionalInfo.Atmosphere) {
      cafeData.additionalInfo.Atmosphere.forEach(item => {
        tags.push(...Object.keys(item).filter(key => item[key]));
      });
    }
    
    // Add popular for tags
    if (cafeData.additionalInfo["Popular for"]) {
      cafeData.additionalInfo["Popular for"].forEach(item => {
        if (item["Good for working on laptop"]) {
          tags.push("Working Space");
        }
        Object.keys(item).filter(key => item[key]).forEach(tag => {
          tags.push(tag);
        });
      });
    }
  }
  
  return [...new Set(tags)]; // Remove duplicates
};

/**
 * Generate a description for the cafe
 */
const generateDescription = (cafeData) => {
  if (cafeData.description) return cafeData.description;
  
  return `${cafeData.name} adalah kafe yang terletak di ${cafeData.neighborhood || cafeData.city || "Surabaya"}. 
  Kafe ini menawarkan pengalaman menikmati kopi berkualitas dalam suasana yang ${getAtmosphereDescription(cafeData)}. 
  ${cafeData.categories?.includes("Coffee shop") ? "Dikenal dengan kopi spesialitasnya, " : ""}
  ${cafeData.name} menjadi tempat favorit bagi ${getTargetAudience(cafeData)} 
  yang mencari tempat ideal untuk ${getMainActivities(cafeData)}.`;
};

/**
 * Get atmosphere description based on additional info
 */
const getAtmosphereDescription = (cafeData) => {
  if (!cafeData.additionalInfo?.Atmosphere) return "nyaman dan modern";
  
  const atmosphereWords = [];
  cafeData.additionalInfo.Atmosphere.forEach(item => {
    Object.keys(item).filter(key => item[key]).forEach(atmosphere => {
      atmosphereWords.push(atmosphere.toLowerCase());
    });
  });
  
  if (atmosphereWords.length === 0) return "nyaman dan modern";
  if (atmosphereWords.length === 1) return `${atmosphereWords[0]} dan nyaman`;
  
  return atmosphereWords.slice(0, 2).join(" dan ");
};

/**
 * Get target audience description
 */
const getTargetAudience = (cafeData) => {
  if (!cafeData.additionalInfo?.Crowd) return "para pecinta kopi dan pekerja remote";
  
  const audienceWords = [];
  cafeData.additionalInfo.Crowd.forEach(item => {
    Object.keys(item).filter(key => item[key]).forEach(crowd => {
      audienceWords.push(crowd);
    });
  });
  
  if (audienceWords.length === 0) return "para pecinta kopi dan pekerja remote";
  if (audienceWords.includes("College students")) return "mahasiswa dan pekerja remote";
  if (audienceWords.includes("Groups")) return "grup teman atau keluarga";
  
  return "para pecinta kopi dan pekerja remote";
};

/**
 * Get main activities based on cafe's popular for info
 */
const getMainActivities = (cafeData) => {
  if (!cafeData.additionalInfo?.["Popular for"]) return "bekerja atau bertemu dengan teman";
  
  const activities = [];
  cafeData.additionalInfo["Popular for"].forEach(item => {
    if (item["Good for working on laptop"]) {
      activities.push("bekerja remote");
    }
    if (item["Solo dining"]) {
      activities.push("menikmati waktu sendiri");
    }
    if (item["Dinner"] || item["Lunch"]) {
      activities.push("makan bersama teman");
    }
  });
  
  if (activities.length === 0) return "bekerja atau bertemu dengan teman";
  if (activities.length === 1) return activities[0];
  
  return `${activities[0]} atau ${activities[1]}`;
};

/**
 * Generate additional about details
 */
const generateAboutDetails = (cafeData) => {
  return [
    `${cafeData.name} ${cafeData.categories?.includes("Coffee shop") ? 
      "menyajikan berbagai jenis kopi specialty dari biji pilihan yang di-roasting dengan sempurna." : 
      "menawarkan berbagai menu minuman dan makanan yang menggugah selera."} 
      ${getAtmosphereDescription(cafeData).includes("modern") ? 
        "Kafe ini memiliki interior modern dengan pencahayaan yang baik" : 
        "Suasana kafe sangat nyaman dan cozy"}, 
      ${cafeData.additionalInfo?.["Popular for"]?.some(item => item["Good for working on laptop"]) ? 
        "ideal untuk bekerja atau meeting." : 
        "ideal untuk bersantai dan berkumpul dengan teman."}`,
    
    `${cafeData.additionalInfo?.Offerings?.some(item => Object.keys(item).some(key => key.includes("food") || key.includes("bite"))) ?
      "Selain kopi, kafe ini juga menawarkan berbagai pilihan pastry, cake, dan makanan ringan." :
      "Menu minuman di kafe ini sangat beragam dan diolah dengan bahan-bahan berkualitas."} 
      ${cafeData.additionalInfo?.["Popular for"]?.some(item => item["Good for working on laptop"]) ?
        "Koneksi internet cepat dan stabil serta banyaknya colokan listrik menjadikan tempat ini pilihan utama untuk remote working." :
        "Tempatnya yang nyaman menjadikan kafe ini pilihan ideal untuk bersantai atau berkumpul dengan teman-teman."}`,
    
    "Staf yang ramah dan profesional siap memberikan rekomendasi menu sesuai dengan preferensi pelanggan, menjadikan setiap kunjungan menjadi pengalaman yang personal dan menyenangkan."
  ];
};

/**
 * Generate popular times data
 */
const generatePopularTimes = () => {
  return {
    weekday: {
      morning: "medium", // 7-11
      midday: "high",    // 11-2
      afternoon: "medium", // 2-5
      evening: "high"    // 5-9
    },
    weekend: {
      morning: "low",    // 7-11
      midday: "high",    // 11-2
      afternoon: "high", // 2-5
      evening: "high"    // 5-9
    }
  };
};