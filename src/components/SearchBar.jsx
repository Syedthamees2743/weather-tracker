import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity("");
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={isLoading}
      />
      <button type="submit" className="search-btn" disabled={isLoading || !city}>
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;