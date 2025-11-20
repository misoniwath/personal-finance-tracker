import React from "react";
import "./TransactionList.css";

//This handle displaying transaction date and formatted to YYYY-MM-DD

// Helper function to format the date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to format currency
const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`;
};

export function TransactionList({ transactions }) {
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
          <h3 className="transaction-date">{formatDate(date)}</h3>
          {groupedTransactions[date].map((txn) => (
            <div key={txn.id} className="transaction-item">
              <div className="left-column">
                <span className="category-name">{txn.category}</span>
                <span className="transaction-note">{txn.note}</span>
              </div>
              <div className={`right-column ${txn.type.toLowerCase()}`}>
                {/* Show negative for expense, positive for others */}
                {txn.type === "Expense" ? "-" : "+"}
                {formatCurrency(txn.amount)}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
