import React from "react";
import "../../components/savings/SavingGoal.css"; 



export function GoalProgressCard({ goal, onEdit, onDelete }) {
  // Calculate progress percentage
  const progress = (goal.saved / goal.target) * 100;
  
  // Format the due date (kept for structure)
  const targetDate = new Date(goal.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
        ${goal.saved} of ${goal.target} saved
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