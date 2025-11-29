import React, { useState, useMemo, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./StackedBarChart.css";
import { SettingsContext } from "../../context/SettingsContext";
import { TransactionContext } from "../../context/TransactionContext";

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export function StackedBarChart() {
  const [filter, setFilter] = useState("all"); 
  const { settings } = useContext(SettingsContext);
  const { state } = useContext(TransactionContext);
  const { transactions } = state;

  // Process transactions to group by month
  const chartData = useMemo(() => {
    // Initialize all months with 0 income and expense
    const monthlyData = {};
    
    // Initialize all 12 months
    for (let i = 0; i < 12; i++) {
      monthlyData[i] = { name: monthNames[i], income: 0, expense: 0 };
    }

    // Process transactions
    transactions.forEach((txn) => {
      if (!txn.date) return;
      const date = new Date(txn.date);
      if (isNaN(date.getTime())) return;
      
      const month = date.getMonth();
      const amount = Number(txn.amount);

      if (txn.type === "Income") {
        monthlyData[month].income += amount;
      } else if (txn.type === "Expense") {
        monthlyData[month].expense += amount;
      }
    });

    // Convert to array and filter out months with no data (optional - you can show all months)
    return Object.values(monthlyData);
  }, [transactions]);

  // Filter logic
  const filteredData = useMemo(() => {
    return chartData.map((item) => {
      if (filter === "income") return { name: item.name, income: item.income };
      if (filter === "expense") return { name: item.name, expense: item.expense };
      return item;
    });
  }, [filter, chartData]);

  const formatCurrency = (value) => {
    return `${settings.currency}${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="stacked-bar-wrapper" style={{ width: "100%", height: 400 }}>
      <div style={{ marginBottom: "10px" }}>
        <label>Show: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All (Income + Expense)</option>
          <option value="income">Income Only</option>
          <option value="expense">Expense Only</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={filteredData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />

          {(filter === "all" || filter === "expense") && (
            <Bar dataKey="expense" stackId="a" fill="#8884d8" />
          )}

          {(filter === "all" || filter === "income") && (
            <Bar dataKey="income" stackId="a" fill="#82ca9d" />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
