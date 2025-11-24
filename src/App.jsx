import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/layout/NavBar";
import { Dashboard } from "./pages/Dashboard";
import { Transactions } from "./pages/Transactions";
import { Budget } from "./pages/Budget";
import { Savings } from "./pages/Saving";
import { NotFound } from "./pages/NotFound";
import { Setting } from "./pages/Setting";
import { TransactionProvider } from "./context/TransactionContext";
import { SettingsProvider } from "./context/SettingsContext";

function App() {
  return (
    <SettingsProvider>
      <TransactionProvider>
        <div className="container">
          <h1 className="header">Personal Finance Tracker</h1>
          <Router>
            <NavBar />

            <Routes>
              {/* Define your routes here */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/savings" element={<Savings />} />
              <Route path="/setting" element={<Setting />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </TransactionProvider>
    </SettingsProvider>
  );
}

export default App;
