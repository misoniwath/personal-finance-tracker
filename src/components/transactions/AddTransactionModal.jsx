import React, { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import './AddTransactionModal.css';
import { TransactionContext } from '../../context/TransactionContext';


//This file capturing the date when a user adds a new transaction using getTodayDate

// Get today's date in YYYY-MM-DD format for the input's max attribute
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export function AddTransactionModal({ onClose, onAddTransaction }) {
  const { state } = useContext(TransactionContext);
  const { savingGoals, budgets } = state;

  // State for the form fields
  const [type, setType] = useState('Expense'); // Default to 'Expense'
  const [category, setCategory] = useState(''); // For Income and Expense, this will be text input
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(getTodayDate());
  const [note, setNote] = useState('');

  // useEffect hook to reset category when 'type' changes
  useEffect(() => {
    setCategory(''); // Reset category when type changes
    // If Savings type and there are saving goals, set to first goal name
    if (type === 'Savings' && savingGoals.length > 0) {
      setCategory(savingGoals[0].name);
    }
    // If Expense type and there are budgets, set to first budget category
    if (type === 'Expense' && budgets.length > 0) {
      setCategory(budgets[0].category);
    }
  }, [type, savingGoals, budgets]); // This effect runs whenever 'type', 'savingGoals', or 'budgets' changes

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

  // Use Portal to render modal at document root level to avoid z-index stacking issues
  return createPortal(
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
            {type === 'Savings' ? (
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {savingGoals.length > 0 ? (
                  savingGoals.map(goal => (
                    <option key={goal.id} value={goal.name}>{goal.name}</option>
                  ))
                ) : (
                  <option value="">No saving goals available</option>
                )}
              </select>
            ) : type === 'Expense' ? (
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {budgets.length > 0 ? (
                  budgets.map(budget => (
                    <option key={budget.id} value={budget.category}>{budget.category}</option>
                  ))
                ) : (
                  <option value="">No budget categories available. Please add budgets first.</option>
                )}
              </select>
            ) : (
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Salary, Freelance"
                required
              />
            )}
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
    </div>,
    document.body
  );
}