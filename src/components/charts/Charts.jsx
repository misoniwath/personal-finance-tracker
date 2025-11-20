import { StackedBarChart } from "./StackedBarChart";
import { CustomActiveShapePieChart } from "./CategoryExpense";
import "./charts.css";
import { SavingGoal } from "./SavingGoal";

export function Charts() {
  return (
    <div className="chartsSection">
      {/* Charts component content goes here */}
      <div className="chart-card">
        <h2>Income vs Expense</h2>
        <StackedBarChart />
      </div>
      <div className="chart-card">
        <h2>Expense by Category</h2>
        <CustomActiveShapePieChart />
      </div>
      <div className="chart-card">
        <h2>Saving Goals</h2>
        <SavingGoal />
      </div>
    </div>
  );
}
