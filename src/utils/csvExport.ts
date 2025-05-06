import { Book } from '../types';

export const exportToCSV = (books: Book[]): void => {
  // Define CSV headers
  const headers = [
    'Title',
    'Author',
    'ISBN',
    'Genre',
    'Year',
    'Cover URL',
    'Status',
    'Borrower Name',
    'Borrow Date',
    'Due Date'
  ];

  // Convert books to CSV rows
  const rows = books.map(book => {
    // Handle ISBN to ensure it's exported as a complete number
    const isbn = book.isbn ? book.isbn.replace(/[^\d]/g, '') : '';
    
    return [
      book.title,
      book.author,
      isbn,
      book.genre || '',
      book.year || '',
      book.coverUrl || '',
      book.available ? 'Available' : 'Checked Out',
      book.borrower?.name || '',
      book.borrower?.borrowDate ? new Date(book.borrower.borrowDate).toLocaleDateString() : '',
      book.borrower?.dueDate ? new Date(book.borrower.dueDate).toLocaleDateString() : ''
    ];
  });

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `library-books-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};