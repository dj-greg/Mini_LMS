import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { BookFormData } from '../types';

interface BookFormProps {
  initialData?: BookFormData;
  onSubmit: (data: BookFormData) => void;
  onCancel: () => void;
}

const defaultFormData: BookFormData = {
  title: '',
  author: '',
  isbn: '',
  genre: '',
  year: '',
  coverUrl: '',
};

const genres = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Mystery',
  'Thriller',
  'Romance',
  'Historical Fiction',
  'Biography',
  'Self-Help',
  'Science',
  'Technology',
  'Children',
  'Young Adult',
  'Poetry',
  'Other',
];

export default function BookForm({ initialData = defaultFormData, onSubmit, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof BookFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear validation error when user types
    if (errors[name as keyof BookFormData]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BookFormData, string>> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (formData.isbn && !/^(?:\d{10}|\d{13})$/.test(formData.isbn)) {
      newErrors.isbn = 'ISBN must be 10 or 13 digits';
    }
    
    if (formData.year && (isNaN(Number(formData.year)) || Number(formData.year) < 1000 || Number(formData.year) > new Date().getFullYear())) {
      newErrors.year = `Year must be between 1000 and ${new Date().getFullYear()}`;
    }
    
    if (formData.coverUrl && !/^(https?:\/\/)/.test(formData.coverUrl)) {
      newErrors.coverUrl = 'Cover URL must be a valid URL starting with http:// or https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="col-span-full">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.title ? 'border-red-300 ring-red-500' : ''
            }`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Author */}
        <div className="col-span-full">
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.author ? 'border-red-300 ring-red-500' : ''
            }`}
          />
          {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
        </div>

        {/* ISBN */}
        <div>
          <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="e.g., 9781234567890"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.isbn ? 'border-red-300 ring-red-500' : ''
            }`}
          />
          {errors.isbn && <p className="mt-1 text-sm text-red-600">{errors.isbn}</p>}
        </div>

        {/* Genre */}
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select a genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year of Publication
          </label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder={`e.g., ${new Date().getFullYear()}`}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.year ? 'border-red-300 ring-red-500' : ''
            }`}
          />
          {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
        </div>

        {/* Cover URL */}
        <div>
          <label htmlFor="coverUrl" className="block text-sm font-medium text-gray-700">
            Cover Image URL
          </label>
          <input
            type="text"
            id="coverUrl"
            name="coverUrl"
            value={formData.coverUrl}
            onChange={handleChange}
            placeholder="https://example.com/book-cover.jpg"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.coverUrl ? 'border-red-300 ring-red-500' : ''
            }`}
          />
          {errors.coverUrl && <p className="mt-1 text-sm text-red-600">{errors.coverUrl}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </form>
  );
}