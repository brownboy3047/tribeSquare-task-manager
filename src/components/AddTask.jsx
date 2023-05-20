import { useEffect, useRef, useState } from "react";
import { useControl } from "../hooks/useControl";

// style
import "./AddTask.css";

const AddTask = () => {
  const { showModal, setShowModal, taskEdit, setTaskEdit, tasks, dispatch } =
    useControl();
  const [categories, setCategories] = useState();

  //*click outside the modal container to close
  let modalRef = useRef(null);

  useEffect(() => {
    let handleModal = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(!showModal);
      }
    };

    document.addEventListener("mousedown", handleModal);

    return () => {
      document.removeEventListener("mousedown", handleModal);
    };
  }, [showModal, setShowModal]);

  // funtion to handle the ADD_TASK and UPDATE_TASK
  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskEdit.id) {
      const updateTask = tasks.map((list) =>
        list.id === taskEdit.id
          ? {
              id: taskEdit.id,
              name: taskEdit.name,
              category: categories,
            }
          : list
      );

      if (e.target.task.value !== "") {
        dispatch({ type: "UPDATE_TASK", payload: updateTask });
      }

      setTaskEdit({});
      setShowModal(!showModal);
    } else {
      const newTask = {
        id: Math.random() * 10000,
        name: e.target.task.value,
        category: categories,
      };

      if (e.target.task.value !== "") {
        dispatch({ type: "ADD_TASK", payload: newTask });
      }

      setTaskEdit({});
      setShowModal(!showModal);
    }
  };

  //*former main code
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const newTask = {
  //     id: Math.random() * 10000,
  //     name: e.target.task.value,
  //     category: categories,
  //   };

  //   if (e.target.task.value !== "") {
  //     dispatch({ type: "ADD_TASK", payload: newTask });
  //   }

  //   e.target.value = "";
  //   setTaskEdit({});
  //   setShowModal(!showModal);
  // };

  return (
    <main>
      {showModal && (
        <section className="add-task">
          <div className="add-task-modal" ref={modalRef}>
            <h1>Create Task</h1>
            <form onSubmit={handleSubmit}>
              <input
                className="add-task-input"
                type="text"
                name="task"
                value={taskEdit.name || ""}
                onChange={(e) =>
                  setTaskEdit({ ...taskEdit, name: e.target.value })
                }
                placeholder="Task description..."
                autoComplete="off"
                maxLength="30"
              />

              <fieldset className="add-task-categories">
                <legend>Categories</legend>

                <div className="add-task-categories-input">
                  <input
                    type="radio"
                    name="categories"
                    id="completed"
                    value="completed"
                    checked={categories === "completed"}
                    onChange={(event) => {
                      setCategories(event.target.value);
                    }}
                    required
                  />
                  <label htmlFor="completed">Completed</label>
                </div>

                <div className="add-task-categories-input">
                  <input
                    type="radio"
                    name="categories"
                    id="urgent"
                    value="urgent"
                    checked={categories === "urgent"}
                    onChange={(event) => {
                      setCategories(event.target.value);
                    }}
                  />
                  <label htmlFor="urgent">Urgent</label>
                </div>

                <div className="add-task-categories-input">
                  <input
                    type="radio"
                    name="categories"
                    id="important"
                    value="important"
                    checked={categories === "important"}
                    onChange={(event) => {
                      setCategories(event.target.value);
                    }}
                  />
                  <label htmlFor="important">Important</label>
                </div>

                <div className="add-task-categories-input">
                  <input
                    type="radio"
                    name="categories"
                    id="later"
                    value="later"
                    checked={categories === "later"}
                    onChange={(event) => {
                      setCategories(event.target.value);
                    }}
                  />
                  <label htmlFor="later">Later</label>
                </div>
              </fieldset>

              {taskEdit.id ? (
                <button type="submit">Update Task</button>
              ) : (
                <button type="submit">Add Task</button>
              )}
            </form>
          </div>
        </section>
      )}
    </main>
  );
};

export default AddTask;
