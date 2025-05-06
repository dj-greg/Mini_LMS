import React from 'react';
import { BookOpen } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold">
            <BookOpen className="h-6 w-6" />
            <span>MyLibrary</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-indigo-200 transition-colors">
              Dashboard
            </Link>
            <Link to="/books" className="hover:text-indigo-200 transition-colors">
              Books
            </Link>
            <Link to="/add" className="hover:text-indigo-200 transition-colors">
              Add Book
            </Link>
          </nav>
          <div className="md:hidden">
            {/* Mobile menu button would go here */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} MyLibrary. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">
            A mini library management system for personal or school use.
          </p>
        </div>
      </footer>
    </div>
  );
}