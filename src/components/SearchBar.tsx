import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: (filters: { available?: boolean; genre?: string }) => void;
}

export default function SearchBar({ onSearch, onFilter }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    available: undefined as boolean | undefined,
    genre: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs differently
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      let newValue: boolean | undefined;
      
      if (checkbox.value === 'all') {
        newValue = undefined;
      } else if (checkbox.value === 'available') {
        newValue = true;
      } else if (checkbox.value === 'borrowed') {
        newValue = false;
      }
      
      setFilters({ ...filters, [name]: newValue });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  const resetFilters = () => {
    const resetFilters = {
      available: undefined,
      genre: '',
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm mb-6">
      <form onSubmit={handleSearch} className="flex items-center p-2">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search books by title, author, ISBN..."
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="ml-2 p-2 text-gray-500 hover:text-indigo-600 focus:outline-none"
          aria-label="Toggle filters"
        >
          <Filter className="h-5 w-5" />
        </button>
        <button
          type="submit"
          className="ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </form>

      {showFilters && (
        <div className="border-t border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="available"
                    value="all"
                    checked={filters.available === undefined}
                    onChange={handleFilterChange}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-sm text-gray-700">All</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="available"
                    value="available"
                    checked={filters.available === true}
                    onChange={handleFilterChange}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-sm text-gray-700">Available</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="available"
                    value="borrowed"
                    checked={filters.available === false}
                    onChange={handleFilterChange}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-sm text-gray-700">Checked Out</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Genre
              </label>
              <select
                name="genre"
                value={filters.genre}
                onChange={handleFilterChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">All Genres</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Thriller">Thriller</option>
                <option value="Romance">Romance</option>
                <option value="Biography">Biography</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Science">Science</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="mr-2 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={applyFilters}
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}