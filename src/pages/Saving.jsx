import React, { useState } from "react";
import { GoalProgressCard } from "../components/savings/GoalProgressCard";
import { AddEditGoalModal } from "../components/savings/AddEditGoalModal";
import "./Saving.css"; 

export function Savings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to hold the goal currently being edited (null if adding a new one)
  const [goalToEdit, setGoalToEdit] = useState(null); 

//sample data 
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Car Fund",
      saved: 3500,
      target: 10000,
      dueDate: "2026-12-31",
    },
    {
      id: 2,
      name: "Vacation",
      saved: 2000,
      target: 5000,
      dueDate: "2025-08-01",
    },
  ]);

  const openAddModal = () => {
    setGoalToEdit(null); // Clear any goal being edited
    setIsModalOpen(true);
  };

  const openEditModal = (goalId) => {
    const goal = goals.find((g) => g.id === goalId);
    setGoalToEdit(goal);
    setIsModalOpen(true);
  };

  const handleDeleteGoal = (goalId) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
    }
  };

  const handleSaveGoal = (goalData) => {
    if (goalData.id) {
      // **Edit Existing Goal**
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === goalData.id ? { ...goal, ...goalData } : goal
        )
      );
    } else {
      // **Add New Goal**
      setGoals((prevGoals) => [
        { ...goalData, id: Date.now() }, // Assign unique ID
        ...prevGoals,
      ]);
    }
    setIsModalOpen(false);
    setGoalToEdit(null);
  };

  return (
    <div className="savings-page">
      <div className="savings-header">
        <h2>My Saving Goals Overview</h2>
        <button className="add-goal-btn" onClick={openAddModal}>
          + Add Saving
        </button>
      </div>

      <div className="goals-list">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <GoalProgressCard
              key={goal.id}
              goal={goal}
              onEdit={openEditModal}
              onDelete={handleDeleteGoal}
            />
          ))
        ) : (
          <p>No saving goals set yet! Click '+ Add Saving' to create one.</p>
        )}
      </div>

      {isModalOpen && (
        <AddEditGoalModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveGoal}
          goalToEdit={goalToEdit}
        />
      )}
    </div>
  );
}