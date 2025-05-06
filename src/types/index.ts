export interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  genre?: string;
  year?: number;
  available: boolean;
  coverUrl?: string;
  borrower?: Borrower;
}

export interface Borrower {
  name: string;
  borrowDate: string;
  dueDate: string;
}

export interface BookFormData {
  title: string;
  author: string;
  isbn: string;
  genre: string;
  year: string;
  coverUrl: string;
}