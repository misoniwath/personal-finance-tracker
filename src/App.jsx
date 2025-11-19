import React, { useState } from "react"; 

// Import all required components
import { Navigation } from './components/layout/Navigation';
import { DashboardPage } from './pages/DashboardPage'; 
import { TransactionsPage } from './pages/TransactionsPage'; // <-- YOUR NEW PAGE
// Placeholder pages (You can implement their UI later)
function BudgetPage() { return <h2 style={{ textAlign: 'center', marginTop: '40px', color: '#555' }}>Budget Page UI Here!</h2> }
function SavingsPage() { return <h2 style={{ textAlign: 'center', marginTop: '40px', color: '#555' }}>Savings Page UI Here!</h2> }
function SettingsPage() { return <h2 style={{ textAlign: 'center', marginTop: '40px', color: '#555' }}>Settings Page UI Here!</h2> }

import './App.css';

function App() {
  // The central piece of UI logic: tracks which tab is currently selected.
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Function to render the correct UI content based on the active tab state
  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Transactions':
        return <TransactionsPage />; // <-- Renders your Transactions UI
      case 'Budget':
        return <BudgetPage />;
      case 'Savings':
        return <SavingsPage />;
      case 'Settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="container">
      <h1 className="header">Personal Finance Tracker</h1>
      
      {/* PASS THE STATE AND THE FUNCTION DOWN TO NAVIGATION */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Render the content of the currently active tab */}
      {renderContent()}
    </div>
  );
}

export default App;