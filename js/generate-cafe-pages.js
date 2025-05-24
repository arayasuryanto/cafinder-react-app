// Script to generate individual cafe detail pages
const fs = require('fs');
const path = require('path');

// Read the cafes_preview.json file directly
const cafesDataPath = path.join(__dirname, '../cafes_preview.json');
let cafesData = [];

try {
    const rawData = fs.readFileSync(cafesDataPath, 'utf8');
    cafesData = JSON.parse(rawData);
    console.log(`Loaded ${cafesData.length} cafes from data file`);
} catch (error) {
    console.error('Error loading cafe data:', error);
    process.exit(1);
}

// Read the template
const templatePath = path.join(__dirname, '..', 'cafe-detail-template.html');
let template;

try {
    template = fs.readFileSync(templatePath, 'utf8');
} catch (error) {
    console.error('Error loading template:', error);
    process.exit(1);
}

// Helper function to generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '⭐';
    }
    if (hasHalfStar) {
        stars += '✨';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '☆';
    }
    return stars;
}

// Helper function to format features
function formatFeatures(features) {
    if (!features || features.length === 0) return '';
    
    return features.map(feature => {
        const key = Object.keys(feature)[0];
        const value = feature[key];
        if (value) {
            return `<span class="feature-tag available">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                </svg>
                ${key}
            </span>`;
        }
        return '';
    }).join('\n');
}

// Helper function to format opening hours
function formatOpeningHours(hours) {
    if (!hours || hours.length === 0) return '';
    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    
    return hours.map(hour => {
        const isToday = hour.day === today;
        const isOpen = hour.hours !== 'Closed';
        
        return `<div class="hours-row ${isToday ? 'today' : ''}">
            <span class="day">${hour.day}</span>
            <span class="time ${isOpen ? 'open' : 'closed'}">${hour.hours}</span>
        </div>`;
    }).join('\n');
}

// Helper function to generate review statistics
function generateReviewStats(reviewCount, rating) {
    // Simulate review distribution based on rating
    const fiveStarPercentage = rating >= 4.5 ? Math.floor(rating * 15) : Math.floor(rating * 10);
    const fourStarPercentage = Math.floor((5 - rating) * 10);
    const threeStarPercentage = Math.floor((4 - rating) * 8);
    const twoStarPercentage = Math.floor((3 - rating) * 3);
    const oneStarPercentage = 100 - fiveStarPercentage - fourStarPercentage - threeStarPercentage - twoStarPercentage;
    
    return {
        fiveStarPercentage,
        fourStarPercentage,
        threeStarPercentage,
        twoStarPercentage,
        oneStarPercentage,
        fiveStarCount: Math.floor(reviewCount * fiveStarPercentage / 100),
        fourStarCount: Math.floor(reviewCount * fourStarPercentage / 100),
        threeStarCount: Math.floor(reviewCount * threeStarPercentage / 100),
        twoStarCount: Math.floor(reviewCount * twoStarPercentage / 100),
        oneStarCount: Math.floor(reviewCount * oneStarPercentage / 100)
    };
}

// Generate image URLs (placeholder images for now)
function generateImageUrls(cafeId, cafeName) {
    // Using Lorem Picsum for placeholder images
    const baseUrl = 'https://picsum.photos/seed/';
    
    return {
        main: `${baseUrl}${encodeURIComponent(cafeName)}-1/800/600`,
        image2: `${baseUrl}${encodeURIComponent(cafeName)}-2/400/300`,
        image3: `${baseUrl}${encodeURIComponent(cafeName)}-3/400/300`,
        image4: `${baseUrl}${encodeURIComponent(cafeName)}-4/400/300`,
        image5: `${baseUrl}${encodeURIComponent(cafeName)}-5/400/300`
    };
}

// Generate pages for the first 100 cafes
const cafesToGenerate = Math.min(100, cafesData.length);

// Create directory for cafe pages if it doesn't exist
const cafesDir = path.join(__dirname, '..', 'cafes');
if (!fs.existsSync(cafesDir)) {
    fs.mkdirSync(cafesDir);
}

