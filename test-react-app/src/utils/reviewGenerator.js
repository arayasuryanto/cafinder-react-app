/**
 * Helper utility to generate realistic sample review data
 * for cafes that have few or no reviews
 */

// Sample reviewer names
const reviewerNames = [
  'John Smith', 'Sarah Wilson', 'Michael Wong', 'Jennifer Lee', 
  'David Chen', 'Emily Johnson', 'Robert Kim', 'Amanda Brown',
  'Daniel Garcia', 'Jessica Tan', 'Kevin Miller', 'Rachel Nguyen',
  'Thomas Wang', 'Olivia Martinez', 'William Li', 'Sophia Park'
];

// Sample review texts
const reviewTexts = [
  "Great atmosphere and comfortable seating. The coffee was excellent and the staff were very friendly. Will definitely come back again!",
  "The wifi was fast and reliable, making it a perfect spot for remote work. The coffee selection was impressive and I loved their homemade pastries.",
  "I enjoyed the quiet ambiance and cozy decor. The latte art was beautiful and tasted as good as it looked. Only downside was limited parking.",
  "This cafe has become my regular spot for meetings. Good coffee, friendly service, and they never rush you to leave even when it's busy.",
  "Loved the artisanal coffee beans they use. The baristas clearly know what they're doing. The place is a bit small though, so it's hard to find seating during peak hours.",
  "A hidden gem in the city! The specialty drinks are creative and delicious. The outdoor seating area is perfect for sunny days.",
  "The coffee was decent but a bit overpriced for what you get. The staff seemed disinterested and service was slow during my visit.",
  "What sets this cafe apart is their attention to detail. From the coffee preparation to the cafe layout, everything has been thoughtfully designed.",
  "Great for digital nomads with plenty of outlets and good wifi. The breakfast menu was limited but what they had was delicious.",
  "Disappointing experience overall. The coffee was lukewarm and the pastries seemed like they weren't fresh. The place was clean though.",
  "This is my favorite cafe in town. They roast their own beans and you can really taste the difference. The ambiance is relaxing and perfect for reading.",
  "Mediocre at best. Service was inattentive and the coffee wasn't anything special. The location is convenient though.",
  "I'm impressed with their commitment to sustainability. They use biodegradable cups and have clearly marked recycling bins. The coffee is excellent too!",
  "A cozy spot with unique character. The coffee was good and they have an interesting selection of teas as well. Prices are reasonable.",
  "The coffee is consistently excellent and the staff are always welcoming. My only complaint is that they don't open early enough on weekends."
];

// Sample locations
const locations = [
  'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Makassar', 
  'Semarang', 'Palembang', 'Yogyakarta', 'Bali', 'Singapore'
];

// Sample titles
const reviewTitles = {
  1: [
    "Disappointing experience", 
    "Would not recommend", 
    "Overpriced and underwhelming", 
    "Avoid this place", 
    "Not worth the visit"
  ],
  2: [
    "Below average", 
    "Needs improvement", 
    "Not impressed", 
    "Expected better", 
    "Just okay"
  ],
  3: [
    "Average cafe", 
    "Decent but nothing special", 
    "Standard experience", 
    "Okay for quick coffee", 
    "Not bad not great"
  ],
  4: [
    "Very good spot", 
    "Recommend this place", 
    "Great coffee and service", 
    "Enjoyable experience", 
    "Will visit again"
  ],
  5: [
    "Excellent cafe!", 
    "A must-visit cafe", 
    "Outstanding in every way", 
    "Best coffee in town", 
    "Perfect spot for coffee lovers"
  ]
};

// Sample visit types
const visitTypes = ['Friends', 'Family', 'Couple', 'Business', 'Solo'];

// Generate a random date within the last year
const getRandomDate = () => {
  const now = new Date();
  const pastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const randomTime = pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime());
  return new Date(randomTime).toISOString().split('T')[0];
};

// Generate a single review
const generateReview = (id) => {
  // Generate a random rating from 1-5, weighted toward higher ratings
  const ratings = [1, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5];
  const rating = ratings[Math.floor(Math.random() * ratings.length)];
  
  // Get titles for this rating
  const titlesForRating = reviewTitles[rating];
  const title = titlesForRating[Math.floor(Math.random() * titlesForRating.length)];
  
  // Generate reviewer data
  const name = reviewerNames[Math.floor(Math.random() * reviewerNames.length)];
  const reviewCount = Math.floor(Math.random() * 50) + 1;
  const location = Math.random() > 0.3 ? locations[Math.floor(Math.random() * locations.length)] : null;
  
  // Generate a random avatar url based on name
  const avatarColor = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  const image = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${avatarColor}&color=fff`;
  
  // Get random review text
  const text = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
  
  // Determine if this review has images (20% chance)
  const hasImages = Math.random() < 0.2;
  let images = [];
  
  if (hasImages) {
    const imageCount = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < imageCount; i++) {
      // Using Picsum for random coffee-related images
      images.push({
        url: `https://picsum.photos/seed/cafe${id}${i}/300/200`,
        caption: `Cafe visit photo ${i+1}`
      });
    }
  }
  
  return {
    id: `review-${id}`,
    title,
    rating,
    date: getRandomDate(),
    text,
    visitType: visitTypes[Math.floor(Math.random() * visitTypes.length)],
    user: {
      name,
      image,
      reviewCount,
      location
    },
    images: hasImages ? images : []
  };
};

/**
 * Generate realistic sample reviews for a cafe
 * @param {number} count - Number of reviews to generate
 * @param {number|null} averageRating - Target average rating (approximate)
 * @returns {Array} Array of review objects
 */
export const generateCafeReviews = (count = 8, averageRating = null) => {
  const reviews = [];
  
  for (let i = 0; i < count; i++) {
    reviews.push(generateReview(i));
  }
  
  // If an average rating is specified, adjust the ratings to approximate it
  if (averageRating !== null) {
    const currentAvg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    const diff = averageRating - currentAvg;
    
    // Adjust some ratings to get closer to the target average
    if (Math.abs(diff) > 0.2) { // Only adjust if difference is significant
      const adjustCount = Math.min(Math.ceil(reviews.length * 0.5), Math.abs(diff) * 10);
      
      for (let i = 0; i < adjustCount; i++) {
        const randomIndex = Math.floor(Math.random() * reviews.length);
        if (diff > 0 && reviews[randomIndex].rating < 5) {
          reviews[randomIndex].rating += 1;
        } else if (diff < 0 && reviews[randomIndex].rating > 1) {
          reviews[randomIndex].rating -= 1;
        }
      }
    }
  }
  
  return reviews;
};

export default generateCafeReviews;