import React, { useState, useContext } from "react";
import { GoalProgressCard } from "../components/savings/GoalProgressCard";
import { AddEditGoalModal } from "../components/savings/AddEditGoalModal";
import "./Saving.css"; 
import { TransactionContext } from "../context/TransactionContext";

export function Savings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to hold the goal currently being edited (null if adding a new one)
  const [goalToEdit, setGoalToEdit] = useState(null); 
  const { state, addSavingGoal, editSavingGoal, deleteSavingGoal } = useContext(TransactionContext);
  const { savingGoals: goals } = state;


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
      deleteSavingGoal(goalId);
    }
  };

  const handleSaveGoal = (goalData) => {
    if (goalData.id) {
      // **Edit Existing Goal**
      editSavingGoal(goalData);
    } else {
      // **Add New Goal**
      const newGoal = { ...goalData, id: Date.now() }; // Assign unique ID
      addSavingGoal(newGoal);
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