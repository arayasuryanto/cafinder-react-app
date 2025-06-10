// Smart Finder Utilities
import { cleanedCafesData } from '../data/cleanedCafesData';
import { adaptCafeDataForSinglePage } from './cafeDataAdapter';

export const generateAnalysis = (responses) => {
  // Define 6 personality types with scoring weights
  const personalityScores = {
    'The Productivity Hunter': 0,
    'The Social Connector': 0,
    'The Coffee Connoisseur': 0,
    'The Aesthetic Seeker': 0,
    'The Comfort Lover': 0,
    'The Night Owl': 0
  };

  // Score based on purpose
  if (responses.purpose === 'work') {
    personalityScores['The Productivity Hunter'] += 3;
    personalityScores['The Coffee Connoisseur'] += 1;
  } else if (responses.purpose === 'social') {
    personalityScores['The Social Connector'] += 3;
    personalityScores['The Aesthetic Seeker'] += 1;
  } else if (responses.purpose === 'business') {
    personalityScores['The Social Connector'] += 2;
    personalityScores['The Productivity Hunter'] += 2;
  } else if (responses.purpose === 'solo') {
    personalityScores['The Comfort Lover'] += 3;
    personalityScores['The Coffee Connoisseur'] += 2;
  }

  // Score based on time preference
  if (responses.time === 'night') {
    personalityScores['The Night Owl'] += 3;
    personalityScores['The Comfort Lover'] += 1;
  } else if (responses.time === 'morning') {
    personalityScores['The Productivity Hunter'] += 2;
    personalityScores['The Coffee Connoisseur'] += 1;
  } else if (responses.time === 'afternoon') {
    personalityScores['The Social Connector'] += 1;
    personalityScores['The Aesthetic Seeker'] += 1;
  }

  // Score based on atmosphere preference
  if (responses.atmosphere === 'quiet') {
    personalityScores['The Productivity Hunter'] += 2;
    personalityScores['The Coffee Connoisseur'] += 2;
    personalityScores['The Comfort Lover'] += 1;
  } else if (responses.atmosphere === 'bustling') {
    personalityScores['The Social Connector'] += 3;
    personalityScores['The Night Owl'] += 1;
  } else if (responses.atmosphere === 'cozy') {
    personalityScores['The Comfort Lover'] += 3;
    personalityScores['The Coffee Connoisseur'] += 1;
  } else if (responses.atmosphere === 'modern') {
    personalityScores['The Aesthetic Seeker'] += 2;
    personalityScores['The Productivity Hunter'] += 1;
  }

  // Score based on priority
  if (responses.priority === 'wifi') {
    personalityScores['The Productivity Hunter'] += 3;
    personalityScores['The Social Connector'] += 1;
  } else if (responses.priority === 'coffee') {
    personalityScores['The Coffee Connoisseur'] += 3;
    personalityScores['The Comfort Lover'] += 1;
  } else if (responses.priority === 'instagram') {
    personalityScores['The Aesthetic Seeker'] += 3;
    personalityScores['The Social Connector'] += 1;
  } else if (responses.priority === 'price') {
    personalityScores['The Comfort Lover'] += 2;
    personalityScores['The Night Owl'] += 1;
  }

  // Score based on seating preference
  if (responses.seating === 'sofa') {
    personalityScores['The Comfort Lover'] += 2;
    personalityScores['The Night Owl'] += 1;
  } else if (responses.seating === 'outdoor') {
    personalityScores['The Aesthetic Seeker'] += 2;
    personalityScores['The Social Connector'] += 1;
  } else if (responses.seating === 'counter') {
    personalityScores['The Coffee Connoisseur'] += 2;
    personalityScores['The Social Connector'] += 1;
  } else if (responses.seating === 'table') {
    personalityScores['The Productivity Hunter'] += 2;
    personalityScores['The Social Connector'] += 1;
  }

  // Score based on vibe preference
  if (responses.vibe === 'productive') {
    personalityScores['The Productivity Hunter'] += 3;
  } else if (responses.vibe === 'creative') {
    personalityScores['The Aesthetic Seeker'] += 2;
    personalityScores['The Coffee Connoisseur'] += 1;
  } else if (responses.vibe === 'social') {
    personalityScores['The Social Connector'] += 3;
  } else if (responses.vibe === 'relaxation') {
    personalityScores['The Comfort Lover'] += 2;
    personalityScores['The Night Owl'] += 1;
  }

  // Find the personality type with highest score
  const maxScore = Math.max(...Object.values(personalityScores));
  
  // Handle ties by selecting the first one that matches (or add tie-breaking logic)
  let winningPersonality = Object.keys(personalityScores).find(
    key => personalityScores[key] === maxScore
  );

  // Tie-breaking logic: if multiple personalities have same score, prioritize based on response patterns
  const tiedPersonalities = Object.keys(personalityScores).filter(
    key => personalityScores[key] === maxScore
  );

  if (tiedPersonalities.length > 1) {
    // Priority order for tie-breaking
    const priorityOrder = [
      'The Productivity Hunter',
      'The Social Connector', 
      'The Coffee Connoisseur',
      'The Aesthetic Seeker',
      'The Comfort Lover',
      'The Night Owl'
    ];
    
    winningPersonality = priorityOrder.find(personality => 
      tiedPersonalities.includes(personality)
    ) || tiedPersonalities[0];
  }

  // Ensure we have a valid personality (fallback)
  if (!winningPersonality || personalityScores[winningPersonality] === 0) {
    // If no clear winner or all scores are 0, assign based on dominant response
    if (responses.purpose === 'work') {
      winningPersonality = 'The Productivity Hunter';
    } else if (responses.purpose === 'social') {
      winningPersonality = 'The Social Connector';
    } else if (responses.priority === 'coffee') {
      winningPersonality = 'The Coffee Connoisseur';
    } else if (responses.priority === 'instagram') {
      winningPersonality = 'The Aesthetic Seeker';
    } else if (responses.time === 'night') {
      winningPersonality = 'The Night Owl';
    } else {
      winningPersonality = 'The Comfort Lover';
    }
  }

  // Generate analysis text based on winning personality
  const personalityDescriptions = {
    'The Productivity Hunter': 'Anda adalah tipe yang berorientasi pada produktivitas dan efisiensi. Anda membutuhkan lingkungan yang mendukung fokus dengan WiFi kencang dan suasana yang kondusif untuk bekerja.',
    'The Social Connector': 'Anda adalah tipe yang senang bersosialisasi dan networking. Anda menyukai suasana ramai yang energik dan tempat yang cocok untuk meeting atau hangout dengan teman.',
    'The Coffee Connoisseur': 'Anda adalah pencinta kopi sejati yang mengutamakan kualitas. Anda menyukai suasana cozy dan intimate sambil menikmati secangkir kopi berkualitas tinggi.',
    'The Aesthetic Seeker': 'Anda adalah tipe yang visual-oriented dan kreatif. Anda mencari spot foto yang menarik dengan desain interior yang unik dan Instagram-worthy.',
    'The Comfort Lover': 'Anda mengutamakan kenyamanan dan relaksasi. Anda mencari tempat untuk me-time berkualitas dengan area duduk yang empuk dan suasana yang santai.',
    'The Night Owl': 'Anda aktif di malam hari dan menyukai tempat yang buka larut dengan vibe santai dan chill. Anda cocok dengan suasana yang lebih santai dan tidak terburu-buru.'
  };

  const analysis = `${personalityDescriptions[winningPersonality]} Mari kita lihat kafe-kafe yang cocok dengan kepribadian ${winningPersonality} Anda.`;
  
  return analysis;
};

