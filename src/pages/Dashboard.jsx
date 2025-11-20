import React from "react";
import { Balance } from "../components/balanceCard/Balance";
import { Income } from "../components/balanceCard/Income";
import { Expense } from "../components/balanceCard/Expense";
import { Charts } from "../components/charts/Charts";
import "./Dashboard.css";

export function Dashboard() {
  return (
    <>
      {/* Section for balance cards */}
      <div className="balanceCards">
        <Balance />
        <Income />
        <Expense />
      </div>

      {/* Section for charts */}
      <Charts />
    </>
  );
}
