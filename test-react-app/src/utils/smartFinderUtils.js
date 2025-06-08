// Smart Finder Utilities
import { fetchAllCafesData } from '../data/cleanedCafesData';
import { adaptCafeDataForSinglePage } from './cafeDataAdapter';

export const generateAnalysis = (responses) => {
  let personality = '';
  let traits = [];
  
  // Analyze based on responses
  if (responses.purpose === 'work' && responses.atmosphere === 'quiet') {
    personality = 'Profesional Produktif';
    traits.push('fokus pada produktivitas', 'menyukai ketenangan');
  } else if (responses.purpose === 'social' && responses.atmosphere === 'bustling') {
    personality = 'Social Butterfly';
    traits.push('senang bersosialisasi', 'menyukai suasana ramai');
  } else if (responses.purpose === 'solo' && responses.atmosphere === 'cozy') {
    personality = 'Penikmat Me-Time';
    traits.push('menghargai waktu sendiri', 'menyukai kenyamanan');
  } else if (responses.purpose === 'business' && responses.priority === 'wifi') {
    personality = 'Digital Nomad';
    traits.push('bekerja mobile', 'butuh konektivitas tinggi');
  } else {
    personality = 'Cafe Explorer';
    traits.push('suka mencoba hal baru', 'fleksibel');
  }
  
  // Add more traits based on other responses
  if (responses.time === 'morning') traits.push('early bird');
  if (responses.time === 'night') traits.push('night owl');
  if (responses.priority === 'coffee') traits.push('coffee connoisseur');
  if (responses.priority === 'instagram') traits.push('visual-oriented');
  if (responses.vibe === 'productive') traits.push('goal-oriented');
  if (responses.vibe === 'creative') traits.push('kreatif');
  
  const analysis = `Anda adalah seorang **${personality}** yang ${traits.slice(0, 3).join(', ')}. 
    ${responses.time === 'morning' ? 'Anda suka memulai hari dengan secangkir kopi di pagi hari.' : ''}
    ${responses.priority === 'wifi' ? 'Koneksi internet yang stabil adalah prioritas utama Anda.' : ''}
    ${responses.priority === 'coffee' ? 'Kualitas kopi adalah hal yang tidak bisa dikompromikan.' : ''}
    Mari kita lihat kafe-kafe yang mungkin cocok dengan preferensi Anda.`;
  
  return analysis;
};

