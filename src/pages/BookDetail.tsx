import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import { Pencil, Trash2, BookOpen, UserCheck, Calendar, BookCheck } from 'lucide-react';
import BorrowForm from '../components/BorrowForm';
import QRCodeGenerator from '../components/QRCodeGenerator';

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const { books, deleteBook, borrowBook, returnBook } = useLibrary();
  const navigate = useNavigate();
  
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Find the book to display
  const book = books.find((b) => b.id === id);
  
  // If book not found, show error
  if (!book) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Book Not Found</h1>
        <p className="text-gray-600 mb-6">
          The book you are looking for could not be found.
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
  
  const handleDelete = () => {
    deleteBook(book.id);
    navigate('/books');
  };
  
  const handleBorrow = (borrowerName: string, dueDate: string) => {
    borrowBook(book.id, { name: borrowerName, dueDate });
    setShowBorrowForm(false);
  };
  
  const handleReturn = () => {
    returnBook(book.id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/books" className="text-indigo-600 hover:text-indigo-800">
          &larr; Back to Books
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-100 p-6 flex flex-col">
            <div className="h-64 bg-gray-200 mb-4 flex-grow">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={`Cover of ${book.title}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-indigo-100">
                  <BookOpen className="w-16 h-16 text-indigo-400" />
                </div>
              )}
            </div>
            
            <div className="mt-auto">
              <QRCodeGenerator book={book} />
            </div>
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
                <p className="text-lg text-gray-600 mb-2">by {book.author}</p>
              </div>
              
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                book.available
                  ? 'bg-green-100 text-green-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {book.available ? 'Available' : 'Checked Out'}
              </div>
            </div>
            
            <div className="border-t border-gray-200 my-4 pt-4">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                {book.isbn && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">ISBN</dt>
                    <dd className="text-sm text-gray-900">{book.isbn}</dd>
                  </>
                )}
                
                {book.genre && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Genre</dt>
                    <dd className="text-sm text-gray-900">{book.genre}</dd>
                  </>
                )}
                
                {book.year && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Published</dt>
                    <dd className="text-sm text-gray-900">{book.year}</dd>
                  </>
                )}
                
                {!book.available && book.borrower && (
                  <>
                    <dt className="text-sm font-medium text-gray-500">Borrowed By</dt>
                    <dd className="text-sm text-gray-900">{book.borrower.name}</dd>
                    
                    <dt className="text-sm font-medium text-gray-500">Borrow Date</dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(book.borrower.borrowDate).toLocaleDateString()}
                    </dd>
                    
                    <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(book.borrower.dueDate).toLocaleDateString()}
                    </dd>
                  </>
                )}
              </dl>
            </div>
            
            {/* Borrow Form */}
            {showBorrowForm && (
              <div className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                <h3 className="text-lg font-medium mb-3">Borrow this Book</h3>
                <BorrowForm
                  onSubmit={handleBorrow}
                  onCancel={() => setShowBorrowForm(false)}
                />
              </div>
            )}
            
            {/* Delete Confirmation */}
            {showDeleteConfirm && (
              <div className="mt-4 p-4 border border-red-200 rounded-md bg-red-50">
                <h3 className="text-lg font-medium mb-3 text-red-700">Confirm Deletion</h3>
                <p className="mb-4 text-red-600">
                  Are you sure you want to delete "{book.title}"? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="mt-6 flex justify-between gap-3">
              <div className="flex gap-2">
                <Link
                  to={`/books/${book.id}/edit`}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Link>
                
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
              
              <div>
                {book.available ? (
                  <button
                    onClick={() => setShowBorrowForm(true)}
                    className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    <UserCheck className="h-4 w-4" />
                    Check Out
                  </button>
                ) : (
                  <button
                    onClick={handleReturn}
                    className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    <BookCheck className="h-4 w-4" />
                    Return Book
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}