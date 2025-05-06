import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, Borrower } from '../types';

interface LibraryContextType {
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  addBooks: (books: Omit<Book, 'id'>[]) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  borrowBook: (id: string, borrower: Omit<Borrower, 'borrowDate'>) => void;
  returnBook: (id: string) => void;
  searchBooks: (query: string) => Book[];
  filterBooks: (filters: { available?: boolean; genre?: string }) => Book[];
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem('library-books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  // Save books to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('library-books', JSON.stringify(books));
  }, [books]);

  const addBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bookData,
      id: crypto.randomUUID(),
      available: bookData.available ?? true,
    };
    setBooks([...books, newBook]);
  };

  const addBooks = (booksData: Omit<Book, 'id'>[]) => {
    const newBooks = booksData.map(bookData => ({
      ...bookData,
      id: crypto.randomUUID(),
      available: bookData.available ?? true,
    }));
    setBooks(prevBooks => [...prevBooks, ...newBooks]);
  };

  const updateBook = (updatedBook: Book) => {
    setBooks(books.map((book) => (book.id === updatedBook.id ? updatedBook : book)));
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const borrowBook = (id: string, borrowerData: Omit<Borrower, 'borrowDate'>) => {
    const borrower: Borrower = {
      ...borrowerData,
      borrowDate: new Date().toISOString(),
    };

    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, available: false, borrower } : book
      )
    );
  };

  const returnBook = (id: string) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, available: true, borrower: undefined } : book
      )
    );
  };

  const searchBooks = (query: string): Book[] => {
    if (!query.trim()) return books;
    
    const lowerQuery = query.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        (book.isbn && book.isbn.includes(lowerQuery)) ||
        (book.genre && book.genre.toLowerCase().includes(lowerQuery))
    );
  };

  const filterBooks = (filters: { available?: boolean; genre?: string }): Book[] => {
    return books.filter((book) => {
      if (filters.available !== undefined && book.available !== filters.available) {
        return false;
      }
      if (filters.genre && (!book.genre || !book.genre.includes(filters.genre))) {
        return false;
      }
      return true;
    });
  };

  return (
    <LibraryContext.Provider
      value={{
        books,
        addBook,
        addBooks,
        updateBook,
        deleteBook,
        borrowBook,
        returnBook,
        searchBooks,
        filterBooks,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};