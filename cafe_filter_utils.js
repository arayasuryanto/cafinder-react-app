// Cafe Filter Utilities for Frontend
// Functions to filter cafes by region for the catalog page

/**
 * Filter cafes by region
 * @param {Array} cafes - Array of cafe objects
 * @param {string} region - Region filter ('Semua', 'SBY Utara', 'SBY Selatan', 'SBY Timur', 'SBY Barat')
 * @returns {Array} Filtered cafes array
 */
function filterCafesByRegion(cafes, region) {
    // If "Semua" (All) is selected, return all cafes
    if (region === 'Semua' || !region) {
        return cafes;
    }
    
    // Filter by specific region
    return cafes.filter(cafe => cafe.region === region);
}

/**
 * Get cafe count by region
 * @param {Array} cafes - Array of cafe objects
 * @returns {Object} Object with region counts
 */
function getCafeCountsByRegion(cafes) {
    const counts = {
        'Semua': cafes.length,
        'SBY Utara': 0,
        'SBY Selatan': 0,
        'SBY Timur': 0,
        'SBY Barat': 0
    };
    
    cafes.forEach(cafe => {
        const region = cafe.region;
        if (counts.hasOwnProperty(region)) {
            counts[region]++;
        }
    });
    
    return counts;
}

/**
 * Get region display name with count
 * @param {string} region - Region key
 * @param {Object} counts - Counts object from getCafeCountsByRegion
 * @returns {string} Display name with count
 */
function getRegionDisplayName(region, counts) {
    const count = counts[region] || 0;
    return `${region} (${count})`;
}

/**
 * Region configuration for UI
 */
const REGION_CONFIG = [
    { key: 'Semua', label: 'Semua', description: 'All cafes in Surabaya' },
    { key: 'SBY Utara', label: 'SBY Utara', description: 'North Surabaya (Lakarsantri, Kenjeran, Mulyorejo, etc.)' },
    { key: 'SBY Selatan', label: 'SBY Selatan', description: 'South Surabaya (Pakuwon, Citraland, Gayungan, etc.)' },
    { key: 'SBY Timur', label: 'SBY Timur', description: 'East Surabaya (MERR, Rungkut, Sukolilo, etc.)' },
    { key: 'SBY Barat', label: 'SBY Barat', description: 'West Surabaya (Tunjungan, Genteng, Bubutan, etc.)' }
];

/**
 * Example usage in React component:
 */

/*
import React, { useState, useMemo } from 'react';

function CafeCatalog({ cafes }) {
    const [selectedRegion, setSelectedRegion] = useState('Semua');
    
    // Filter cafes based on selected region
    const filteredCafes = useMemo(() => {
        return filterCafesByRegion(cafes, selectedRegion);
    }, [cafes, selectedRegion]);
    
    // Get counts for all regions
    const regionCounts = useMemo(() => {
        return getCafeCountsByRegion(cafes);
    }, [cafes]);
    
    return (
        <div>
            <div className="region-filters">
                {REGION_CONFIG.map(region => (
                    <button
                        key={region.key}
                        className={`region-btn ${selectedRegion === region.key ? 'active' : ''}`}
                        onClick={() => setSelectedRegion(region.key)}
                    >
                        {getRegionDisplayName(region.key, regionCounts)}
                    </button>
                ))}
            </div>
            
            <div className="cafe-grid">
                {filteredCafes.map(cafe => (
                    <CafeCard key={cafe.id} cafe={cafe} />
                ))}
            </div>
        </div>
    );
}
*/

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        filterCafesByRegion,
        getCafeCountsByRegion,
        getRegionDisplayName,
        REGION_CONFIG
    };
}