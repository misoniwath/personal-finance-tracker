import { PieChart, Pie, Sector, Tooltip, ResponsiveContainer } from "recharts";
import "./CategoryExpense.css";
import { TransactionContext } from "../../context/TransactionContext";
import { useContext, useState } from "react";


const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#8884d8"
      >{`$${value.toFixed(2)}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >{`(${(percent * 100).toFixed(2)}%)`}</text>
    </g>
  );
};

export function CustomActiveShapePieChart() {
  const { state } = useContext(TransactionContext);
  const { transactions } = state;
  const [activeIndex, setActiveIndex] = useState(0);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const expenseTransactions = transactions.filter((t) => t.type === "Expense");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const availableMonths = Array.from(
    new Set(
      expenseTransactions
        .map((t) => {
          if (!t.date) return null;
          const d = new Date(t.date);
          if (isNaN(d.getTime())) return null;
          return d.getMonth();
        })
        .filter((m) => m !== null)
    )
  ).sort((a, b) => a - b);

  const availableYears = Array.from(
    new Set(
      expenseTransactions
        .map((t) => {
          if (!t.date) return null;
          const d = new Date(t.date);
          if (isNaN(d.getTime())) return null;
          return d.getFullYear();
        })
        .filter((y) => y !== null)
    )
  ).sort((a, b) => a - b);

  const filteredExpenseTransactions = expenseTransactions.filter((t) => {
    if (!t.date) return false;
    const d = new Date(t.date);
    if (isNaN(d.getTime())) return false;

    const monthMatch =
      selectedMonth === "" || d.getMonth().toString() === selectedMonth;
    const yearMatch =
      selectedYear === "" || d.getFullYear().toString() === selectedYear;

    return monthMatch && yearMatch;
  });

  const categoryTotals = filteredExpenseTransactions.reduce((acc, t) => {
    const amount = Number(t.amount);
    if (acc[t.category]) {
      acc[t.category] += amount;
    } else {
      acc[t.category] = amount;
    }
    return acc;
  }, {});

  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleResetFilters = () => {
    setSelectedMonth("");
    setSelectedYear("");
  };

  if (data.length === 0) {
    return (
      <div style={{ width: "100%", height: 300 }}>
        <div className="category-expense-filters">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {availableMonths.map((m) => (
              <option key={m} value={m.toString()}>
                {monthNames[m]}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            {availableYears.map((y) => (
              <option key={y} value={y.toString()}>
                {y}
              </option>
            ))}
          </select>

          <button type="button" onClick={handleResetFilters}>
            Reset
          </button>
        </div>

        <div className="no-data">
          No expense data to display for the selected period
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 300 }}>
      <div className="category-expense-filters">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">All Months</option>
          {availableMonths.map((m) => (
            <option key={m} value={m.toString()}>
              {monthNames[m]}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">All Years</option>
          {availableYears.map((y) => (
            <option key={y} value={y.toString()}>
              {y}
            </option>
          ))}
        </select>

        <button type="button" onClick={handleResetFilters}>
          Reset
        </button>
      </div>

      <ResponsiveContainer>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
