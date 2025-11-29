import React, { useState, useContext } from 'react';
import { createPortal } from 'react-dom';
import '../transactions/AddTransactionModal.css'; // Reusing existing modal styles
import { SettingsContext } from '../../context/SettingsContext';

export function EditBudgetModal({ category, currentAmount, onClose, onSave }) {
  const [amount, setAmount] = useState(currentAmount);
  const { settings } = useContext(SettingsContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(parseFloat(amount));
  };

  // Use Portal to render modal at document root level to avoid z-index stacking issues
  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Budget for {category}</h2>
        
        <form className="transaction-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="budgetAmount">Allocated Amount ({settings.currency})</label>
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
    </div>,
    document.body
  );
}
