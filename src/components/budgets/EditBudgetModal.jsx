import React, { useState } from 'react';
import '../transactions/AddTransactionModal.css'; // Reusing your existing modal styles

export function EditBudgetModal({ category, currentAmount, onClose, onSave }) {
  const [amount, setAmount] = useState(currentAmount);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(parseFloat(amount));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Budget for {category}</h2>
        
        <form className="transaction-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="budgetAmount">Allocated Amount ($)</label>
            <input
              id="budgetAmount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-add">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}