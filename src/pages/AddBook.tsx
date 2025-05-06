import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import BookForm from '../components/BookForm';
import { BookFormData } from '../types';

export default function AddBook() {
  const { addBook } = useLibrary();
  const navigate = useNavigate();

  const handleSubmit = (formData: BookFormData) => {
    addBook({
      title: formData.title,
      author: formData.author,
      isbn: formData.isbn || undefined,
      genre: formData.genre || undefined,
      year: formData.year ? parseInt(formData.year) : undefined,
      coverUrl: formData.coverUrl || undefined,
    });
    
    navigate('/books');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Book</h1>
      <BookForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}