// Final Cafe Filter Utilities - Official Surabaya Districts
// Based on official administrative boundaries

/**
 * Filter cafes by official Surabaya region
 * @param {Array} cafes - Array of cafe objects
 * @param {string} region - Region filter ('Semua', 'SBY Timur', 'SBY Selatan', 'SBY Barat', 'SBY Pusat', 'SBY Utara')
 * @returns {Array} Filtered cafes array
 */
function filterCafesByRegion(cafes, region) {
    if (region === 'Semua' || !region) {
        return cafes;
    }
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
        'SBY Timur': 0,
        'SBY Selatan': 0,
        'SBY Barat': 0,
        'SBY Pusat': 0,
        'SBY Utara': 0
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
 * Official Surabaya Regions Configuration
 * Based on actual administrative districts
 */
const SURABAYA_REGIONS = [
    { 
        key: 'Semua', 
        label: 'Semua', 
        description: 'All cafes in Surabaya',
        color: '#6366f1',
        districts: []
    },
    { 
        key: 'SBY Timur', 
        label: 'SBY Timur', 
        description: 'East Surabaya - Gubeng, Rungkut, Mulyorejo, Sukolilo, etc.',
        color: '#f59e0b',
        districts: ['Gubeng', 'Gunung Anyar', 'Sukolilo', 'Tambaksari', 'Mulyorejo', 'Rungkut', 'Tenggilis Mejoyo']
    },
    { 
        key: 'SBY Selatan', 
        label: 'SBY Selatan', 
        description: 'South Surabaya - Gayungan, Wiyung, Pakuwon area, etc.',
        color: '#84cc16',
        districts: ['Wonokromo', 'Wonocolo', 'Wiyung', 'Karang Pilang', 'Jambangan', 'Gayungan', 'Dukuh Pakis', 'Sawahan']
    },
    { 
        key: 'SBY Barat', 
        label: 'SBY Barat', 
        description: 'West Surabaya - Lakarsantri, Citraland, Sambikerep, etc.',
        color: '#ef4444',
        districts: ['Benowo', 'Pakal', 'Asemrowo', 'Sukomanunggal', 'Tandes', 'Sambikerep', 'Lakarsantri']
    },
    { 
        key: 'SBY Pusat', 
        label: 'SBY Pusat', 
        description: 'Central Surabaya - Tunjungan, Genteng, Darmo, city center',
        color: '#8b5cf6',
        districts: ['Tegalsari', 'Simokerto', 'Genteng', 'Bubutan']
    },
    { 
        key: 'SBY Utara', 
        label: 'SBY Utara', 
        description: 'North Surabaya - Kenjeran, Bulak, port area, etc.',
        color: '#06b6d4',
        districts: ['Bulak', 'Kenjeran', 'Semampir', 'Pabean Cantian', 'Krembangan']
    }
];

/**
 * Get region configuration by key
 * @param {string} regionKey - Region key
 * @returns {Object} Region configuration object
 */
function getRegionConfig(regionKey) {
    return SURABAYA_REGIONS.find(region => region.key === regionKey);
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
 * Get region statistics sorted by count
 * @param {Array} cafes - Array of cafe objects
 * @returns {Object} Region statistics
 */
function getRegionStatistics(cafes) {
    const counts = getCafeCountsByRegion(cafes);
    const total = counts.Semua;
    
    return {
        total,
        regions: SURABAYA_REGIONS
            .filter(region => region.key !== 'Semua')
            .map(region => ({
                ...region,
                count: counts[region.key],
                percentage: Math.round((counts[region.key] / total) * 100 * 10) / 10
            }))
            .sort((a, b) => b.count - a.count) // Sort by count descending
    };
}

/**
 * Get cafes by specific district (for detailed filtering)
 * @param {Array} cafes - Array of cafe objects
 * @param {string} districtName - District name (e.g., 'Gubeng', 'Lakarsantri')
 * @returns {Array} Cafes in the specified district
 */
function getCafesByDistrict(cafes, districtName) {
    return cafes.filter(cafe => {
        const location = `${cafe.address || ''} ${cafe.neighborhood || ''}`.toLowerCase();
        return location.includes(districtName.toLowerCase());
    });
}

/**
 * React Component Example
 */
/*
import React, { useState, useMemo } from 'react';

function CafeCatalogWithOfficialDistricts({ cafes }) {
    const [selectedRegion, setSelectedRegion] = useState('Semua');
    
    const filteredCafes = useMemo(() => {
        return filterCafesByRegion(cafes, selectedRegion);
    }, [cafes, selectedRegion]);
    
    const regionCounts = useMemo(() => {
        return getCafeCountsByRegion(cafes);
    }, [cafes]);
    
    const stats = useMemo(() => {
        return getRegionStatistics(cafes);
    }, [cafes]);
    
    return (
        <div className="cafe-catalog">
            <div className="region-filters">
                <h3>Filter by Official Surabaya District</h3>
                <div className="filter-buttons">
                    {SURABAYA_REGIONS.map(region => (
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
                
                {selectedRegion !== 'Semua' && (
                    <div className="region-info">
                        <p><strong>{selectedRegion}</strong></p>
                        <p className="districts">
                            Districts: {getRegionConfig(selectedRegion)?.districts.join(', ')}
                        </p>
                    </div>
                )}
            </div>
            
            <div className="results-info">
                <p>
                    Showing <strong>{filteredCafes.length}</strong> of <strong>{stats.total}</strong> cafes
                    {selectedRegion !== 'Semua' && (
                        <span> in {selectedRegion}</span>
                    )}
                </p>
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
        getRegionStatistics,
        getRegionConfig,
        getCafesByDistrict,
        SURABAYA_REGIONS
    };
}