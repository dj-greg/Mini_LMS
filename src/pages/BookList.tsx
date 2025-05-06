import React, { useState, useEffect } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import { Download, Upload } from 'lucide-react';
import { exportToCSV } from '../utils/csvExport';
import { importFromCSV } from '../utils/csvImport';

export default function BookList() {
  const { books, searchBooks, filterBooks, addBooks } = useLibrary();
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [searchParams, setSearchParams] = useSearchParams();
  const [importing, setImporting] = useState(false);

  // Extract filter from URL query parameters
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    
    if (filterParam === 'available') {
      setFilteredBooks(filterBooks({ available: true }));
    } else if (filterParam === 'borrowed') {
      setFilteredBooks(filterBooks({ available: false }));
    } else {
      setFilteredBooks(books);
    }
  }, [books, filterBooks, searchParams]);

  // Handle search
  const handleSearch = (query: string) => {
    setFilteredBooks(searchBooks(query));
  };

  // Handle filters
  const handleFilter = (filters: { available?: boolean; genre?: string }) => {
    setFilteredBooks(filterBooks(filters));
    
    // Update URL query parameter based on availability filter
    if (filters.available === true) {
      setSearchParams({ filter: 'available' });
    } else if (filters.available === false) {
      setSearchParams({ filter: 'borrowed' });
    } else {
      setSearchParams({});
    }
  };

  // Handle export
  const handleExport = () => {
    exportToCSV(filteredBooks);
  };

  // Handle import
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setImporting(true);
      const importedBooks = await importFromCSV(file);
      
      console.log('Books to import:', importedBooks.length); // Debug log
      
      if (importedBooks.length === 0) {
        throw new Error('No books found in the CSV file');
      }

      // Add all books at once
      addBooks(importedBooks);
      console.log('Import completed'); // Debug log

      alert(`Successfully imported ${importedBooks.length} books!`);
    } catch (error) {
      console.error('Import error:', error); // Debug log
      alert('Failed to import books: ' + (error as Error).message);
    } finally {
      setImporting(false);
      // Reset the input
      event.target.value = '';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Book Collection</h1>
        <div className="flex gap-2">
          {/* Hidden file input */}
          <input
            type="file"
            id="csvImport"
            accept=".csv"
            className="hidden"
            onChange={handleImport}
            disabled={importing}
          />
          
          {/* Import button */}
          <label
            htmlFor="csvImport"
            className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer ${
              importing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Upload className="w-4 h-4" />
            {importing ? 'Importing...' : 'Import Books'}
          </label>
          
          {/* Export button */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Books
          </button>
        </div>
      </div>
      
      <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
      
      {filteredBooks.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <p className="text-gray-500">No books match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}