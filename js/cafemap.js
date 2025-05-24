document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Cursor follower
    const cursor = document.querySelector('.cursor-follower');
    let mouseX = 0;
    let mouseY = 0;
    
    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Fade in cursor when mouse moves
        gsap.to(cursor, {
            opacity: 0.5,
            duration: 0.3
        });
    });
    
    gsap.ticker.add(() => {
        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0.2
        });
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            opacity: 0,
            duration: 0.3
        });
    });
    
    // Scroll progress indicator
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
    
    // Animations for map elements
    const filterBtns = document.querySelectorAll('.filter-btn');
    gsap.to(filterBtns, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)"
    });
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Apply filter to map markers
            filterMarkers(filter);
        });
    });
    
    // Initialize Mapbox with improved configuration
    // Get API key from config
    mapboxgl.accessToken = window.cafinderConfig.getMapboxToken();
    
    let map = null;
    
    try {
        map = new mapboxgl.Map({
            container: 'map',
            // Try a different style that might be more reliable
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [112.751, -7.257], // Surabaya coordinates
            zoom: 13,
            // Force refresh and set loading options
            hash: false,
            interactive: true,
            preserveDrawingBuffer: true,
            fadeDuration: 0,
            maxBounds: [[110, -9], [115, -5]], // Limit bounds to area around Surabaya
        });
    } catch (e) {
        console.error("Error initializing map:", e);
        document.querySelector('.loading-overlay').innerHTML = `
            <div style="color: #F05438; text-align: center;">
                <p>Error loading map. Please refresh the page.</p>
                <p>Technical details: ${e.message}</p>
            </div>
        `;
        return; // Stop execution if map fails to initialize
    }
    
    // Make sure to hide loading overlay even if there's an error
    const hideLoader = () => {
        const loader = document.querySelector('.loading-overlay');
        if (loader) {
            loader.style.display = 'none';
        }
    };
    
    // Add a more aggressive timeout
    setTimeout(hideLoader, 3000);
    
    // Add a simple language setting
    map.on('style.load', () => {
        // Force reload the style if it hasn't loaded properly
        if (!map.isStyleLoaded()) {
            console.log('Style not loaded, forcing reload...');
            map.setStyle('mapbox://styles/mapbox/streets-v11');
        }
    });
    
    // Add zoom and rotation controls to the map
    try {
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
        // Add geolocate control to the map with improved configuration
        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true,
            showUserLocation: true,
            fitBoundsOptions: {
                maxZoom: 15
            }
        });
        map.addControl(geolocate, 'top-right');
        
        // Add error handling for geolocation
        geolocate.on('error', function(e) {
            console.log('Geolocation error:', e);
            alert('Could not get your location. Please make sure location services are enabled.');
        });
        
        // Add alternative geolocation button as backup
        const backupGeolocate = {
            element: null,
            onAdd: function(map) {
                this._map = map;
                this.element = document.createElement('div');
                this.element.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
                this.element.innerHTML = `
                    <button type="button" title="Find my location" aria-label="Find my location" style="background: white; border: none; padding: 0; width: 30px; height: 30px; cursor: pointer;">
                        📍
                    </button>
                `;
                
                this.element.querySelector('button').onclick = () => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                map.flyTo({
                                    center: [position.coords.longitude, position.coords.latitude],
                                    zoom: 15
                                });
                                
                                // Add marker for current location
                                if (window.userLocationMarker) {
                                    window.userLocationMarker.remove();
                                }
                                
                                window.userLocationMarker = new mapboxgl.Marker({
                                    color: '#3B82F6'
                                })
                                .setLngLat([position.coords.longitude, position.coords.latitude])
                                .setPopup(new mapboxgl.Popup().setHTML('<strong>You are here!</strong>'))
                                .addTo(map)
                                .togglePopup();
                            },
                            (error) => {
                                console.log('Backup geolocation error:', error);
                                alert('Could not get your location. Please make sure location services are enabled.');
                            },
                            {
                                enableHighAccuracy: true,
                                timeout: 10000,
                                maximumAge: 0
                            }
                        );
                    } else {
                        alert('Geolocation is not supported by your browser.');
                    }
                };
                
                return this.element;
            },
            onRemove: function() {
                this.element.parentNode.removeChild(this.element);
                this._map = undefined;
            }
        };
        
        map.addControl(backupGeolocate, 'top-right');
    } catch (e) {
        console.error("Error adding controls:", e);
    }
    
    // Sample cafe data
    const cafes = [
        {
            id: 1,
            name: "KopiLot Surabaya",
            lng: 112.741,
            lat: -7.257,
            rating: 4.7,
            reviews: 218,
            image: "https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?q=80&w=2070&auto=format&fit=crop",
            address: "Tunjungan Plaza Ground Floor, Jl. Tunjungan Pusat, Surabaya",
            tags: ["popular", "cozy", "workfriendly"],
            price: "$$",
            category: "Coffee Shop"
        },
        {
            id: 2,
            name: "Pavilion Restaurant",
            lng: 112.743,
            lat: -7.262,
            rating: 4.8,
            reviews: 394,
            image: "https://images.unsplash.com/photo-1577037906878-976ab7fd9c19?q=80&w=2070&auto=format&fit=crop",
            address: "Jl. Ketintang Baru No.23, Ketintang, Surabaya",
            tags: ["popular", "romantic", "finedining"],
            price: "$$$$",
            category: "European, Asian"
        },
        {
            id: 3,
            name: "Steaklab Steakhouse",
            lng: 112.753,
            lat: -7.255,
            rating: 5.0,
            reviews: 351,
            image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2071&auto=format&fit=crop",
            address: "Galaxy Mall, Lt. 3, Jl. Dharmahusada Indah Timur, Surabaya",
            tags: ["popular", "family"],
            price: "$$",
            category: "Steakhouse, American"
        },
        {
            id: 4,
            name: "Omah Tua Coffee and Library",
            lng: 112.756,
            lat: -7.248,
            rating: 4.5,
            reviews: 102,
            image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2071&auto=format&fit=crop",
            address: "Jl. Imam Bonjol Gang IX, Krembangan Utara, Surabaya",
            tags: ["cozy", "workfriendly", "hidden"],
            price: "$$",
            category: "Coffee, Library"
        },
        {
            id: 5,
            name: "Teras Ujung",
            lng: 112.738,
            lat: -7.265,
            rating: 4.6,
            reviews: 124,
            image: "https://images.unsplash.com/photo-1570537063239-3be57338a8dd?q=80&w=2070&auto=format&fit=crop",
            address: "Jl. Kalijudan Barat No.2, Petrak, Surabaya",
            tags: ["cozy", "instagramable", "hidden"],
            price: "$$",
            category: "Coffee, Cakes"
        },
        {
            id: 6,
            name: "Fifteenth Coffee Kota Lama",
            lng: 112.761,
            lat: -7.252,
            rating: 4.2,
            reviews: 93,
            image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2071&auto=format&fit=crop",
            address: "Jl. Mliwis No.5, Krembangan Selatan, Surabaya",
            tags: ["hidden", "instagramable"],
            price: "$",
            category: "Coffee, Bakery"
        },
        {
            id: 7,
            name: "Zaman Dulu Cafe",
            lng: 112.745,
            lat: -7.277,
            rating: 4.3,
            reviews: 87,
            image: "https://images.unsplash.com/photo-1518212894714-b943b68ef5cb?q=80&w=1936&auto=format&fit=crop",
            address: "Jl. Pasar Turi No.18, RT.002/RW.10, Surabaya",
            tags: ["family", "instagramable"],
            price: "$$",
            category: "Indonesian, Cafe"
        },
        {
            id: 8,
            name: "Redback Specialty Coffee",
            lng: 112.726,
            lat: -7.287,
            rating: 4.8,
            reviews: 115,
            image: "https://images.unsplash.com/photo-1486427143288-55842718c47c?q=80&w=2070&auto=format&fit=crop",
            address: "Jl. Ploso Timur I/8, Ploso, Surabaya",
            tags: ["popular", "workfriendly"],
            price: "$$",
            category: "Coffee, Brunch"
        },
        {
            id: 9,
            name: "Kudos Cafe",
            lng: 112.767,
            lat: -7.275,
            rating: 4.5,
            reviews: 95,
            image: "https://images.unsplash.com/photo-1572286975396-c8dac4d4ba33?q=80&w=1935&auto=format&fit=crop",
            address: "Jalan Pahlawan Square, Blok A3, Surabaya",
            tags: ["workfriendly", "hidden"],
            price: "$$",
            category: "Coffee, Fusion"
        },
        {
            id: 10,
            name: "Macehat Coffee",
            lng: 112.732,
            lat: -7.258,
            rating: 4.6,
            reviews: 203,
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1935&auto=format&fit=crop",
            address: "Jl. Dharmahusada Indah Utara, Surabaya",
            tags: ["instagramable", "workfriendly", "popular"],
            price: "$$",
            category: "Coffee, Breakfast"
        }
    ];
    
    // Create markers for each cafe
    const markers = {};
    
    // Fix: Add a check if map is valid
    if (!map) {
        hideLoader();
        return;
    }
    
    // Fix: More robust error handling for map load event
    let mapLoaded = false;
    
    // Function to add markers
    function addMarkers() {
        try {
            // Add markers to map
            cafes.forEach(cafe => {
                // Create a DOM element for the marker
                const el = document.createElement('div');
                el.className = 'marker';
                el.style.width = '30px';
                el.style.height = '30px';
                // Fix: Use a more reliable marker icon
                el.style.backgroundImage = `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23F05438"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>')`;
                el.style.backgroundSize = '100%';
                el.style.backgroundRepeat = 'no-repeat';
                el.style.cursor = 'pointer';
                
                // Add tags as data attributes
                cafe.tags.forEach(tag => {
                    el.setAttribute(`data-${tag}`, true);
                });
                
                // Create popup
                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                    <div class="popup-content">
                        <img src="${cafe.image}" class="popup-image" alt="${cafe.name}" />
                        <div class="popup-details">
                            <span class="popup-tag">${cafe.category}</span>
                            <h3 class="popup-name">${cafe.name}</h3>
                            <div class="popup-rating">
                                <div class="rating-stars">
                                    ${generateStars(cafe.rating)}
                                </div>
                                <span class="rating-count">(${cafe.reviews})</span>
                            </div>
                            <div class="popup-address">${cafe.address}</div>
                            <div class="popup-price">${cafe.price}</div>
                            <div class="popup-actions">
                                <button class="save-btn" data-id="${cafe.id}">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                    </svg>
                                    Save
                                </button>
                                <button class="view-btn" onclick="window.location.href='catalog.html'">View Details</button>
                            </div>
                        </div>
                    </div>
                `);
                
                // Create marker and add to map
                const marker = new mapboxgl.Marker(el)
                    .setLngLat([cafe.lng, cafe.lat])
                    .setPopup(popup)
                    .addTo(map);
                
                // Store marker reference with cafe ID
                markers[cafe.id] = {
                    marker,
                    element: el,
                    cafe
                };
            });
            
            // Fit map to visible markers
            fitMapToMarkers();
        } catch (e) {
            console.error("Error adding markers:", e);
        }
    }
    
    // Wait for map to load
    map.on('load', function() {
        // Set map loaded flag
        mapLoaded = true;
        
        // Hide loading spinner after map loads
        hideLoader();
        
        // Add markers
        addMarkers();
    });
    
    // Alternative approach - add markers after a delay if map.on('load') doesn't fire
    setTimeout(() => {
        if (!mapLoaded) {
            console.log('Map load event not fired, attempting to add markers anyway...');
            hideLoader();
            addMarkers();
        }
    }, 2000);
    
    // Fix: Add error handling for the map
    map.on('error', function(e) {
        console.error('Mapbox error:', e.error);
        hideLoader();
    });
    
    // Try to force style loading after a delay
    setTimeout(() => {
        if (map && !map.isStyleLoaded()) {
            console.log('Forcing style reload...');
            try {
                map.setStyle('mapbox://styles/mapbox/streets-v11');
            } catch (e) {
                console.error('Failed to force style reload:', e);
            }
        }
    }, 4000);
    
    // Setup click handlers for save buttons in popups
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('save-btn') || e.target.closest('.save-btn')) {
            const saveBtn = e.target.classList.contains('save-btn') ? e.target : e.target.closest('.save-btn');
            const cafeId = saveBtn.getAttribute('data-id');
            
            toggleSavedCafe(cafeId);
            saveBtn.classList.toggle('saved');
            
            // Update button text
            if (saveBtn.classList.contains('saved')) {
                saveBtn.innerHTML = `
                    <svg viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    Saved
                `;
            } else {
                saveBtn.innerHTML = `
                    <svg viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    Save
                `;
            }
        }
    });
    
    // Helper function to generate star rating HTML
    function generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        let starsHtml = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<span class="star">★</span>';
        }
        
        // Half star
        if (halfStar) {
            starsHtml += '<span class="star">⯪</span>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<span class="star">☆</span>';
        }
        
        return starsHtml;
    }
    
    // Filter markers based on selected filter
    function filterMarkers(filter) {
        if (!markers || Object.keys(markers).length === 0) {
            console.warn("No markers available for filtering");
            return;
        }
        
        if (filter === 'all') {
            // Show all markers
            Object.values(markers).forEach(({ marker, element }) => {
                element.style.display = 'block';
            });
        } else {
            // Show only markers with matching tag
            Object.values(markers).forEach(({ marker, element }) => {
                if (element.hasAttribute(`data-${filter}`)) {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
            });
        }
        
        // Fit map to visible markers
        fitMapToMarkers();
    }
    
    // Fit map to visible markers
    function fitMapToMarkers() {
        if (!map || !markers || Object.keys(markers).length === 0) {
            return;
        }
        
        try {
            const bounds = new mapboxgl.LngLatBounds();
            let hasVisibleMarkers = false;
            
            Object.values(markers).forEach(({ marker, element }) => {
                if (element.style.display !== 'none') {
                    bounds.extend(marker.getLngLat());
                    hasVisibleMarkers = true;
                }
            });
            
            if (hasVisibleMarkers) {
                map.fitBounds(bounds, {
                    padding: 50,
                    maxZoom: 15
                });
            }
        } catch (e) {
            console.error("Error fitting map to markers:", e);
        }
    }
    
    // Local storage functions for saved cafes
    function getSavedCafes() {
        try {
            const saved = localStorage.getItem('savedCafes');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Error getting saved cafes:", e);
            return [];
        }
    }
    
    function saveCafes(cafes) {
        try {
            localStorage.setItem('savedCafes', JSON.stringify(cafes));
            updateSavedCafesUI();
        } catch (e) {
            console.error("Error saving cafes:", e);
        }
    }
    
    function toggleSavedCafe(cafeId) {
        const saved = getSavedCafes();
        const cafeIdNum = parseInt(cafeId);
        
        const index = saved.indexOf(cafeIdNum);
        if (index > -1) {
            saved.splice(index, 1);
        } else {
            saved.push(cafeIdNum);
        }
        
        saveCafes(saved);
    }
    
    // Update saved cafes section in UI
    function updateSavedCafesUI() {
        const savedContainer = document.querySelector('.saved-cafes-container');
        if (!savedContainer) return;
        
        const savedCafesIds = getSavedCafes();
        
        // Update count
        const countElement = document.querySelector('.saved-cafes-count');
        if (countElement) {
            countElement.textContent = savedCafesIds.length;
        }
        
        if (savedCafesIds.length === 0) {
            // Show empty state
            savedContainer.innerHTML = `
                <div class="no-saved-cafes">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    <p>No saved cafes yet</p>
                    <p>Click the save button on any cafe to add it to your collection</p>
                </div>
            `;
        } else {
            // Create cafe cards
            let cardsHtml = '';
            
            savedCafesIds.forEach(id => {
                const cafe = cafes.find(c => c.id === id);
                if (cafe) {
                    cardsHtml += `
                        <div class="saved-cafe-card">
                            <img src="${cafe.image}" class="saved-cafe-image" alt="${cafe.name}" />
                            <div class="saved-cafe-details">
                                <h3 class="saved-cafe-name">${cafe.name}</h3>
                                <div class="saved-cafe-rating">
                                    <div class="rating-stars">
                                        ${generateStars(cafe.rating)}
                                    </div>
                                    <span class="rating-count">(${cafe.reviews})</span>
                                </div>
                                <div class="saved-cafe-info">
                                    <span class="saved-cafe-category">${cafe.category}</span>
                                    <span>${cafe.price}</span>
                                </div>
                                <div class="saved-cafe-location">
                                    ${cafe.address}
                                </div>
                                <div class="saved-cafe-actions">
                                    <button class="remove-btn" data-id="${cafe.id}">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="currentColor"/>
                                        </svg>
                                        Remove
                                    </button>
                                    <a href="catalog.html" class="saved-cafe-view">View Details</a>
                                </div>
                            </div>
                        </div>
                    `;
                }
            });
            
            savedContainer.innerHTML = `<div class="saved-cafes-grid">${cardsHtml}</div>`;
            
            // Setup remove button handlers
            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const cafeId = parseInt(this.getAttribute('data-id'));
                    toggleSavedCafe(cafeId);
                    
                    // Also update any related save buttons in popups
                    const saveBtn = document.querySelector(`.save-btn[data-id="${cafeId}"]`);
                    if (saveBtn) {
                        saveBtn.classList.remove('saved');
                        saveBtn.innerHTML = `
                            <svg viewBox="0 0 24 24">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                            Save
                        `;
                    }
                });
            });
        }
    }
    
    // Initial update of saved cafes UI
    updateSavedCafesUI();
});