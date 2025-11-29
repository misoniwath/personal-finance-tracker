import React, { useState, useContext, useMemo } from 'react';
import { BudgetCard } from '../components/budgets/BudgetCard'; // Corrected path/name
import { EditBudgetModal } from '../components/budgets/EditBudgetModal';
import { BudgetOverview } from '../components/budgets/BudgetOverview';
import { TransactionContext } from '../context/TransactionContext';
import './Budget.css';

export function Budget() {
  const { state, editBudget } = useContext(TransactionContext);
  const { budgets, transactions } = state;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  // Calculate spent amounts from Expense transactions by category
  const budgetsWithSpent = useMemo(() => {
    // Get current month's transactions
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthExpenses = transactions.filter(txn => {
      if (txn.type !== 'Expense') return false;
      if (!txn.date) return false;
      const txnDate = new Date(txn.date);
      return txnDate.getMonth() === currentMonth && txnDate.getFullYear() === currentYear;
    });

    // Calculate spent by category
    const spentByCategory = currentMonthExpenses.reduce((acc, txn) => {
      const category = txn.category || 'Others';
      acc[category] = (acc[category] || 0) + Number(txn.amount);
      return acc;
    }, {});

    // Merge budgets with spent amounts
    return budgets.map(budget => ({
      ...budget,
      spent: spentByCategory[budget.category] || 0
    }));
  }, [budgets, transactions]);

  const handleEditClick = (budget) => {
    setSelectedBudget(budget);
    setIsModalOpen(true);
  };

  const handleSaveBudget = (newAmount) => {
    if (!selectedBudget) return;
    
    editBudget({
      ...selectedBudget,
      amount: newAmount
    });
    setIsModalOpen(false);
    setSelectedBudget(null);
  };

  return (
    <div className="budget-page">
      <div className="budget-header">
        <h2>Budget Management</h2>
        <p className="subtitle" style={{ color: '#666', marginTop: '5px' }}>Track your monthly limits</p>
      </div>

      <div className="budget-grid">
        {budgetsWithSpent.map(budget => (
          <BudgetCard
            key={budget.id}
            category={budget.category}
            amount={budget.amount}
            color={budget.color}
            themeColor={budget.themeColor}
            onEdit={() => handleEditClick(budget)}
          />
        ))}
      </div>


      <BudgetOverview budgets={budgetsWithSpent} />

      {isModalOpen && selectedBudget && (
        <EditBudgetModal
          category={selectedBudget.category}
          currentAmount={selectedBudget.amount}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveBudget}
        />
      )}
    </div>
  );
}