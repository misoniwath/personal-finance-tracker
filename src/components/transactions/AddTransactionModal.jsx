import React, { useState, useEffect } from 'react';
import './AddTransactionModal.css';


//This file capturing the date when a user adds a new transaction using getTodayDate

// Define categories for each type
const categories = {
  Income: ['Salary', 'Freelance', 'Investment', 'Other'],
  Expense: ['Food', 'Rent', 'Shopping', 'Transport', 'Utilities', 'Other'],
  Savings: ['Vacation Fund', 'Emergency Fund', 'Retirement', 'Other'],
};

// Get today's date in YYYY-MM-DD format for the input's max attribute
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export function AddTransactionModal({ onClose, onAddTransaction }) {
  // State for the form fields
  const [type, setType] = useState('Expense'); // Default to 'Expense'
  const [category, setCategory] = useState(categories.Expense[0]); // Default to first expense category
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(getTodayDate());
  const [note, setNote] = useState('');

  // State for the dynamic category list
  const [currentCategories, setCurrentCategories] = useState(categories.Expense);

  // useEffect hook to update categories when 'type' changes
  useEffect(() => {
    setCurrentCategories(categories[type]); // Update the category list
    setCategory(categories[type][0]); // Reset to the first category in the new list
  }, [type]); // This effect runs whenever 'type' changes

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page from reloading
    
    // Simple validation
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    // Call the function passed from the parent component
    onAddTransaction({
      type,
      category,
      amount: parseFloat(amount),
      date,
      note,
    });
  };

  return (
    // The "modal-backdrop" is the grayed-out background
    <div className="modal-backdrop" onClick={onClose}>
      {/* We stop the click from "bubbling" up to the backdrop,
        so clicking inside the modal content doesn't close it.
      */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Transaction</h2>
        
        {/* Transaction Type Buttons */}
        <div className="type-selector">
          <button
            className={`type-btn ${type === 'Income' ? 'active' : ''}`}
            onClick={() => setType('Income')}
          >
            Income
          </button>
          <button
            className={`type-btn ${type === 'Expense' ? 'active' : ''}`}
            onClick={() => setType('Expense')}
          >
            Expense
          </button>
          <button
            className={`type-btn ${type === 'Savings' ? 'active' : ''}`}
            onClick={() => setType('Savings')}
          >
            Savings
          </button>
        </div>

        {/* The Form */}
        <form className="transaction-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {currentCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
      
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              max={getTodayDate()} // Restrict to today or past dates
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="note">Note (Optional)</label>
            <textarea
              id="note"
              placeholder="e.g., Dinner with friends"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-add">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}