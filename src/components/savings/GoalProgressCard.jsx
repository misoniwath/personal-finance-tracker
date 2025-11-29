import React, { useContext } from "react";
import "../../components/savings/SavingGoal.css"; 
import { SettingsContext } from "../../context/SettingsContext";

export function GoalProgressCard({ goal, onEdit, onDelete }) {
  const { settings } = useContext(SettingsContext);

  // Calculate progress percentage
  const progress = (goal.saved / goal.target) * 100;
  
  // Format the due date 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "";

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    switch (settings.dateFormat) {
      case "YYYY/MM/DD":
        return `${y}/${m}/${d}`;
      case "DD/MM/YYYY":
        return `${d}/${m}/${y}`;
      case "MM/DD/YYYY":
      default:
        return `${m}/${d}/${y}`;
    }
  };

  const targetDate = formatDate(goal.dueDate);

  return (
    <div className="goalItem-card">
      <div className="goal-header">
        <h3 className="goal-title">{goal.name}</h3>
        <div className="goal-actions">
          {/* Edit Button: Functionality remains unchanged */}
          <button className="icon-btn edit-btn" onClick={() => onEdit(goal.id)}>
            ✏️
          </button>
          {/* Delete Button: Functionality remains unchanged */}
          <button
            className="icon-btn delete-btn"
            onClick={() => onDelete(goal.id)}
          >
            🗑️
          </button>
        </div>
      </div>

      <p className="goal-info">
        {/* FIX: Removed bolding and .toLocaleString() */}
        {settings.currency}{goal.saved} of {settings.currency}{goal.target} saved
      </p>

      <div className="progressBar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="goal-details">
        <span className="percentText">
          {progress.toFixed(1)}% complete
        </span>
        <span className="due-date">Due: {targetDate}</span>
      </div>
    </div>
  );
}
