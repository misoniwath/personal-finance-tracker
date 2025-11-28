import React, { useContext } from "react";
import "./Card.css";
import { TransactionContext } from "../../context/TransactionContext";
import { SettingsContext } from "../../context/SettingsContext";

export function Balance({ type, icon }) {
  const { state } = useContext(TransactionContext);
  const { transactions } = state;
  const { settings } = useContext(SettingsContext);

  // Calculate amount and count based on type
  let displayAmount = 0;
  let displayCount = 0;

  const calculateBalance = (transactions) => {
    return transactions.reduce((acc, tx) => {
      const amount = Number(tx.amount);
      if (tx.type === "Income") return acc + amount;
      if (tx.type === "Expense" || tx.type === "Savings") return acc - amount;
      return acc;
    }, 0);
  };

  if (type === "Balance") {
    displayAmount = calculateBalance(transactions); // Or calculate total Income - Expense if preferred
    displayCount = transactions.length;
  } else {
    const filteredTransactions = transactions.filter((t) => t.type === type);
    displayAmount = filteredTransactions.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0
    );
    displayCount = filteredTransactions.length;
  }

  return (
    <div className="balance-card">
      <div className="amount-content">
        <div className="title-row">
          <h3>{type}</h3>
          <p className="income-icon">{icon}</p>
        </div>
        <p className="amount-green">
          {settings.currency} {displayAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <p>
          {displayCount} {type} transactions
        </p>
      </div>
    </div>
  );
}
