import { createContext, useReducer, useEffect } from "react";

const transactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      const newTransaction = action.payload;
      let updatedSavingGoals = state.savingGoals;
      
      // If it's a Savings transaction, update the corresponding goal's saved amount
      if (newTransaction.type === "Savings" && newTransaction.category) {
        updatedSavingGoals = state.savingGoals.map((goal) => {
          if (goal.name === newTransaction.category) {
            return {
              ...goal,
              saved: (goal.saved || 0) + Number(newTransaction.amount),
            };
          }
          return goal;
        });
      }
      
      return {
        ...state,
        transactions: [newTransaction, ...state.transactions],
        savingGoals: updatedSavingGoals,
      };
    case "DELETE_TRANSACTION":
      // Find the transaction being deleted to check if it's a Savings transaction
      const transactionToDelete = state.transactions.find(
        (t) => t.id === action.payload
      );
      
      let updatedGoalsAfterDelete = state.savingGoals;
      
      // If deleting a Savings transaction, subtract the amount from the goal
      if (transactionToDelete && transactionToDelete.type === "Savings" && transactionToDelete.category) {
        updatedGoalsAfterDelete = state.savingGoals.map((goal) => {
          if (goal.name === transactionToDelete.category) {
            return {
              ...goal,
              saved: Math.max(0, (goal.saved || 0) - Number(transactionToDelete.amount)),
            };
          }
          return goal;
        });
      }
      
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
        savingGoals: updatedGoalsAfterDelete,
      };
    case "ADD_GOAL":
  return {
    ...state,
    savingGoals: [action.payload, ...state.savingGoals]
  };

case "EDIT_GOAL":
  return {
    ...state,
    savingGoals: state.savingGoals.map(goal =>
      goal.id === action.payload.id ? action.payload : goal
    )
  };

case "DELETE_GOAL":
  return {
    ...state,
    savingGoals: state.savingGoals.filter(goal => goal.id !== action.payload)
  };
    case "ADD_BUDGET":
      return {
        ...state,
        budgets: [action.payload, ...state.budgets]
      };
    case "EDIT_BUDGET":
      return {
        ...state,
        budgets: state.budgets.map(budget =>
          budget.id === action.payload.id ? action.payload : budget
        )
      };
    case "DELETE_BUDGET":
      return {
        ...state,
        budgets: state.budgets.filter(budget => budget.id !== action.payload)
      };
    default:
      return state;
  }
};



const initialState = {
    
  balance: 0,
  transactions: [],
  savingGoals: [
    // Example goal structure
    {
      id: 1,
      name: "Emergency Fund",
      saved: 1500,
      target: 5000,
      dueDate: "2025-12-31",
    },
    {
      id: 2,
      name: "Vacation",
      saved: 2000,
      target: 3000,
      dueDate: "2024-08-15",
    }
  ],
  budgets: [
    { id: 1, category: 'Bills', amount: 400.00, color: '#3b82f6', themeColor: '#eff6ff' },
    { id: 2, category: 'Shopping', amount: 250.00, color: '#eab308', themeColor: '#fefce8' },
    { id: 3, category: 'Transportation', amount: 150.00, color: '#f97316', themeColor: '#fff7ed' },
    { id: 4, category: 'Entertainment', amount: 250.00, color: '#ec4899', themeColor: '#fdf2f8' },
    { id: 5, category: 'Others', amount: 100.00, color: '#64748b', themeColor: '#f1f5f9' },
    { id: 6, category: 'Emergency', amount: 150.00, color: '#2ecc71', themeColor: '#ebfdf3' },
  ],
};

const STORAGE_KEY = "transactionData";

const getInitialState = () => {
  // Check if window is defined (to avoid issues during SSR)
  if (typeof window === "undefined") return initialState;
  // Retrieve from localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return initialState;

  try {
    const parsed = JSON.parse(stored);
    // Merge to keep any new defaults you might add later
    return {
      ...initialState,
      ...parsed,
    };
  } catch (e) {
    console.error("Failed to parse localStorage state", e);
    return initialState;
  }
};

export const TransactionContext = createContext(initialState);

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState, getInitialState);
  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save to localStorage", error);
    }
  }, [state]);

  const addSavingGoal = (goal) => {
  dispatch({ type: "ADD_GOAL", payload: goal });
};

const editSavingGoal = (goal) => {
  dispatch({ type: "EDIT_GOAL", payload: goal });
};

const deleteSavingGoal = (goalId) => {
  dispatch({ type: "DELETE_GOAL", payload: goalId });
};

  const addBudget = (budget) => {
    dispatch({ type: "ADD_BUDGET", payload: budget });
  };

  const editBudget = (budget) => {
    dispatch({ type: "EDIT_BUDGET", payload: budget });
  };

  const deleteBudget = (budgetId) => {
    dispatch({ type: "DELETE_BUDGET", payload: budgetId });
  };

  return (
    <TransactionContext.Provider value={{ state, dispatch, addSavingGoal, editSavingGoal, deleteSavingGoal, addBudget, editBudget, deleteBudget }}>
      {children}
    </TransactionContext.Provider>
  );
};
