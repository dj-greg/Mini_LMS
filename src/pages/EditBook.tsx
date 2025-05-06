import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import BookForm from '../components/BookForm';
import { BookFormData } from '../types';

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const { books, updateBook } = useLibrary();
  const navigate = useNavigate();

  // Find the book to edit
  const book = books.find((b) => b.id === id);

  // If book not found, show error
  if (!book) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h1>
        <p className="text-gray-600 mb-6">
          The book you are trying to edit could not be found.
        </p>
        <button
          onClick={() => navigate('/books')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Return to Books
        </button>
      </div>
    );
  }

  // Prepare initial form data
  const initialData: BookFormData = {
    title: book.title,
    author: book.author,
    isbn: book.isbn || '',
    genre: book.genre || '',
    year: book.year ? book.year.toString() : '',
    coverUrl: book.coverUrl || '',
  };

  const handleSubmit = (formData: BookFormData) => {
    updateBook({
      ...book,
      title: formData.title,
      author: formData.author,
      isbn: formData.isbn || undefined,
      genre: formData.genre || undefined,
      year: formData.year ? parseInt(formData.year) : undefined,
      coverUrl: formData.coverUrl || undefined,
    });
    
    navigate(`/books/${id}`);
  };

  const handleCancel = () => {
    navigate(`/books/${id}`);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Book</h1>
      <BookForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}