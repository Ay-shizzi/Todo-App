import React, { useState, useEffect } from "react";
import "./Todolist.css";
import moon from "./images/icon-moon.svg";
import sun from "./images/icon-sun.svg";
import cross from "./images/icon-cross.svg";

const TodoList = () => {
  const [isDarkMode, setDarkMode] = useState(true);
  //   todo functionality
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");
  //  ....

  useEffect(() => {
    // Update body class when isDarkMode changes
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!isDarkMode);
  };

  //   todo functionality
  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodoStatus = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = () => {
    switch (filter) {
      case "all":
        return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };
  // .......

  return (
    <>
      <div className="container">
        <div className="background">
          <div
            className={`header ${isDarkMode ? "dark-mode" : "light-mode"}`}
          ></div>
        </div>
        <div className="content">
          <div className="heading">
            <div className="logo">
              <h1 className="logo-name">TODO</h1>
            </div>
            <div className="theme-toggler">
              <img
                className="theme-icon"
                onClick={toggleDarkMode}
                src={isDarkMode ? sun : moon}
                alt=""
              />
            </div>
          </div>
          <div className="todolist-input">
            <input
              className={`input ${isDarkMode ? "dark-mode" : "light-mode"}`}
              type="text"
              placeholder="TodoList"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button
              type="button"
              className={`add-button ${
                isDarkMode ? "dark-mode" : "light-mode"
              }`}
              onClick={addTodo}
            >
              Add Todo
            </button>
          </div>
          <form>
            <div className={`todolist-output`}>
              {filteredTodos().map((todo) => (
                <div key={todo.id} onSubmit={(e) => e.preventDefault()}>
                  <div
                    className={`todo-item ${
                      isDarkMode ? "dark-mode" : "light-mode"
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={todo.id}
                      checked={todo.completed}
                      onChange={() => toggleTodoStatus(todo.id)}
                    />
                    <label htmlFor={todo.id}>{todo.text}</label>
                    <div
                      className={`delete-button ${
                        isDarkMode ? "dark-mode" : "light-mode"
                      }`}
                    >
                      <img
                        className="close-btn"
                        src={cross}
                        onClick={() => deleteTodo(todo.id)}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </form>

          <div
            className={`todolist-options ${
              isDarkMode ? "dark-mode" : "light-mode"
            }`}
          >
            <div className="items-left">
              <p>{todos.filter((todo) => !todo.completed).length} items left</p>
            </div>
            <div className="items">
              <p
                onClick={() => setFilter("all")}
                className={filter === "all" ? "active-filter" : ""}
              >
                All
              </p>
              <p
                onClick={() => setFilter("active")}
                className={filter === "active" ? "active-filter" : ""}
              >
                Active
              </p>
              <p
                onClick={() => setFilter("completed")}
                className={filter === "completed" ? "active-filter" : ""}
              >
                Completed
              </p>
            </div>

            <div className="cleared">
              <p
                onClick={() =>
                  setTodos(todos.filter((todo) => !todo.completed))
                }
              >
                Clear Completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
