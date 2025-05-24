// Enhanced catalog.js with functionality for search, filter, and links to individual cafe pages

document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Load cafes data
    let allCafes = [];
    let filteredCafes = [];
    let currentPage = 1;
    const cafesPerPage = 12;
    let currentFilters = {
        search: '',
        rating: '',
        neighborhood: '',
        category: 'all'
    };
    
    // Load cafes data from the JSON file
    fetch('./cafes_preview.json')
        .then(response => response.json())
        .then(data => {
            allCafes = data;
            filteredCafes = [...allCafes];
            renderCafes();
            populateFilters();
        })
        .catch(error => {
            console.error('Error loading cafe data:', error);
            // Fallback to cafesData if available
            if (typeof cafesData !== 'undefined') {
                allCafes = [...cafesData];
                filteredCafes = [...allCafes];
                renderCafes();
                populateFilters();
            }
        });
    
    // Function to create cafe card with link
    function createCafeCard(cafe) {
        const fileName = cafe.name.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') + '.html';
        
        const card = document.createElement('div');
        card.className = 'cafe-card';
        
        // Determine card size based on popularity
        if (cafe.reviewCount > 500) {
            card.classList.add('wide');
        } else if (cafe.reviewCount > 200) {
            card.classList.add('large');
        } else if (cafe.reviewCount > 100) {
            card.classList.add('medium');
        } else {
            card.classList.add('small');
        }
        
        // Generate image URL
        const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(cafe.name)}/600/400`;
        
        // Set background image
        card.style.backgroundImage = `url('${imageUrl}')`;
        
        // Parse neighborhood and city from address
        const addressParts = cafe.address.split(',');
        const neighborhood = addressParts[0] || '';
        const city = addressParts[addressParts.length - 1]?.trim() || 'Surabaya';
        
        card.innerHTML = `
            <a href="cafes/${fileName}" style="display: block; height: 100%; text-decoration: none; color: inherit;">
                <div class="cafe-card-content">
                    <span class="card-tag">${cafe.reviewCount} Reviews</span>
                    <h3>${cafe.name}</h3>
                    <div class="cafe-location">
                        <div class="location-icon">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="white"/>
                            </svg>
                        </div>
                        <span>${neighborhood}, ${city}</span>
                    </div>
                    <div class="cafe-rating" style="margin-top: 8px;">
                        <span style="color: #FFC107;">${'⭐'.repeat(Math.floor(cafe.rating))}${'☆'.repeat(5 - Math.floor(cafe.rating))}</span>
                        <span style="color: white; font-weight: 600;">${cafe.rating}</span>
                    </div>
                </div>
            </a>
        `;
        
        return card;
    }
    
    // Function to render cafes
    function renderCafes() {
        const grid = document.getElementById('cafe-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        const startIndex = (currentPage - 1) * cafesPerPage;
        const endIndex = startIndex + cafesPerPage;
        const cafesToShow = filteredCafes.slice(startIndex, endIndex);
        
        cafesToShow.forEach(cafe => {
            const card = createCafeCard(cafe);
            grid.appendChild(card);
        });
        
        // Animate cafe cards
        gsap.from('.cafe-card', {
            opacity: 0,
            y: 30,
            scale: 0.95,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.7)"
        });
        
        updatePagination();
        updateResultsCount();
    }
    
    // Function to update results count
    function updateResultsCount() {
        const resultsCount = document.getElementById('results-count');
        const totalResults = document.getElementById('total-results');
        
        if (resultsCount && totalResults) {
            resultsCount.textContent = filteredCafes.length;
            totalResults.textContent = allCafes.length;
        }
    }
    
    // Function to update pagination
    function updatePagination() {
        const paginationNumbers = document.getElementById('pagination-numbers');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        if (!paginationNumbers) return;
        
        const totalPages = Math.ceil(filteredCafes.length / cafesPerPage);
        paginationNumbers.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `pagination-number ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderCafes();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            paginationNumbers.appendChild(pageBtn);
        }
        
        if (prevBtn) {
            prevBtn.disabled = currentPage === 1;
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderCafes();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentPage === totalPages;
            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    renderCafes();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    }
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentFilters.search = this.value.toLowerCase();
            applyFilters();
        });
    }
    
    // Filter functionality
    const ratingFilter = document.getElementById('filter-rating');
    const neighborhoodFilter = document.getElementById('filter-neighborhood');
    
    if (ratingFilter) {
        ratingFilter.addEventListener('change', function() {
            currentFilters.rating = this.value;
            applyFilters();
        });
    }
    
    if (neighborhoodFilter) {
        neighborhoodFilter.addEventListener('change', function() {
            currentFilters.neighborhood = this.value;
            applyFilters();
        });
    }
    
    // Category filters
    const categoryBtns = document.querySelectorAll('.location-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilters.category = this.dataset.filter || 'all';
            applyFilters();
        });
    });
    
    // Apply all filters
    function applyFilters() {
        filteredCafes = allCafes.filter(cafe => {
            // Search filter
            if (currentFilters.search && !cafe.name.toLowerCase().includes(currentFilters.search) &&
                !cafe.address.toLowerCase().includes(currentFilters.search)) {
                return false;
            }
            
            // Rating filter
            if (currentFilters.rating && parseFloat(cafe.rating) < parseFloat(currentFilters.rating)) {
                return false;
            }
            
            // Neighborhood filter
            if (currentFilters.neighborhood) {
                const neighborhood = cafe.address.split(',')[0] || '';
                if (neighborhood !== currentFilters.neighborhood) {
                    return false;
                }
            }
            
            // Category filter
            if (currentFilters.category !== 'all') {
                switch(currentFilters.category) {
                    case 'popular':
                        return cafe.reviewCount > 300;
                    case 'cozy':
                        return cafe.additionalInfo?.Atmosphere?.some(attr => 
                            Object.keys(attr)[0].toLowerCase().includes('cozy'));
                    case 'workfriendly':
                        return cafe.additionalInfo?.['Popular for']?.some(attr => 
                            Object.keys(attr)[0].toLowerCase().includes('working') ||
                            Object.keys(attr)[0].toLowerCase().includes('laptop'));
                    case 'instagramable':
                        return cafe.additionalInfo?.Atmosphere?.some(attr => 
                            Object.keys(attr)[0].toLowerCase().includes('trendy') ||
                            Object.keys(attr)[0].toLowerCase().includes('hipster'));
                    case 'hidden':
                        return cafe.reviewCount < 100;
                }
            }
            
            return true;
        });
        
        currentPage = 1;
        renderCafes();
    }
    
    // Sort functionality
    const sortButton = document.getElementById('sort-button');
    if (sortButton) {
        sortButton.addEventListener('click', function() {
            // Cycle through sort options
            const options = ['rating', 'reviews', 'name'];
            let currentSort = this.dataset.sort || 'rating';
            let currentIndex = options.indexOf(currentSort);
            currentIndex = (currentIndex + 1) % options.length;
            currentSort = options[currentIndex];
            this.dataset.sort = currentSort;
            
            // Apply sort
            filteredCafes.sort((a, b) => {
                switch(currentSort) {
                    case 'rating':
                        return parseFloat(b.rating) - parseFloat(a.rating);
                    case 'reviews':
                        return b.reviewCount - a.reviewCount;
                    case 'name':
                        return a.name.localeCompare(b.name);
                }
            });
            
            // Update button text
            this.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Sort by ${currentSort}
            `;
            
            renderCafes();
        });
    }
    
    // Animations
    gsap.from('.page-heading h1', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
    });
    
    gsap.from('.page-heading p', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out"
    });
    
    gsap.from('.search-filter-bar', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.4,
        ease: "power3.out"
    });
    
    gsap.from('.location-btn', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.6,
        ease: "back.out(1.7)"
    });
    
    // Hover effects for cafe cards
    document.addEventListener('mouseover', function(e) {
        const card = e.target.closest('.cafe-card');
        if (card) {
            gsap.to(card, {
                y: -10,
                scale: 1.02,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        const card = e.target.closest('.cafe-card');
        if (card) {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                duration: 0.3,
                ease: "power2.out"
            });
        }
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
    
    // Populate filter dropdowns
    function populateFilters() {
        const neighborhoodFilter = document.getElementById('filter-neighborhood');
        if (neighborhoodFilter && allCafes.length > 0) {
            const neighborhoods = [...new Set(allCafes.map(cafe => {
                const neighborhood = cafe.address.split(',')[0] || '';
                return neighborhood.trim();
            }))].filter(n => n);
            
            neighborhoods.forEach(neighborhood => {
                const option = document.createElement('option');
                option.value = neighborhood;
                option.textContent = neighborhood;
                neighborhoodFilter.appendChild(option);
            });
        }
    }
});