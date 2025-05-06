import React from 'react';
import { Book, BookOpen, UsersRound, Clock } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

export default function Statistics() {
  const { books } = useLibrary();
  
  // Calculate statistics
  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.available).length;
  const borrowedBooks = totalBooks - availableBooks;
  
  // Calculate most popular genre
  const genreCounts: Record<string, number> = {};
  books.forEach(book => {
    if (book.genre) {
      genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
    }
  });
  
  let mostPopularGenre = 'N/A';
  let maxCount = 0;
  
  for (const [genre, count] of Object.entries(genreCounts)) {
    if (count > maxCount) {
      mostPopularGenre = genre;
      maxCount = count;
    }
  }
  
  // Find overdue books
  const today = new Date();
  const overdueBooks = books.filter(book => {
    if (!book.available && book.borrower?.dueDate) {
      const dueDate = new Date(book.borrower.dueDate);
      return dueDate < today;
    }
    return false;
  }).length;

  const StatCard = ({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Books" 
        value={totalBooks} 
        icon={<Book className="h-6 w-6 text-blue-600" />} 
        color="bg-blue-100"
      />
      <StatCard 
        title="Available" 
        value={availableBooks} 
        icon={<BookOpen className="h-6 w-6 text-green-600" />} 
        color="bg-green-100"
      />
      <StatCard 
        title="Checked Out" 
        value={borrowedBooks} 
        icon={<UsersRound className="h-6 w-6 text-amber-600" />} 
        color="bg-amber-100"
      />
      <StatCard 
        title="Overdue" 
        value={overdueBooks} 
        icon={<Clock className="h-6 w-6 text-red-600" />} 
        color="bg-red-100"
      />
    </div>
  );
}