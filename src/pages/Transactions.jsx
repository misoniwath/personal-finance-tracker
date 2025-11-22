import React, { useState, useContext } from "react";
import { AddTransactionModal } from "../components/transactions/AddTransactionModal";
import { TransactionList } from "../components/transactions/TransactionList";
import { TransactionContext } from "../context/TransactionContext";
import "./Transactions.css";

export function Transactions() {
  // useState hook to manage if the modal is open or closed
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Access global state and dispatch from Context
  const { state, dispatch } = useContext(TransactionContext);
  const { transactions } = state;

  // Function to add a new transaction (will be passed to the modal)
  const handleAddTransaction = (newTransaction) => {
    const transactionWithId = { ...newTransaction, id: Date.now() };

    dispatch({
      type: "ADD_TRANSACTION",
      payload: transactionWithId,
    });

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
