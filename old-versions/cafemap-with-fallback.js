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
    
    // Initialize OpenLayers as fallback to Mapbox
    let map = null;
    let isMapboxMap = true;
    
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
    
    // Create markers for each cafe
    const markers = {};
    
    // Helper to hide loading overlay
    const hideLoader = () => {
        const loader = document.querySelector('.loading-overlay');
        if (loader) {
            loader.style.display = 'none';
        }
    };
    
    // Try Mapbox first
    async function initializeMapbox() {
        try {
            // Initialize Mapbox with improved configuration
            mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
            
            map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [112.751, -7.257], // Surabaya coordinates
                zoom: 13,
                hash: false,
                interactive: true,
                preserveDrawingBuffer: true
            });
            
            // Add controls
            map.addControl(new mapboxgl.NavigationControl());
            
            // Add geolocate control
            const geolocate = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserHeading: true
            });
            map.addControl(geolocate);
            
            // Wait for style to load
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('Map style load timeout'));
                }, 5000);
                
                map.on('style.load', () => {
                    clearTimeout(timeout);
                    resolve();
                });
            });
            
            hideLoader();
            addMapboxMarkers();
            
            // Trigger geolocation
            setTimeout(() => {
                geolocate.trigger();
            }, 1000);
            
        } catch (error) {
            console.log('Mapbox failed, switching to OpenStreetMap...', error);
            initializeOpenLayers();
        }
    }
    
    // Fallback to OpenLayers with OpenStreetMap
    function initializeOpenLayers() {
        try {
            isMapboxMap = false;
            
            // Include OpenLayers dynamically
            const olCSS = document.createElement('link');
            olCSS.rel = 'stylesheet';
            olCSS.href = 'https://cdn.jsdelivr.net/npm/ol@v7.1.0/ol.css';
            document.head.appendChild(olCSS);
            
            const olScript = document.createElement('script');
            olScript.src = 'https://cdn.jsdelivr.net/npm/ol@v7.1.0/dist/ol.js';
            
            document.head.appendChild(olScript);
            
            olScript.onload = function() {
                // OpenLayers uses different coordinate system
                const center = ol.proj.fromLonLat([112.751, -7.257]);
                
                map = new ol.Map({
                    target: 'map',
                    layers: [
                        new ol.layer.Tile({
                            source: new ol.source.OSM()
                        })
                    ],
                    view: new ol.View({
                        center: center,
                        zoom: 13
                    })
                });
                
                hideLoader();
                addOpenLayersMarkers();
            };
        } catch (error) {
            console.error('OpenLayers initialization failed:', error);
            hideLoader();
        }
    }
    
    // Add markers for Mapbox
    function addMapboxMarkers() {
        cafes.forEach(cafe => {
            // Create a DOM element for the marker
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.width = '30px';
            el.style.height = '30px';
            el.style.backgroundImage = `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23F05438"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>')`;
            el.style.backgroundSize = '100%';
            el.style.backgroundRepeat = 'no-repeat';
            el.style.cursor = 'pointer';
            
            // Add tags as data attributes
            cafe.tags.forEach(tag => {
                el.setAttribute(`data-${tag}`, true);
            });
            
            // Create popup
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(createPopupHTML(cafe));
            
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
        
        fitMapToMarkers();
    }
    
    // Add markers for OpenLayers
    function addOpenLayersMarkers() {
        const features = cafes.map(cafe => {
            const feature = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.fromLonLat([cafe.lng, cafe.lat])),
                name: cafe.name,
                id: cafe.id,
                cafe: cafe
            });
            
            // Add tags as properties
            cafe.tags.forEach(tag => {
                feature.set(tag, true);
            });
            
            return feature;
        });
        
        const vectorSource = new ol.source.Vector({
            features: features
        });
        
        const vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: new ol.style.Style({
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    src: 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23F05438"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>'
                })
            })
        });
        
        map.addLayer(vectorLayer);
        
        // Add click handler for popup
        const popup = new ol.Overlay({
            element: document.createElement('div'),
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -25]
        });
        map.addOverlay(popup);
        
        map.on('click', function(evt) {
            const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
                return feature;
            });
            
            if (feature) {
                const cafe = feature.get('cafe');
                popup.getElement().innerHTML = createPopupHTML(cafe);
                popup.getElement().className = 'ol-popup';
                popup.setPosition(feature.getGeometry().getCoordinates());
                
                // Style the popup
                popup.getElement().style.cssText = `
                    background: white;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                    position: relative;
                `;
            } else {
                popup.setPosition(undefined);
            }
        });
        
        // Store markers for filtering
        features.forEach(feature => {
            const id = feature.get('id');
            markers[id] = {
                feature: feature,
                cafe: feature.get('cafe')
            };
        });
        
        // Fit to markers
        const extent = vectorSource.getExtent();
        map.getView().fit(extent, { padding: [50, 50, 50, 50] });
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
        
        if (isMapboxMap) {
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
        } else {
            // OpenLayers filtering
            Object.values(markers).forEach(({ feature }) => {
                if (filter === 'all' || feature.get(filter)) {
                    feature.setStyle(null); // Use default style
                } else {
                    feature.setStyle(new ol.style.Style({})); // Hide marker
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
            if (isMapboxMap) {
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
            } else {
                // OpenLayers fitting
                const features = Object.values(markers)
                    .filter(({ feature }) => feature.getStyle() !== undefined && feature.getStyle().getImage())
                    .map(({ feature }) => feature);
                
                if (features.length > 0) {
                    const extent = new ol.source.Vector({ features }).getExtent();
                    map.getView().fit(extent, { padding: [50, 50, 50, 50] });
                }
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
    
    // Initialize map
    initializeMapbox();
});