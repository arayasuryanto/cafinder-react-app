// Updated Cafe Filter Utilities for Frontend
// Functions to filter cafes by the correct 5 Surabaya regions

/**
 * Filter cafes by region
 * @param {Array} cafes - Array of cafe objects
 * @param {string} region - Region filter ('Semua', 'SBY Utara', 'SBY Selatan', 'SBY Timur', 'SBY Barat', 'SBY Pusat')
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
        'SBY Barat': 0,
        'SBY Pusat': 0
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
 * Region configuration for UI - Updated with correct 5 regions
 */
const REGION_CONFIG = [
    { 
        key: 'Semua', 
        label: 'Semua', 
        description: 'All cafes in Surabaya',
        color: '#6366f1' 
    },
    { 
        key: 'SBY Utara', 
        label: 'SBY Utara', 
        description: 'North Surabaya (Lakarsantri, Citraland, Kenjeran, etc.)',
        color: '#06b6d4' 
    },
    { 
        key: 'SBY Selatan', 
        label: 'SBY Selatan', 
        description: 'South Surabaya (Pakuwon, Gayungan, Wiyung, etc.)',
        color: '#84cc16' 
    },
    { 
        key: 'SBY Timur', 
        label: 'SBY Timur', 
        description: 'East Surabaya (MERR, Rungkut, Mulyorejo, etc.)',
        color: '#f59e0b' 
    },
    { 
        key: 'SBY Barat', 
        label: 'SBY Barat', 
        description: 'West Surabaya (Simokerto, Asemrowo, Perak, etc.)',
        color: '#ef4444' 
    },
    { 
        key: 'SBY Pusat', 
        label: 'SBY Pusat', 
        description: 'Central Surabaya (Tunjungan, Genteng, Gubeng, Darmo, etc.)',
        color: '#8b5cf6' 
    }
];

/**
 * Get region statistics
 * @param {Array} cafes - Array of cafe objects
 * @returns {Object} Region statistics
 */
function getRegionStatistics(cafes) {
    const counts = getCafeCountsByRegion(cafes);
    const total = counts.Semua;
    
    return {
        total,
        regions: Object.keys(counts)
            .filter(key => key !== 'Semua')
            .map(region => ({
                region,
                count: counts[region],
                percentage: Math.round((counts[region] / total) * 100 * 10) / 10 // Round to 1 decimal
            }))
            .sort((a, b) => b.count - a.count) // Sort by count descending
    };
}

/**
 * Example React component implementation:
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
    
    // Get statistics
    const stats = useMemo(() => {
        return getRegionStatistics(cafes);
    }, [cafes]);
    
    return (
        <div className="cafe-catalog">
            {/* Region Filter Buttons */}
            <div className="region-filters">
                <h3>Filter by Region</h3>
                <div className="filter-buttons">
                    {REGION_CONFIG.map(region => (
                        <button
                            key={region.key}
                            className={`region-btn ${selectedRegion === region.key ? 'active' : ''}`}
                            style={{
                                '--region-color': region.color,
                                backgroundColor: selectedRegion === region.key ? region.color : 'transparent',
                                borderColor: region.color,
                                color: selectedRegion === region.key ? 'white' : region.color
                            }}
                            onClick={() => setSelectedRegion(region.key)}
                            title={region.description}
                        >
                            {getRegionDisplayName(region.key, regionCounts)}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Statistics */}
            <div className="region-stats">
                <p>Showing {filteredCafes.length} of {stats.total} cafes</p>
                {selectedRegion !== 'Semua' && (
                    <p>
                        {selectedRegion}: {regionCounts[selectedRegion]} cafes 
                        ({Math.round((regionCounts[selectedRegion] / stats.total) * 100)}%)
                    </p>
                )}
            </div>
            
            {/* Cafe Grid */}
            <div className="cafe-grid">
                {filteredCafes.map(cafe => (
                    <CafeCard key={cafe.id} cafe={cafe} />
                ))}
            </div>
        </div>
    );
}
*/

/**
 * CSS Styles for the filter buttons:
 */

/*
.region-filters {
    margin-bottom: 2rem;
}

.filter-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
}

.region-btn {
    padding: 0.5rem 1rem;
    border: 2px solid;
    border-radius: 0.5rem;
    background: transparent;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.region-btn:hover {
    background-color: var(--region-color) !important;
    color: white !important;
}

.region-btn.active {
    font-weight: 600;
}

.region-stats {
    margin-bottom: 1.5rem;
    color: #6b7280;
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .filter-buttons {
        flex-direction: column;
    }
    
    .region-btn {
        text-align: center;
    }
}
*/

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        filterCafesByRegion,
        getCafeCountsByRegion,
        getRegionDisplayName,
        getRegionStatistics,
        REGION_CONFIG
    };
}