export const generateRecommendations = async (responses) => {
  try {
    // Use the cleaned cafes data directly (contains Google Photos URLs)
    const allCafesRaw = cleanedCafesData;
    
    // Use the same data adapter that catalog pages use, but preserve original imageUrl
    const allCafes = allCafesRaw.map(cafe => {
      const adapted = adaptCafeDataForSinglePage(cafe);
      
      console.log(`DEBUG: Cafe ${cafe.name} - Original imageUrl:`, cafe.imageUrl);
      
      // Add SmartFinder-specific properties for scoring
      let atmosphere = 'modern';
      if (cafe.additionalInfo?.Atmosphere) {
        const atmosphereData = cafe.additionalInfo.Atmosphere;
        if (atmosphereData.some(item => item.Cozy)) atmosphere = 'cozy';
        else if (atmosphereData.some(item => item.Quiet)) atmosphere = 'quiet';
        else if (atmosphereData.some(item => item.Casual)) atmosphere = 'bustling';
      }
      
      const bestFor = [];
      if (cafe.additionalInfo?.['Popular for']) {
        const popularFor = cafe.additionalInfo['Popular for'];
        if (popularFor.some(item => item['Good for working on laptop'])) {
          bestFor.push('work');
        }
        if (popularFor.some(item => item['Solo dining'])) {
          bestFor.push('solo');
        }
      }
      if (bestFor.length === 0) {
        bestFor.push('social', 'solo');
      }
      
      let priceRange = 'medium';
      let wifiStrength = 'good';
      if (adapted.features?.some(f => f.toLowerCase().includes('wifi'))) {
        wifiStrength = 'excellent';
      }
      let openTime = 'morning';

      return {
        ...adapted,
        // FORCE use original Google Photos URL
        imageUrl: cafe.imageUrl,
        images: cafe.imageUrl ? [cafe.imageUrl, cafe.imageUrl, cafe.imageUrl] : ['https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
        google_maps_direction: cafe.google_maps_direction,
        atmosphere: atmosphere,
        wifiStrength: wifiStrength,
        priceRange: priceRange,
        bestFor: bestFor,
        openTime: openTime
      };
    });
    
    // Score cafes based on user responses
    const scoredCafes = allCafes.map(cafe => {
      let score = 0;
      let matchReasons = [];
      
      // Purpose matching (highest weight)
      if (cafe.bestFor.includes(responses.purpose)) {
        score += 30;
        matchReasons.push('Cocok untuk ' + 
          (responses.purpose === 'work' ? 'bekerja' : 
           responses.purpose === 'social' ? 'hangout' :
           responses.purpose === 'business' ? 'meeting' : 'bersantai'));
      }
      
      // Time matching
      if (cafe.openTime === responses.time || cafe.tags.some(tag => tag.toLowerCase().includes('24 jam'))) {
        score += 15;
        matchReasons.push('Buka di waktu favorit Anda');
      }
      
      // Atmosphere matching (high weight)
      if (cafe.atmosphere === responses.atmosphere) {
        score += 25;
        matchReasons.push('Suasana ' + 
          (responses.atmosphere === 'quiet' ? 'tenang' :
           responses.atmosphere === 'bustling' ? 'ramai' :
           responses.atmosphere === 'cozy' ? 'nyaman' : 'modern'));
      }
      
      // Priority matching (high weight)
      if (responses.priority === 'wifi' && cafe.wifiStrength === 'excellent') {
        score += 25;
        matchReasons.push('WiFi super kencang');
      } else if (responses.priority === 'coffee' && 
                (cafe.features?.some(f => f.toLowerCase().includes('coffee')) || 
                 cafe.tags?.some(tag => tag.toLowerCase().includes('coffee')))) {
        score += 25;
        matchReasons.push('Kopi specialty berkualitas');
      } else if (responses.priority === 'instagram' && 
                (cafe.tags?.some(tag => tag.toLowerCase().includes('trendy')) ||
                 cafe.features?.some(f => f.toLowerCase().includes('trendy')))) {
        score += 25;
        matchReasons.push('Spot foto Instagram worthy');
      } else if (responses.priority === 'price' && cafe.priceRange === 'low') {
        score += 25;
        matchReasons.push('Harga ramah kantong');
      }
      
      // Seating preference
      if (responses.seating === 'sofa' && 
         (cafe.features?.some(f => f.toLowerCase().includes('cozy')) ||
          cafe.tags?.some(tag => tag.toLowerCase().includes('cozy')))) {
        score += 10;
        matchReasons.push('Tersedia sofa nyaman');
      } else if (responses.seating === 'outdoor' && 
                cafe.features?.some(f => f.toLowerCase().includes('outdoor'))) {
        score += 10;
        matchReasons.push('Ada area outdoor');
      } else if (responses.seating === 'counter' && 
                cafe.features?.some(f => f.toLowerCase().includes('counter'))) {
        score += 10;
        matchReasons.push('Counter seating tersedia');
      }
      
      // Vibe matching
      if (responses.vibe === 'productive' && cafe.bestFor.includes('work')) {
        score += 15;
      } else if (responses.vibe === 'creative' && 
                (cafe.tags?.some(tag => tag.toLowerCase().includes('trendy')) || 
                 cafe.features?.some(f => f.toLowerCase().includes('trendy')))) {
        score += 15;
        matchReasons.push('Atmosfer kreatif');
      } else if (responses.vibe === 'social' && cafe.bestFor.includes('social')) {
        score += 15;
      } else if (responses.vibe === 'relaxation' && 
                (cafe.atmosphere === 'cozy' || cafe.atmosphere === 'quiet')) {
        score += 15;
        matchReasons.push('Sempurna untuk relaksasi');
      }
      
      // Bonus points for high ratings
      const rating = parseFloat(cafe.rating);
      if (rating >= 4.5) {
        score += 10;
      } else if (rating >= 4.0) {
        score += 5;
      }
      
      // Ensure match reasons are unique and limited to 3
      matchReasons = [...new Set(matchReasons)].slice(0, 3);
      
      return {
        ...cafe,
        matchScore: score, // Internal score for sorting
        matchReasons: matchReasons
      };
    });
    
    // Sort by match score and return top 7
    return scoredCafes
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 7)
      .map(cafe => ({
        ...cafe,
        // Ensure all required fields have values
        description: cafe.description || 'Kafe berkualitas dengan suasana nyaman dan pelayanan terbaik.',
        features: cafe.features.length > 0 ? cafe.features : [
          { icon: '☕', text: 'Kopi berkualitas' },
          { icon: '🪑', text: 'Tempat nyaman' }
        ],
        tags: cafe.tags.length > 0 ? cafe.tags : ['Cafe', 'Nyaman', 'Berkualitas']
      }));
      
  } catch (error) {
    console.error('Error generating recommendations:', error);
    // Return empty array if error occurs
    return [];
  }
};