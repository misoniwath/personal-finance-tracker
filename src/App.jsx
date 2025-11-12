import React from "react";
import { Dashboard } from "./components/TabsBar/Dashboard";
import { Transaction } from "./components/TabsBar/Transaction";
import { Budget } from "./components/TabsBar/Budget";
import { Saving } from "./components/TabsBar/Saving";
import { Balance } from "./components/balanceCard/Balance";
import { Income } from "./components/balanceCard/Income";
import { Expense } from "./components/balanceCard/Expense";
// import { StackedBarChart } from "./components/charts/StackedBarChart";
// import { CustomActiveShapePieChart } from "./components/charts/CategoryExpense";
import { Charts } from "./components/charts/Charts";
import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <h1 className="header">Personal Finance Tracker</h1>
        <div className="tabsBar">
          {/* Tabs will go here */}
          <Dashboard />
          <Transaction />
          <Budget />
          <Saving />
        </div>
        <div className="balanceCards">
          {/* Balance cards will go here */}
          <Balance />
          <Income />
          <Expense />
        </div>
        <Charts />
      </div>
    </>
  );
}

export default App;
