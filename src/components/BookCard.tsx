import React from 'react';
import { Book, ChevronRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Book as BookType } from '../types';

interface BookCardProps {
  book: BookType;
}

export default function BookCard({ book }: BookCardProps) {
  // Calculate days remaining if book is borrowed
  const getDaysRemaining = () => {
    if (!book.borrower) return null;
    
    const dueDate = new Date(book.borrower.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const daysRemaining = getDaysRemaining();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
      <div className="h-40 bg-gray-200 relative">
        {book.coverUrl ? (
          <img 
            src={book.coverUrl} 
            alt={`Cover of ${book.title}`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-indigo-100">
            <Book className="w-12 h-12 text-indigo-400" />
          </div>
        )}
        <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded-full ${
          book.available 
            ? 'bg-green-100 text-green-800' 
            : 'bg-amber-100 text-amber-800'
        }`}>
          {book.available ? 'Available' : 'Checked Out'}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{book.title}</h3>
        <p className="text-gray-600 text-sm">by {book.author}</p>
        
        {book.genre && (
          <div className="mt-2">
            <span className="inline-block px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">
              {book.genre}
            </span>
          </div>
        )}
        
        {!book.available && book.borrower && (
          <div className="mt-3 flex items-center text-sm">
            <Users className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-gray-600">Borrowed by: {book.borrower.name}</span>
          </div>
        )}
        
        {!book.available && daysRemaining !== null && (
          <div className={`mt-1 text-sm font-medium ${
            daysRemaining < 0 
              ? 'text-red-600' 
              : daysRemaining <= 3 
                ? 'text-amber-600' 
                : 'text-gray-600'
          }`}>
            {daysRemaining < 0 
              ? `Overdue by ${Math.abs(daysRemaining)} days` 
              : `Due in ${daysRemaining} days`}
          </div>
        )}
      </div>
      
      <div className="px-4 py-3 bg-gray-50 flex justify-end">
        <Link 
          to={`/books/${book.id}`}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
        >
          View Details
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}