import React, { useEffect, useState } from 'react';
import { Book } from '../types';

interface QRCodeGeneratorProps {
  book: Book;
}

export default function QRCodeGenerator({ book }: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create book information in a format suitable for QR code
    const bookInfo = {
      id: book.id,
      title: book.title,
      author: book.author,
      isbn: book.isbn || 'N/A',
    };
    
    // Encode the book information
    const encodedData = encodeURIComponent(JSON.stringify(bookInfo));
    
    // Generate QR code using a public API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedData}`;
    
    setQrCodeUrl(qrUrl);
    setLoading(false);
  }, [book]);

  if (loading) {
    return <div className="flex justify-center py-4">Loading QR code...</div>;
  }

  return (
    <div className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Book QR Code</h3>
      {qrCodeUrl && (
        <>
          <img
            src={qrCodeUrl}
            alt={`QR code for ${book.title}`}
            className="w-32 h-32 object-contain mb-2"
          />
          <p className="text-xs text-gray-500 text-center">
            Scan to view book details
          </p>
        </>
      )}
    </div>
  );
}