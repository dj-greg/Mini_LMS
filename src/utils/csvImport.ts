import { Book } from '../types';

export const importFromCSV = (file: File): Promise<Book[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        // Split by newlines and filter out empty lines
        const lines = text.split(/\r?\n/).filter(line => line.trim());
        
        // Remove header row
        const dataRows = lines.slice(1);
        
        const books: Book[] = dataRows.map(row => {
          // Split the row by commas, but keep commas within quotes
          const values: string[] = [];
          let currentValue = '';
          let insideQuotes = false;
          
          for (let i = 0; i < row.length; i++) {
            const char = row[i];
            
            if (char === '"') {
              insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
              values.push(currentValue.trim());
              currentValue = '';
            } else {
              currentValue += char;
            }
          }
          // Push the last value
          values.push(currentValue.trim());
          
          // Remove quotes from values
          const cleanValues = values.map(val => val.replace(/^"(.*)"$/, '$1').trim());
          
          // Parse year as number
          const yearStr = cleanValues[4] || '';
          const year = yearStr ? parseInt(yearStr) : undefined;
          
          // Handle scientific notation in ISBN (e.g., 9.78148E+12)
          const isbn = cleanValues[2] ? String(Number(cleanValues[2])) : undefined;
          
          // Create the book object
          const book: Book = {
            id: crypto.randomUUID(),
            title: cleanValues[0],
            author: cleanValues[1],
            isbn: isbn,
            genre: cleanValues[3] || undefined,
            year: year,
            coverUrl: cleanValues[5] || undefined,
            available: (cleanValues[6] || '').toLowerCase() === 'available',
            borrower: undefined
          };

          // Add borrower information if present
          if (!book.available && cleanValues[7]) {
            book.borrower = {
              name: cleanValues[7],
              borrowDate: cleanValues[8] ? new Date(cleanValues[8]).toISOString() : new Date().toISOString(),
              dueDate: cleanValues[9] ? new Date(cleanValues[9]).toISOString() : new Date().toISOString()
            };
          }
          
          return book;
        });
        
        resolve(books);
      } catch (error) {
        reject(new Error('Failed to parse CSV file: ' + (error as Error).message));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read CSV file'));
    };
    
    reader.readAsText(file);
  });
};