import React from "react";
import { Balance } from "../components/balanceCard/Balance";
import { Charts } from "../components/charts/Charts";
import { GoGoal } from "react-icons/go";
import { HiOutlineArrowCircleDown } from "react-icons/hi";
import { HiOutlineArrowCircleUp } from "react-icons/hi";
import { HiOutlineCash } from "react-icons/hi";
import "./Dashboard.css";

export function Dashboard() {
  return (
    <div className="dashboardContainer">
      {/* Section for balance cards */}
      <div className="balanceCards">
        <Balance type="Income" icon={<HiOutlineArrowCircleDown />} />
        <Balance type="Expense" icon={<HiOutlineArrowCircleUp />} />
        <Balance type="Savings" icon={<GoGoal />} />
        <Balance type="Balance" icon={<HiOutlineCash />} />
      </div>

      {/* Section for charts */}
      <Charts />
    </div>
  );
}
