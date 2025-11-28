import React, { useContext } from "react";
import "./TransactionList.css";
import { SettingsContext } from "../../context/SettingsContext";

//This handle displaying transaction date and formatted to YYYY-MM-DD

// Helper function to format the date
const formatDate = (dateString, dateFormat) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "";

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  switch (dateFormat) {
    case "YYYY/MM/DD":
      return `${y}/${m}/${d}`;
    case "DD/MM/YYYY":
      return `${d}/${m}/${y}`;
    case "MM/DD/YYYY":
      return `${m}/${d}/${y}`;
    default:
      return `${m}/${d}/${y}`;
  }
};

// Helper function to format currency
const formatCurrency = (amount, currency) => {
  return `${currency}${Number(amount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export function TransactionList({ transactions }) {
  const { settings } = useContext(SettingsContext);

  if (transactions.length === 0) {
    return <p>No transactions found. Add one to get started!</p>;
  }

  // Group transactions by date
  const groupedTransactions = transactions.reduce((acc, txn) => {
    const date = txn.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(txn);
    return acc;
  }, {});

  // Get sorted dates
  const sortedDates = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="transaction-list">
      {sortedDates.map((date) => (
        <div key={date} className="date-group">
          <h3 className="transaction-date">{formatDate(date, settings.dateFormat)}</h3>
          {groupedTransactions[date].map((txn) => (
            <div key={txn.id} className="transaction-item">
              <div className="left-column">
                <span className="category-name">{txn.category}</span>
                <span className="transaction-note">{txn.note}</span>
              </div>
              <div className={`right-column ${txn.type.toLowerCase()}`}>
                {/* Show negative for expense, positive for others */}
                {txn.type === "Expense" ? "-" : "+"}
                {formatCurrency(txn.amount, settings.currency)}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}