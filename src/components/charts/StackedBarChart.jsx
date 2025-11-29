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
  const [yearFilter, setYearFilter] = useState("all"); 

  const { settings } = useContext(SettingsContext);
  const { state } = useContext(TransactionContext);
  const { transactions } = state;

  // Get available years from transactions 
  const availableYears = useMemo(() => {
    const yearsSet = new Set();

    transactions.forEach((txn) => {
      if (!txn.date) return;
      const d = new Date(txn.date);
      if (isNaN(d.getTime())) return;
      yearsSet.add(d.getFullYear());
    });

    return Array.from(yearsSet).sort((a, b) => a - b);
  }, [transactions]);

  // Process transactions to group by month
  const chartData = useMemo(() => {
    const monthlyData = {};

    // Process transactions
    transactions.forEach((txn) => {
      if (!txn.date) return;
      const date = new Date(txn.date);
      if (isNaN(date.getTime())) return;

      const year = date.getFullYear();
      const month = date.getMonth();
      const amount = Number(txn.amount) || 0;

      // Apply year filter 
      if (yearFilter !== "all" && year !== Number(yearFilter)) return;

      // Only create entry when there is data for this month
      if (!monthlyData[month]) {
        monthlyData[month] = { name: monthNames[month], income: 0, expense: 0 };
      }

      if (txn.type === "Income") {
        monthlyData[month].income += amount;
      } else if (txn.type === "Expense") {
        monthlyData[month].expense += amount;
      }
    });

    // Convert to array and keep months ordered Jan–Dec
    const sortedMonths = Object.keys(monthlyData)
      .map(Number)
      .sort((a, b) => a - b);

    return sortedMonths.map((m) => monthlyData[m]);
  }, [transactions, yearFilter]);

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
    <div className="stacked-bar-wrapper" style={{ width: "100%", height: 430 }}>
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {/* income/expense filter dropdown */}
        <div>
          <label>Show: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All (Income + Expense)</option>
            <option value="income">Income Only</option>
            <option value="expense">Expense Only</option>
          </select>
        </div>

        {/* year filter */}
        <div>
          <label>Year: </label>
          <select value={yearFilter} onChange={(e) => setYearFilter(e.target.value)}>
            <option value="all">All Years</option>
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
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
