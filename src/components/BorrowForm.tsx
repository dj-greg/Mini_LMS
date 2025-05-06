import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface BorrowFormProps {
  onSubmit: (borrowerName: string, dueDate: string) => void;
  onCancel: () => void;
}

export default function BorrowForm({ onSubmit, onCancel }: BorrowFormProps) {
  const [borrowerName, setBorrowerName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({ borrowerName: '', dueDate: '' });

  // Set minimum due date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDueDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const newErrors = { borrowerName: '', dueDate: '' };
    let isValid = true;
    
    if (!borrowerName.trim()) {
      newErrors.borrowerName = 'Borrower name is required';
      isValid = false;
    }
    
    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    
    if (isValid) {
      onSubmit(borrowerName, dueDate);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="borrowerName" className="block text-sm font-medium text-gray-700">
          Borrower Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="borrowerName"
          value={borrowerName}
          onChange={(e) => setBorrowerName(e.target.value)}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
            errors.borrowerName ? 'border-red-300 ring-red-500' : ''
          }`}
        />
        {errors.borrowerName && (
          <p className="mt-1 text-sm text-red-600">{errors.borrowerName}</p>
        )}
      </div>

      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Due Date <span className="text-red-500">*</span>
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            id="dueDate"
            min={minDueDate}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.dueDate ? 'border-red-300 ring-red-500' : ''
            }`}
          />
          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-3 gap-3">
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
          Confirm
        </button>
      </div>
    </form>
  );
}