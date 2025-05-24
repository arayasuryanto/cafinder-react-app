import React from 'react';

const CafeFeatures = ({ features }) => {
  // Organization of features into categories
  const categorizeFeatures = () => {
    // Default categories
    const categories = {
      'Service Options': [],
      'Highlights': [],
      'Popular For': [],
      'Atmosphere': []
    };
    
    // If no features, return empty categories
    if (!features) return categories;
    
    // Mapping rules for service options
    const serviceOptions = ['Dine-in', 'Takeaway', 'Delivery', 'Online Order', 'Reservations'];
    const highlights = ['WiFi', 'Parking', 'Outdoor Seating', 'Live Music', 'Pet Friendly', 'Non-smoking', 'Halal', 'Vegetarian', 'Vegan'];
    const popularFor = ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Coffee', 'Dessert', 'Study', 'Work', 'Meeting'];
    const atmosphere = ['Quiet', 'Cozy', 'Casual', 'Romantic', 'Hipster', 'Modern', 'Vintage', 'Artistic', 'Instagrammable'];
    
    // Process each feature and categorize
    features.forEach(feature => {
      const featureText = typeof feature === 'string' ? feature : feature.text || feature.name;
      
      if (serviceOptions.some(opt => featureText.toLowerCase().includes(opt.toLowerCase()))) {
        categories['Service Options'].push(featureText);
      } else if (highlights.some(opt => featureText.toLowerCase().includes(opt.toLowerCase()))) {
        categories['Highlights'].push(featureText);
      } else if (popularFor.some(opt => featureText.toLowerCase().includes(opt.toLowerCase()))) {
        categories['Popular For'].push(featureText);
      } else if (atmosphere.some(opt => featureText.toLowerCase().includes(opt.toLowerCase()))) {
        categories['Atmosphere'].push(featureText);
      } else {
        // Default to highlights if no specific match
        categories['Highlights'].push(featureText);
      }
    });
    
    return categories;
  };
  
  const categories = categorizeFeatures();
  
  // Check if we have any features to display
  const hasFeatures = Object.values(categories).some(cat => cat.length > 0);
  
  if (!hasFeatures) {
    return null;
  }
  
  return (
    <section className="cafe-features">
      <div className="features-grid">
        {Object.entries(categories).map(([categoryName, categoryFeatures]) => (
          categoryFeatures.length > 0 ? (
            <div className="feature-category" key={categoryName}>
              <h3>{categoryName}</h3>
              <div className="feature-tags">
                {categoryFeatures.map((feature, index) => (
                  <div className="feature-tag available" key={index}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ) : null
        ))}
      </div>
    </section>
  );
};

export default CafeFeatures;