import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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

// Wrapper component to handle page transitions
function PageTransition({ children }) {
  const location = useLocation();
  
  return (
    <div key={location.pathname} className="page-transition">
      {children}
    </div>
  );
}

function AppRoutes() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={
          <PageTransition>
            <Dashboard />
          </PageTransition>
        } />
        <Route path="/transactions" element={
          <PageTransition>
            <Transactions />
          </PageTransition>
        } />
        <Route path="/budget" element={
          <PageTransition>
            <Budget />
          </PageTransition>
        } />
        <Route path="/savings" element={
          <PageTransition>
            <Savings />
          </PageTransition>
        } />
        <Route path="/setting" element={
          <PageTransition>
            <Setting />
          </PageTransition>
        } />
        <Route path="*" element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <SettingsProvider>
      <TransactionProvider>
        <div className="container">
          <h1 className="header">Personal Finance Tracker</h1>
          <Router>
            <AppRoutes />
          </Router>
        </div>
      </TransactionProvider>
    </SettingsProvider>
  );
}

export default App;
