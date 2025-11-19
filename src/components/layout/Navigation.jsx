import React from 'react';
import './Navigation.css'; 

export function Navigation({ activeTab, setActiveTab }) {
  // Define the tabs/pages available in the application
  const tabs = ['Dashboard', 'Transactions', 'Budget', 'Savings', 'Settings'];

  return (
    <nav className="tabsBar">
      {tabs.map((tab) => (
        // Use an 'a' tag (as defined in Navigation.css) with an onClick handler
        <a
          key={tab}
          href="#" // Prevents a full page reload
          onClick={(e) => {
            e.preventDefault(); // Stop the default link behavior
            setActiveTab(tab); //  switches the page in App.jsx
          }}
          // Manually apply the 'active' class from Navigation.css based on state
          className={tab === activeTab ? 'active' : ''} 
        >
          {tab}
        </a>
      ))}
    </nav>
  );
}