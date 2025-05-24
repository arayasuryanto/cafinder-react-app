import React from 'react';

const CafeReviews = ({ cafe }) => {
  // In a real implementation, we would fetch reviews from an API
  // For now, we'll use mock data
  const mockReviews = [
    {
      id: 1,
      author: 'John Doe',
      rating: 5,
      date: '2023-06-15',
      content: 'Great place to relax and enjoy a coffee. The atmosphere is cozy and the staff is friendly. I highly recommend their specialty coffee.',
      authorPhoto: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      id: 2,
      author: 'Jane Smith',
      rating: 4,
      date: '2023-05-22',
      content: 'I visit this cafe regularly for work. The WiFi is reliable and there are plenty of power outlets. The only downside is that it can get a bit crowded during peak hours.',
      authorPhoto: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      id: 3,
      author: 'Alex Johnson',
      rating: 4.5,
      date: '2023-04-10',
      content: 'The coffee is excellent and they have a good selection of pastries. I like the atmosphere and the location is convenient.',
      authorPhoto: 'https://randomuser.me/api/portraits/men/3.jpg'
    }
  ];
  
  if (!cafe) return null;
  
  return (
    <div className="cafe-reviews">
      <div className="container">
        <h2>Customer Reviews</h2>
        
        <div className="reviews-summary">
          <div className="rating-summary">
            <span className="big-rating">{cafe.rating}</span>
            <div className="rating-stars">
              {'★'.repeat(Math.floor(parseFloat(cafe.rating)))}
              {parseFloat(cafe.rating) % 1 >= 0.5 ? '½' : ''}
              {'☆'.repeat(5 - Math.ceil(parseFloat(cafe.rating)))}
            </div>
            <p>{cafe.reviewCount} reviews</p>
          </div>
          
          <div className="write-review">
            <button className="write-review-btn">Write a Review</button>
          </div>
        </div>
        
        <div className="reviews-list">
          {mockReviews.map(review => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <img 
                    src={review.authorPhoto} 
                    alt={review.author} 
                    className="reviewer-photo" 
                  />
                  <div className="reviewer-details">
                    <h3>{review.author}</h3>
                    <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="review-rating">
                  <span>{review.rating} ★</span>
                </div>
              </div>
              <div className="review-content">
                <p>{review.content}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="see-all-reviews">
          <button className="see-all-btn">See All Reviews</button>
        </div>
      </div>
    </div>
  );
};

export default CafeReviews;