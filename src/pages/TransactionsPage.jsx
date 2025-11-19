import React, { useState } from 'react';
import { AddTransactionModal } from '../components/transactions/AddTransactionModal';
import { TransactionList } from '../components/transactions/TransactionList';
import './TransactionsPage.css';

export function TransactionsPage() {
  // useState hook to manage if the modal is open or closed
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This data will eventually come from your React Context (Member 2's job)
  // For now, we use mock data to build the UI.
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Income', category: 'Salary', date: '2025-11-15', amount: 2500, note: 'Monthly Pay' },
    { id: 2, type: 'Expense', category: 'Food', date: '2025-11-14', amount: 50.75, note: 'Groceries' },
    { id: 3, type: 'Savings', category: 'Vacation Fund', date: '2025-11-13', amount: 200, note: 'January Trip' }
  ]);

  // Function to add a new transaction (will be passed to the modal)
  const handleAddTransaction = (newTransaction) => {
    // We add the new transaction to the top of the list
    setTransactions(prevTransactions => [
      { ...newTransaction, id: Date.now() }, // Add a unique ID
      ...prevTransactions
    ]);
    setIsModalOpen(false); // Close the modal after adding
  };

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <h2>My Transactions</h2>
        {/* This button opens the modal by setting the state */}
        <button className="add-txn-btn" onClick={() => setIsModalOpen(true)}>
          + Add Transaction
        </button>
      </div>

      {/* The Transaction List component */}
      <TransactionList transactions={transactions} />

      {/* This is the modal component.
        It's only rendered if 'isModalOpen' is true.
      */}
      {isModalOpen && (
        <AddTransactionModal
          onClose={() => setIsModalOpen(false)}
          onAddTransaction={handleAddTransaction}
        />
      )}
    </div>
  );
}