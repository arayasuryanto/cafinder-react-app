import React, { useState, useEffect } from 'react';
import CafeGrid from '../components/catalog/CafeGrid';
import SearchBar from '../components/catalog/SearchBar';
import Filters from '../components/catalog/Filters';

const CatalogPage = () => {
  const [cafes, setCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    rating: 0,
    neighborhood: '',
    categories: []
  });

  useEffect(() => {
    // Load cafe data (to be implemented)
    // For now, we'll just use an empty array
    setCafes([]);
    setFilteredCafes([]);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Apply search and filters
    applyFilters(term, filters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Apply search and filters
    applyFilters(searchTerm, newFilters);
  };

  const applyFilters = (term, activeFilters) => {
    // Filter logic will be implemented here
    // For now, just use the original cafes
    setFilteredCafes(cafes);
  };

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h1>Find Your Perfect Cafe</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="catalog-content">
        <Filters onChange={handleFilterChange} />
        <CafeGrid cafes={filteredCafes} />
      </div>
    </div>
  );
};

export default CatalogPage;