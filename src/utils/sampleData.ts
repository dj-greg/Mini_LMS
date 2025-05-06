import { Book } from '../types';

export const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780061120084',
    genre: 'Fiction',
    year: 1960,
    available: true,
    coverUrl: 'https://images.pexels.com/photos/11035386/pexels-photo-11035386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    genre: 'Fiction',
    year: 1925,
    available: false,
    coverUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    borrower: {
      name: 'John Doe',
      borrowDate: '2023-09-01T00:00:00.000Z',
      dueDate: '2023-10-01T00:00:00.000Z',
    },
  },
  {
    id: '3',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    isbn: '9780062316097',
    genre: 'Non-Fiction',
    year: 2014,
    available: true,
    coverUrl: 'https://images.pexels.com/photos/11035473/pexels-photo-11035473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '4',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '9780547928227',
    genre: 'Fantasy',
    year: 1937,
    available: true,
    coverUrl: 'https://images.pexels.com/photos/11035481/pexels-photo-11035481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '5',
    title: 'Dune',
    author: 'Frank Herbert',
    isbn: '9780441172719',
    genre: 'Science Fiction',
    year: 1965,
    available: false,
    coverUrl: 'https://images.pexels.com/photos/11035531/pexels-photo-11035531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    borrower: {
      name: 'Jane Smith',
      borrowDate: '2023-08-15T00:00:00.000Z',
      dueDate: '2023-09-15T00:00:00.000Z',
    },
  },
  {
    id: '6',
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '9780735211292',
    genre: 'Self-Help',
    year: 2018,
    available: true,
    coverUrl: 'https://images.pexels.com/photos/11035382/pexels-photo-11035382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export const initializeSampleData = (): void => {
  // Check if data already exists in localStorage
  if (!localStorage.getItem('library-books')) {
    // Initialize with sample data
    localStorage.setItem('library-books', JSON.stringify(sampleBooks));
  }
};