export const generateRecommendations = async (responses) => {
  try {
    // Fetch all cafes from the database (700+ entries)
    const allCafesRaw = await fetchAllCafesData();
    
    // Adapt cafe data to match our format
    const allCafes = allCafesRaw.map(cafe => {
      const adapted = adaptCafeDataForSinglePage(cafe);
      
      // Extract features from the cafe data
      const features = [];
      
      // WiFi feature
      if (cafe.tags?.some(tag => tag.toLowerCase().includes('wifi')) || 
          cafe.description?.toLowerCase().includes('wifi')) {
        features.push({ icon: '📶', text: 'WiFi tersedia' });
      }
      
      // Coffee quality
      if (cafe.tags?.some(tag => tag.toLowerCase().includes('specialty')) ||
          cafe.tags?.some(tag => tag.toLowerCase().includes('coffee'))) {
        features.push({ icon: '☕', text: 'Specialty coffee' });
      }
      
      // Workspace
      if (cafe.tags?.some(tag => tag.toLowerCase().includes('work')) ||
          cafe.description?.toLowerCase().includes('work')) {
        features.push({ icon: '💻', text: 'Work friendly' });
      }
      
      // Instagram worthy
      if (cafe.tags?.some(tag => tag.toLowerCase().includes('instagram')) ||
          cafe.tags?.some(tag => tag.toLowerCase().includes('aesthetic'))) {
        features.push({ icon: '📸', text: 'Instagramable' });
      }
      
      // Outdoor seating
      if (cafe.tags?.some(tag => tag.toLowerCase().includes('outdoor')) ||
          cafe.description?.toLowerCase().includes('outdoor')) {
        features.push({ icon: '🌿', text: 'Outdoor area' });
      }
      
      // Add at least 2 features for each cafe
      if (features.length < 2) {
        features.push({ icon: '🪑', text: 'Tempat nyaman' });
      }
      if (features.length < 3) {
        features.push({ icon: '🍽️', text: 'Menu lengkap' });
      }
      
      // Determine atmosphere based on tags and description
      let atmosphere = 'modern'; // default
      if (cafe.tags?.some(tag => tag.toLowerCase().includes('cozy')) ||
          cafe.description?.toLowerCase().includes('cozy')) {
        atmosphere = 'cozy';
      } else if (cafe.tags?.some(tag => tag.toLowerCase().includes('quiet')) ||
                 cafe.description?.toLowerCase().includes('tenang')) {
        atmosphere = 'quiet';
      } else if (cafe.tags?.some(tag => tag.toLowerCase().includes('bustling')) ||
                 cafe.description?.toLowerCase().includes('ramai')) {
        atmosphere = 'bustling';
      }
      
      // Determine best purposes
      const bestFor = [];
      if (cafe.tags?.some(tag => tag.toLowerCase().includes('work')) ||
          cafe.description?.toLowerCase().includes('kerja')) {
        bestFor.push('work');
      }
      if (cafe.tags?.some(tag => tag.toLowerCase().includes('meeting')) ||
          cafe.description?.toLowerCase().includes('meeting')) {
        bestFor.push('business');
      }
      if (cafe.tags?.some(tag => tag.toLowerCase().includes('hangout')) ||
          cafe.tags?.some(tag => tag.toLowerCase().includes('social'))) {
        bestFor.push('social');
      }
      if (cafe.tags?.some(tag => tag.toLowerCase().includes('solo')) ||
          atmosphere === 'quiet') {
        bestFor.push('solo');
      }
      
      // Default if no specific purpose found
      if (bestFor.length === 0) {
        bestFor.push('social', 'solo');
      }
      
      // Determine price range
      let priceRange = 'medium';
      if (cafe.priceLevel === '$') {
        priceRange = 'low';
      } else if (cafe.priceLevel === '$$$' || cafe.priceLevel === '$$$$') {
        priceRange = 'high';
      }
      
      // Determine WiFi strength
      let wifiStrength = 'good';
      if (cafe.tags?.some(tag => tag.toLowerCase().includes('fast wifi')) ||
          cafe.tags?.some(tag => tag.toLowerCase().includes('high speed'))) {
        wifiStrength = 'excellent';
      } else if (!features.some(f => f.text.includes('WiFi'))) {
        wifiStrength = 'moderate';
      }
      
      // Determine opening time preference
      let openTime = 'morning';
      if (cafe.tags?.some(tag => tag.toLowerCase().includes('24 jam')) ||
          cafe.tags?.some(tag => tag.toLowerCase().includes('24 hours'))) {
        openTime = 'night';
      } else if (cafe.tags?.some(tag => tag.toLowerCase().includes('brunch'))) {
        openTime = 'morning';
      } else if (cafe.businessStatus?.includes('evening')) {
        openTime = 'evening';
      }
      
      return {
        id: cafe.id,
        name: cafe.name,
        location: cafe.address || cafe.location || 'Surabaya',
        imageUrl: adapted.images?.[0] || cafe.imageUrl || '/images/placeholder-cafe.jpg',
        tags: cafe.tags || [],
        features: features.slice(0, 4), // Limit to 4 features
        description: cafe.description || adapted.about || 'Kafe berkualitas di Surabaya dengan suasana nyaman.',
        atmosphere: atmosphere,
        wifiStrength: wifiStrength,
        priceRange: priceRange,
        bestFor: bestFor,
        openTime: openTime,
        rating: cafe.rating || '4.0',
        reviewCount: cafe.reviewCount || 50
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
                (cafe.tags.some(tag => tag.toLowerCase().includes('specialty')) || 
                 cafe.tags.some(tag => tag.toLowerCase().includes('coffee')))) {
        score += 25;
        matchReasons.push('Kopi specialty berkualitas');
      } else if (responses.priority === 'instagram' && 
                (cafe.tags.some(tag => tag.toLowerCase().includes('instagram')) ||
                 cafe.tags.some(tag => tag.toLowerCase().includes('aesthetic')))) {
        score += 25;
        matchReasons.push('Spot foto Instagram worthy');
      } else if (responses.priority === 'price' && cafe.priceRange === 'low') {
        score += 25;
        matchReasons.push('Harga ramah kantong');
      }
      
      // Seating preference
      if (responses.seating === 'sofa' && 
         (cafe.features.some(f => f.text.toLowerCase().includes('sofa')) ||
          cafe.tags.some(tag => tag.toLowerCase().includes('cozy')))) {
        score += 10;
        matchReasons.push('Tersedia sofa nyaman');
      } else if (responses.seating === 'outdoor' && 
                cafe.features.some(f => f.text.toLowerCase().includes('outdoor'))) {
        score += 10;
        matchReasons.push('Ada area outdoor');
      } else if (responses.seating === 'counter' && 
                cafe.tags.some(tag => tag.toLowerCase().includes('bar'))) {
        score += 10;
        matchReasons.push('Counter seating tersedia');
      }
      
      // Vibe matching
      if (responses.vibe === 'productive' && cafe.bestFor.includes('work')) {
        score += 15;
      } else if (responses.vibe === 'creative' && 
                (cafe.tags.some(tag => tag.toLowerCase().includes('artistic')) || 
                 cafe.tags.some(tag => tag.toLowerCase().includes('creative')))) {
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
    
    // Sort by match score and return top 15
    return scoredCafes
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 15)
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