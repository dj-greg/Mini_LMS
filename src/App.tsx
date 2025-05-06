import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import { LibraryProvider } from './context/LibraryContext';
import { initializeSampleData } from './utils/sampleData';

function App() {
  // Initialize sample data when the app first loads
  useEffect(() => {
    initializeSampleData();
  }, []);

  return (
    <LibraryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="books" element={<BookList />} />
            <Route path="books/:id" element={<BookDetail />} />
            <Route path="books/:id/edit" element={<EditBook />} />
            <Route path="add" element={<AddBook />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </LibraryProvider>
  );
}

export default App;