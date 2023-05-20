import { createContext, useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";

export const ControlContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          ...action.payload,
        },
      ];

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    case "UPDATE_TASK":
      return action.payload;

    case "DELETE_ALL_TASK":
      return action.payload;

    default:
      return state;
  }
};

export const ControlProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [taskEdit, setTaskEdit] = useState({});

  //* Reduer function
  const [tasks, dispatch] = useReducer(
    taskReducer,
    JSON.parse(localStorage.getItem("tasksData")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasksData", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <ControlContext.Provider
      value={{
        tasks,
        dispatch,
        showModal,
        setShowModal,
        taskEdit,
        setTaskEdit,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
};

ControlProvider.propTypes = {
  children: PropTypes.node,
};
