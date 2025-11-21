import React from 'react';
import './BudgetOverview.css';

// Utility function to format numbers to currency
const format = (n) => `$${n.toFixed(2)}`;

export function BudgetOverview({ budgets  }) {
  return (
    // The main container for the overview section
    // NOTE: The class name 'overview-container' is used in BudgetOverview.css
    <div className="overview-container"> 
      <h3>Budget Overview</h3>
      
      <div className="overview-items">
        {budgets.map(b => {
          // Calculate the percentage spent, capping at 100% for the visual bar
          const pct = b.amount > 0 ? Math.min((b.spent / b.amount) * 100, 100) : 0;
          
          return (
            <div key={b.id} className="overview-item">
              
              {/* Top line: Category Name vs. Amounts */}
              <div className="overview-top">
                <span style={{ color: b.color, fontWeight: '600' }}>{b.category}</span>
                <span>{format(b.spent)} / {format(b.amount)}</span>
              </div>

              {/* Progress Bar Background */}
              <div className="bar-bg">
                {/* Progress Bar Fill */}
                <div 
                  className="bar-fill" 
                  style={{ 
                    width: `${pct}%`, 
                    // Use red (#ef4444 is a good Tailwind red) if overspent
                    backgroundColor: b.spent > b.amount ? '#ef4444' : b.color 
                  }} 
                  aria-label={`${b.category} budget usage: ${pct.toFixed(0)}%`} 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}