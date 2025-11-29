import React, { useContext } from 'react';
import './BudgetCard.css';
import { SettingsContext } from '../../context/SettingsContext';

export function BudgetCard({ category, amount, color, themeColor, onEdit }) {
  const { settings } = useContext(SettingsContext);

  return (
    <div 
      className="budget-card"
      style={{
        backgroundColor: themeColor,
        borderLeft: `6px solid ${color}`
      }}
    >
      <div>
        <h3 style={{ color }}>{category}</h3>
        <p className="budget-amount">Budget: <strong>{settings.currency}{amount.toFixed(2)}</strong></p>
      </div>

      <button className="edit-icon-btn" onClick={onEdit}>
        ✏️
      </button>
    </div>
  );
}
