// Configuration file for API keys
const config = {
    // Default fallback Mapbox API key
    mapboxToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA',
    
    // Get Mapbox token from environment or local storage if available
    getMapboxToken: function() {
        // First try to get from data attribute in script tag (populated by server)
        const scriptTag = document.querySelector('script[data-mapbox-key]');
        if (scriptTag && scriptTag.dataset.mapboxKey) {
            return scriptTag.dataset.mapboxKey;
        }
        
        // Then try localStorage (set by a settings page)
        const localStorageKey = localStorage.getItem('mapbox_api_key');
        if (localStorageKey) {
            return localStorageKey;
        }
        
        // Finally, use the hardcoded key from .env file
        // For security in production, this should be replaced with a server-side solution
        const envKey = 'pk.eyJ1IjoiZW5zdGVpbnJheXMiLCJhIjoiY21haHpkc2kyMGF4dTJxb2lneGM5dnluaSJ9.SVb7BdQETWs9s0NPbRynRw';
        
        if (envKey) {
            return envKey;
        }
        
        // Warning for production use
        console.warn('Using demo Mapbox API key. Please replace with your own key for production use.');
        console.warn('Visit https://account.mapbox.com/ to get your API key.');
        
        return this.mapboxToken;
    }
};

// Make config available globally
window.cafinderConfig = config;
