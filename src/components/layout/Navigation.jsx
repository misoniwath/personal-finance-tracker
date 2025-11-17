import React from 'react';

import './Navigation.css'; 

export function Navigation() {
  return (
    <nav className="tabsBar">
      {/* Switched from NavLink to <a>. 
          The 'active' class is manually added to 'Dashboard' to show its style. 
          href="#" means the links won't navigate away.
      */}
      <a href="#" className="active">Dashboard</a>
      <a href="#">Transactions</a>
      <a href="#">Budget</a>
      <a href="#">Savings</a>
      <a href="#">Settings</a>
    </nav>
  );
}