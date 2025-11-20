import React, { useState } from 'react';
import { BudgetCard } from '../components/budgets/BudgetCard'; // Corrected path/name
import { EditBudgetModal } from '../components/budgets/EditBudgetModal';
import { BudgetOverview } from '../components/budgets/BudgetOverview';
import './Budget.css';

export function Budget() {
  // Define the budget data just sample data 
  
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Bills', amount: 400.00, spent: 250.00, color: '#3b82f6', themeColor: '#eff6ff' }, // Blue
    { id: 2, category: 'Shopping', amount: 250.00, spent: 180.50, color: '#eab308', themeColor: '#fefce8' }, // Yellow
    { id: 3, category: 'Transportation', amount: 150.00, spent: 155.00, color: '#f97316', themeColor: '#fff7ed' }, // Orange (Slightly overspent for visual test)
    { id: 4, category: 'Entertainment', amount: 250.00, spent: 75.25, color: '#ec4899', themeColor: '#fdf2f8' }, // Pink
    { id: 5, category: 'Others', amount: 100.00, spent: 50.00, color: '#64748b', themeColor: '#f1f5f9' }, // Grey
    { id: 6, category: 'Emergency', amount: 150.00, spent: 0.00, color: '#2ecc71', themeColor: '#ebfdf3' }, // Green
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const handleEditClick = (budget) => {
    setSelectedBudget(budget);
    setIsModalOpen(true);
  };

  const handleSaveBudget = (newAmount) => {
    if (!selectedBudget) return;
    
    setBudgets(prevBudgets => 
      prevBudgets.map(b => 
        // Only update the amount, keeping the mock 'spent' data for visual feedback
        b.id === selectedBudget.id ? { ...b, amount: newAmount } : b
      )
    );
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
        {budgets.map(budget => (
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


      <BudgetOverview budgets={budgets} />

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