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
  const [categories, setCategories] = useState();
  const [taskEdit, setTaskEdit] = useState({});

  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || "dark"
  );

  //* Reduer function
  const [tasks, dispatch] = useReducer(
    taskReducer,
    JSON.parse(localStorage.getItem("tasksData")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasksData", JSON.stringify(tasks));
  }, [tasks]);

  // useEffect for theme
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    document.documentElement.removeAttribute("class");
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ControlContext.Provider
      value={{
        tasks,
        dispatch,
        showModal,
        setShowModal,
        taskEdit,
        setTaskEdit,
        categories,
        setCategories,
        theme,
        setTheme,
      }}
    >
      {children}
    </ControlContext.Provider>
  );
};

ControlProvider.propTypes = {
  children: PropTypes.node,
};