for (let i = 0; i < cafesToGenerate; i++) {
    const cafe = cafesData[i];
    let cafeHtml = template;
    
    // Generate image URLs for this cafe
    const images = generateImageUrls(cafe.id, cafe.name);
    
    // Replace placeholders with actual data
    cafeHtml = cafeHtml.replace(/{{CAFE_NAME}}/g, cafe.name || 'Cafe');
    cafeHtml = cafeHtml.replace(/{{CAFE_RATING}}/g, cafe.rating || '0');
    cafeHtml = cafeHtml.replace(/{{REVIEW_COUNT}}/g, cafe.reviewCount || '0');
    cafeHtml = cafeHtml.replace(/{{CAFE_ADDRESS}}/g, cafe.address || 'Address not available');
    cafeHtml = cafeHtml.replace(/{{CAFE_IMAGE}}/g, images.main);
    
    // Generate additional images
    cafeHtml = cafeHtml.replace(/{{CAFE_IMAGE_2}}/g, images.image2);
    cafeHtml = cafeHtml.replace(/{{CAFE_IMAGE_3}}/g, images.image3);
    cafeHtml = cafeHtml.replace(/{{CAFE_IMAGE_4}}/g, images.image4);
    cafeHtml = cafeHtml.replace(/{{CAFE_IMAGE_5}}/g, images.image5);
    
    // Star rating
    cafeHtml = cafeHtml.replace(/{{RATING_STARS}}/g, generateStarRating(parseFloat(cafe.rating) || 0));
    
    // Opening hours
    const openingHours = cafe.openingHours && cafe.openingHours.length > 0 ? cafe.openingHours[0].hours : 'Hours not available';
    cafeHtml = cafeHtml.replace(/{{OPENING_HOURS}}/g, openingHours);
    cafeHtml = cafeHtml.replace(/{{OPENING_HOURS_TABLE}}/g, formatOpeningHours(cafe.openingHours));
    
    // Contact info
    const phoneNumber = cafe.phone ? `
        <div class="detail-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill="#F05438"/>
            </svg>
            <span>${cafe.phone}</span>
        </div>
    ` : '';
    cafeHtml = cafeHtml.replace(/{{PHONE_NUMBER}}/g, phoneNumber);
    
    const website = cafe.website ? `
        <div class="detail-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.94 19.44 5.5 16.84 5.5 13.64C5.5 13.61 5.5 13.58 5.5 13.56L9.5 17.56C9.62 18.03 9.77 18.49 9.96 18.92L11 19.93ZM13 19.93L13.96 18.92C14.23 18.49 14.38 18.03 14.5 17.56L18.5 13.56C18.5 13.58 18.5 13.61 18.5 13.64C18.5 16.84 16.06 19.44 13 19.93ZM19 11.5H15L14 8L10 8L9 11.5H5C4.45 11.5 4 11.95 4 12.5C4 13.05 4.45 13.5 5 13.5H19C19.55 13.5 20 13.05 20 12.5C20 11.95 19.55 11.5 19 11.5Z" fill="#F05438"/>
            </svg>
            <a href="${cafe.website}" target="_blank">${cafe.website}</a>
        </div>
    ` : '';
    cafeHtml = cafeHtml.replace(/{{WEBSITE}}/g, website);
    
    // Directions link
    cafeHtml = cafeHtml.replace(/{{DIRECTIONS_LINK}}/g, cafe.google_maps_direction || '#');
    
    // Parking info
    const parkingInfo = cafe.additionalInfo && cafe.additionalInfo.Parking ? 'Parking available' : 'Parking information not available';
    cafeHtml = cafeHtml.replace(/{{PARKING_INFO}}/g, parkingInfo);
    
    // Features
    if (cafe.additionalInfo) {
        cafeHtml = cafeHtml.replace(/{{SERVICE_OPTIONS}}/g, formatFeatures(cafe.additionalInfo['Service options'] || []));
        cafeHtml = cafeHtml.replace(/{{HIGHLIGHTS}}/g, formatFeatures(cafe.additionalInfo.Highlights || []));
        cafeHtml = cafeHtml.replace(/{{POPULAR_FOR}}/g, formatFeatures(cafe.additionalInfo['Popular for'] || []));
        cafeHtml = cafeHtml.replace(/{{ATMOSPHERE}}/g, formatFeatures(cafe.additionalInfo.Atmosphere || []));
    } else {
        cafeHtml = cafeHtml.replace(/{{SERVICE_OPTIONS}}/g, '');
        cafeHtml = cafeHtml.replace(/{{HIGHLIGHTS}}/g, '');
        cafeHtml = cafeHtml.replace(/{{POPULAR_FOR}}/g, '');
        cafeHtml = cafeHtml.replace(/{{ATMOSPHERE}}/g, '');
    }
    
    // Review statistics
    const reviewStats = generateReviewStats(cafe.reviewCount || 0, parseFloat(cafe.rating) || 0);
    cafeHtml = cafeHtml.replace(/{{FIVE_STAR_PERCENTAGE}}/g, reviewStats.fiveStarPercentage);
    cafeHtml = cafeHtml.replace(/{{FOUR_STAR_PERCENTAGE}}/g, reviewStats.fourStarPercentage);
    cafeHtml = cafeHtml.replace(/{{THREE_STAR_PERCENTAGE}}/g, reviewStats.threeStarPercentage);
    cafeHtml = cafeHtml.replace(/{{TWO_STAR_PERCENTAGE}}/g, reviewStats.twoStarPercentage);
    cafeHtml = cafeHtml.replace(/{{ONE_STAR_PERCENTAGE}}/g, reviewStats.oneStarPercentage);
    
    cafeHtml = cafeHtml.replace(/{{FIVE_STAR_COUNT}}/g, reviewStats.fiveStarCount);
    cafeHtml = cafeHtml.replace(/{{FOUR_STAR_COUNT}}/g, reviewStats.fourStarCount);
    cafeHtml = cafeHtml.replace(/{{THREE_STAR_COUNT}}/g, reviewStats.threeStarCount);
    cafeHtml = cafeHtml.replace(/{{TWO_STAR_COUNT}}/g, reviewStats.twoStarCount);
    cafeHtml = cafeHtml.replace(/{{ONE_STAR_COUNT}}/g, reviewStats.oneStarCount);
    
    // Create filename from cafe name (sanitize it)
    const fileName = cafe.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') + '.html';
    
    const filePath = path.join(cafesDir, fileName);
    
    // Write the file
    fs.writeFileSync(filePath, cafeHtml);
    console.log(`Generated ${fileName}`);
}

console.log(`Successfully generated ${cafesToGenerate} cafe detail pages.`);