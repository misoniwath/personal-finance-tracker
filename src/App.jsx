import React from "react";

// Import your top-level components
import { Navigation } from './components/layout/Navigation';
import { DashboardPage } from './pages/DashboardPage'; 
// Note: We are now ONLY rendering DashboardPage. 
// You'll need logic (e.g., useState) in App.jsx to switch views later.

import './App.css';

function App() {
 return (
    // The main container wrapper
    <div className="container">
      <h1 className="header">Personal Finance Tracker</h1>
      
      {/* The Navigation bar with buttons */}
      <Navigation />

      {/* RENDER THE DASHBOARD UI DIRECTLY */}
      <DashboardPage />
    </div>
  );
}

export default App;