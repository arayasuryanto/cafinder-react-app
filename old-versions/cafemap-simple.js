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
    
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    gsap.to(filterBtns, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)"
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            filterMarkers(filter);
        });
    });
    
    // Sample cafe data
    const cafes = [
        {
            id: 1,
            name: "KopiLot Surabaya",
            lat: -7.257,
            lng: 112.741,
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
            lat: -7.262,
            lng: 112.743,
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
            lat: -7.255,
            lng: 112.753,
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
            lat: -7.248,
            lng: 112.756,
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
            lat: -7.265,
            lng: 112.738,
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
            lat: -7.252,
            lng: 112.761,
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
            lat: -7.277,
            lng: 112.745,
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
            lat: -7.287,
            lng: 112.726,
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
            lat: -7.275,
            lng: 112.767,
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
            lat: -7.258,
            lng: 112.732,
            rating: 4.6,
            reviews: 203,
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1935&auto=format&fit=crop",
            address: "Jl. Dharmahusada Indah Utara, Surabaya",
            tags: ["instagramable", "workfriendly", "popular"],
            price: "$$",
            category: "Coffee, Breakfast"
        }
    ];
    
    // Create markers storage
    const markers = {};
    
    // Helper to hide loading overlay
    const hideLoader = () => {
        const loader = document.querySelector('.loading-overlay');
        if (loader) {
            loader.style.display = 'none';
        }
    };
    
    // Initialize Leaflet map as fallback (simpler alternative)
    function initializeLeafletMap() {
        // Include Leaflet dynamically
        const leafletCSS = document.createElement('link');
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
        document.head.appendChild(leafletCSS);
        
        const leafletScript = document.createElement('script');
        leafletScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
        
        document.head.appendChild(leafletScript);
        
        leafletScript.onload = function() {
            // Remove any existing map
            const mapContainer = document.getElementById('map');
            mapContainer.innerHTML = '';
            
            // Initialize Leaflet map
            const map = L.map('map').setView([-7.257, 112.751], 13);
            
            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            // Custom marker icon
            const customIcon = L.divIcon({
                className: 'custom-cafe-marker',
                html: `<div style="width: 30px; height: 30px; background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 24 24\\" fill=\\"%23F05438\\"><path d=\\"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z\\"/></svg>') center/contain no-repeat;"></div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30]
            });
            
            // Add markers
            cafes.forEach(cafe => {
                const marker = L.marker([cafe.lat, cafe.lng], { icon: customIcon })
                    .addTo(map)
                    .bindPopup(createPopupHTML(cafe));
                
                // Add tags to marker
                cafe.tags.forEach(tag => {
                    marker.options[tag] = true;
                });
                
                markers[cafe.id] = {
                    marker: marker,
                    cafe: cafe
                };
            });
            
            // Add geolocation control
            const locateButton = L.control({ position: 'topright' });
            locateButton.onAdd = function() {
                const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                div.style.backgroundColor = 'white';
                div.style.width = '34px';
                div.style.height = '34px';
                div.innerHTML = '<div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; cursor: pointer;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#646464"/></svg></div>';
                div.onclick = function() {
                    map.locate({ setView: true, maxZoom: 16 });
                };
                return div;
            };
            locateButton.addTo(map);
            
            // Handle location found
            map.on('locationfound', function(e) {
                L.marker(e.latlng)
                    .addTo(map)
                    .bindPopup('You are here!')
                    .openPopup();
            });
            
            hideLoader();
            
            // Save map instance globally
            window.cafeMap = map;
        };
    }
    
    // Try to initialize map
    function initializeMap() {
        // Try Leaflet (more reliable)
        initializeLeafletMap();
    }
    
    // Create popup HTML
    function createPopupHTML(cafe) {
        return `
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
        `;
    }
    
    // Setup click handlers
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
        
        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<span class="star">★</span>';
        }
        
        if (halfStar) {
            starsHtml += '<span class="star">⯪</span>';
        }
        
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<span class="star">☆</span>';
        }
        
        return starsHtml;
    }
    
    // Filter markers
    function filterMarkers(filter) {
        if (!markers || Object.keys(markers).length === 0) {
            return;
        }
        
        if (filter === 'all') {
            Object.values(markers).forEach(({ marker }) => {
                marker.addTo(window.cafeMap);
            });
        } else {
            Object.values(markers).forEach(({ marker }) => {
                if (marker.options[filter]) {
                    marker.addTo(window.cafeMap);
                } else {
                    window.cafeMap.removeLayer(marker);
                }
            });
        }
    }
    
    // Local storage functions
    function getSavedCafes() {
        try {
            const saved = localStorage.getItem('savedCafes');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
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
    
    // Update saved cafes UI
    function updateSavedCafesUI() {
        const savedContainer = document.querySelector('.saved-cafes-container');
        if (!savedContainer) return;
        
        const savedCafesIds = getSavedCafes();
        const countElement = document.querySelector('.saved-cafes-count');
        if (countElement) {
            countElement.textContent = savedCafesIds.length;
        }
        
        if (savedCafesIds.length === 0) {
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
    
    // Initial update
    updateSavedCafesUI();
    
    // Initialize map
    initializeMap();
});