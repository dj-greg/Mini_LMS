import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import { BookPlus, Library, BookMarked, BookOpenCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Statistics from '../components/Statistics';
import BookCard from '../components/BookCard';

export default function Dashboard() {
  const { books } = useLibrary();
  
  // Get the 4 most recently added books (assuming the latest ones are at the end of the array)
  const recentBooks = [...books].slice(-4).reverse();
  
  // Find overdue books
  const today = new Date();
  const overdueBooks = books.filter(book => {
    if (!book.available && book.borrower?.dueDate) {
      const dueDate = new Date(book.borrower.dueDate);
      return dueDate < today;
    }
    return false;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Library Dashboard</h1>
        <Link
          to="/add"
          className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <BookPlus className="w-4 h-4" />
          Add Book
        </Link>
      </div>

      {/* Statistics */}
      <Statistics />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/books"
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow"
        >
          <div className="p-3 rounded-full bg-indigo-100">
            <Library className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-medium">View All Books</h3>
            <p className="text-sm text-gray-600">Browse your entire collection</p>
          </div>
        </Link>

        <Link
          to="/books?filter=available"
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow"
        >
          <div className="p-3 rounded-full bg-green-100">
            <BookMarked className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium">Available Books</h3>
            <p className="text-sm text-gray-600">See what's ready to borrow</p>
          </div>
        </Link>

        <Link
          to="/books?filter=borrowed"
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow"
        >
          <div className="p-3 rounded-full bg-amber-100">
            <BookOpenCheck className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-medium">Checked Out</h3>
            <p className="text-sm text-gray-600">Manage borrowed books</p>
          </div>
        </Link>
      </div>

      {/* Recently Added Books */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recently Added Books</h2>
        {recentBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <p className="text-gray-500">No books in your library yet.</p>
            <Link
              to="/add"
              className="mt-2 inline-block text-indigo-600 hover:text-indigo-800"
            >
              Add your first book
            </Link>
          </div>
        )}
      </div>

      {/* Overdue Books */}
      {overdueBooks.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-red-600">Overdue Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {overdueBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}