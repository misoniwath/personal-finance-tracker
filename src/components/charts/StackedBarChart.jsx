import React, { useState, useMemo } from "react";
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

const data = [
  { name: "Jan", income: 4000, expense: 2400 },
  { name: "Feb", income: 3000, expense: 1398 },
  { name: "Mar", income: 2000, expense: 9800 },
  { name: "Apr", income: 2780, expense: 3908 },
  { name: "May", income: 1890, expense: 4800 },
  { name: "Jun", income: 2390, expense: 3800 },
  { name: "Jul", income: 3490, expense: 4300 },
];

export function StackedBarChart() {
  const [filter, setFilter] = useState("all"); 

  // Filter logic
  const filteredData = useMemo(() => {
    return data.map((item) => {
      if (filter === "income") return { name: item.name, income: item.income };
      if (filter === "expense") return { name: item.name, expense: item.expense };
      return item; 
    });
  }, [filter]);

  return (
    <div className="stacked-bar-wrapper" style={{ width: "100%", height: 400 }}>
      {/* Filter Control */}
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
          <Tooltip />
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
