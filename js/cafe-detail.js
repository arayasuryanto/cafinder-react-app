// Cafe Detail Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Toggle all hours visibility
    const toggleHoursBtn = document.querySelector('.toggle-hours');
    const openingHoursSection = document.getElementById('opening-hours');
    
    if (toggleHoursBtn && openingHoursSection) {
        toggleHoursBtn.addEventListener('click', function() {
            if (openingHoursSection.style.display === 'none') {
                openingHoursSection.style.display = 'block';
                this.textContent = 'Hide hours';
                openingHoursSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                openingHoursSection.style.display = 'none';
                this.textContent = 'Show all hours';
            }
        });
    }
    
    // Save button functionality
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            this.classList.toggle('saved');
            const icon = this.querySelector('svg path');
            if (this.classList.contains('saved')) {
                icon.setAttribute('fill', '#F05438');
                this.style.color = '#F05438';
                this.style.borderColor = '#F05438';
            } else {
                icon.setAttribute('fill', 'currentColor');
                this.style.color = '';
                this.style.borderColor = '';
            }
        });
    }
    
    // Gallery button functionality
    const galleryBtn = document.querySelector('.gallery-btn');
    if (galleryBtn) {
        galleryBtn.addEventListener('click', function() {
            // This could open a modal with all images
            alert('Gallery modal would open here');
        });
    }
    
    // Review filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter reviews based on button text
            const filter = this.textContent.toLowerCase();
            const reviews = document.querySelectorAll('.review-card');
            
            reviews.forEach(review => {
                if (filter === 'all') {
                    review.style.display = 'block';
                } else {
                    // Here you would filter based on the star rating
                    review.style.display = 'block';
                }
            });
        });
    });
    
    // Load more reviews button
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more reviews
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    // Add more review cards
                    const reviewsList = document.querySelector('.reviews-list');
                    const newReview = document.querySelector('.review-card').cloneNode(true);
                    reviewsList.appendChild(newReview);
                    
                    // Animate new review
                    gsap.fromTo(newReview, 
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5 }
                    );
                }
            });
        });
    }
    
    // Like button functionality
    document.addEventListener('click', function(e) {
        if (e.target.closest('.like-btn')) {
            const likeBtn = e.target.closest('.like-btn');
            likeBtn.classList.toggle('liked');
            
            // Animate the like
            gsap.to(likeBtn, {
                scale: 1.2,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        }
    });
    
    // Animate elements on scroll
    gsap.from('.cafe-header', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out"
    });
    
    gsap.from('.cafe-details .detail-item', {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.4,
        ease: "power3.out"
    });
    
    gsap.from('.action-buttons .primary-btn, .action-buttons .secondary-btn', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.6,
        ease: "back.out(1.7)"
    });
    
    // Section animations
    const sections = document.querySelectorAll('.cafe-features, .opening-hours-section, .reviews-section, .similar-cafes');
    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power3.out"
        });
    });
    
    // Progress indicator
    gsap.to('.progress-bar', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    });
    
    // Parallax effect on hero image
    gsap.to('.hero-img', {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.cafe-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
    
    // Stagger animation for feature tags
    gsap.from('.feature-tag', {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.5,
        stagger: 0.05,
        scrollTrigger: {
            trigger: '.cafe-features',
            start: 'top 80%'
        },
        ease: "back.out(1.7)"
    });
    
    // Similar cafes animation
    gsap.from('.similar-cafe-card', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.similar-cafes',
            start: 'top 80%'
        },
        ease: "power3.out"
    });
    
    // Generate similar cafes dynamically
    function generateSimilarCafes() {
        const similarCafesGrid = document.querySelector('.similar-cafes-grid');
        if (!similarCafesGrid || !window.cafesData) return;
        
        // Get current cafe ID from URL or data attribute
        const currentCafeName = document.querySelector('h1').textContent;
        
        // Filter out current cafe and get random similar cafes
        const similarCafes = window.cafesData
            .filter(cafe => cafe.name !== currentCafeName)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
        
        similarCafes.forEach(cafe => {
            const cafeCard = document.createElement('div');
            cafeCard.className = 'similar-cafe-card';
            
            const fileName = cafe.name.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '') + '.html';
            
            cafeCard.innerHTML = `
                <a href="${fileName}">
                    <img src="${cafe.imageUrl}" alt="${cafe.name}">
                    <div class="similar-cafe-info">
                        <h4>${cafe.name}</h4>
                        <div class="rating">
                            <span>⭐⭐⭐⭐⭐</span>
                            <span>${cafe.rating}</span>
                            <span>(${cafe.reviewCount} reviews)</span>
                        </div>
                        <p class="location">${cafe.neighborhood}</p>
                    </div>
                </a>
            `;
            
            similarCafesGrid.appendChild(cafeCard);
        });
    }
    
    // Call the function
    generateSimilarCafes();
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.primary-btn, .secondary-btn, .save-btn, .filter-btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.2,
                ease: "power2.out"
            });
        });
        
        element.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.2,
                ease: "power2.out"
            });
        });
    });
    
    // Add click effects
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            gsap.to(this, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
    });
});