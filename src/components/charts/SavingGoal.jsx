import { GoGoal } from "react-icons/go";
import "./SavingGoal.css";
import { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import { TransactionContext } from "../../context/TransactionContext";

export function SavingGoal() {
  const { settings } = useContext(SettingsContext);
  const { state } = useContext(TransactionContext);
  const { savingGoals: goals } = state;

  // const goals = [
  //   { name: "Car", saved: 3500, target: 10000 },
  //   { name: "Vacation", saved: 2000, target: 5000 },
  //   { name: "Emergency Fund", saved: 1500, target: 3000 },
  // ];

  return (
    <div>
      <div className="goal-header"> 
      <h2>Saving Goals</h2>
      <GoGoal className="goal-icon" />
      </div>

      {goals.map((goal, index) => {
        const progress = (goal.saved / goal.target) * 100;

        return (
          <div key={index} className="goalItem">
            <h3>{goal.name}</h3>

            <p>
              {settings.currency}{goal.saved} of {settings.currency}{goal.target} saved
            </p>

            <div className="progressBar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>

            <span className="percentText">
              {progress.toFixed(1)}% complete
            </span>

            <br /><br />
          </div>
        );
      })}
    </div>
  );
}
