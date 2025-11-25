import React, { useState } from "react";
import "./AddEditGoalModal.css"; // New CSS file

// Helper to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export function AddEditGoalModal({ onClose, onSave, goalToEdit }) {
  const isEdit = !!goalToEdit;

  // Set initial state from goalToEdit if editing, otherwise use defaults
  const [title, setTitle] = useState(isEdit ? goalToEdit.name : "");
  const [targetAmount, setTargetAmount] = useState(isEdit ? goalToEdit.target : "");
  const [dueDate, setDueDate] = useState(isEdit ? goalToEdit.dueDate : getTodayDate());
  // Saved amount is only editable on a new goal to set the initial value
  const [savedAmount, setSavedAmount] = useState(isEdit ? goalToEdit.saved : 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !targetAmount || parseFloat(targetAmount) <= 0) {
      alert("Please enter a valid title and target amount.");
      return;
    }

    const goalData = {
      // If editing, keep the original ID, otherwise a new ID will be assigned in parent
      id: isEdit ? goalToEdit.id : undefined, 
      name: title,
      target: parseFloat(targetAmount),
      dueDate,
      saved: parseFloat(savedAmount) || 0,
    };

    onSave(goalData);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? "Edit Saving Goal" : "Add New Saving Goal"}</h2>

        <form className="transaction-form" onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="title">Goal Title</label>
            <input
              id="title"
              type="text"
              placeholder="e.g., New Car"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="targetAmount">Target Amount ($)</label>
            <input
              id="targetAmount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="10000.00"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
            />
          </div>

          {!isEdit && ( // Only show "Currently Saved" for new goals
            <></>
          )}

          <div className="form-group">
            <label htmlFor="savedAmount">Currently Saved ($)</label>
            <input
              id="savedAmount"
              type="number"
              min="0.00"
              step="0.01"
              placeholder="0.00"
              value={savedAmount}
              onChange={(e) => setSavedAmount(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              min={getTodayDate()} // Must be today or a future date
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-add">
              {isEdit ? "Save Changes" : "Add Goal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
