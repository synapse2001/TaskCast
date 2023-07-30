import React, { useState, useEffect } from "react";
import { auth, useFirebase } from "../context/firebase";
import { signOut } from "firebase/auth";
import HomePage from "./HomePage";
import "../styles/Test.css"; // Import your CSS file with theme styles

const TestPage = ({ user, podcastData }) => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [savedTheme, setSavedTheme] = useState(localStorage.getItem('savedTheme') || 'standard');

  const firebase = useFirebase();

  useEffect(() => {
    document.body.className = savedTheme;
    // Load todos from local storage
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, [savedTheme]);

  const changeTheme = (color) => {
    localStorage.setItem('savedTheme', color);
    setSavedTheme(color);
  };

  const addToDo = () => {
    if (task.trim() === '') {
      alert("You must write something!");
      return;
    }

    const newTodo = {
      task: task,
      completed: false,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTask("");

    // Save todos to local storage
    localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
  };

  const toggleTodoStatus = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;

    setTodos(updatedTodos);

    // Save updated todos to local storage
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const deleteToDo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);

    setTodos(updatedTodos);

    // Save updated todos to local storage
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#062e3f" />
        <meta name="Description" content="A dynamic and aesthetic To-Do List WebApp." />

        {/* Google Font: Quick Sand */}
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap" rel="stylesheet" />

        {/* font awesome (https://fontawesome.com) for basic icons; source: https://cdnjs.com/libraries/font-awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css" integrity="sha256-46r060N2LrChLLb5zowXQ72/iKKNiw/lAmygmHExk/o=" crossorigin="anonymous" />

        <link rel="shortcut icon" type="image/png" href="assets/favicon.png" />
        <title>JUST DO IT</title>
      </head>
      <body className="testing">
        <div id="header">
          <div className="flexrow-container">
            <div onClick={() => changeTheme('standard')} className="standard-theme theme-selector"></div>
            <div onClick={() => changeTheme('light')} className="light-theme theme-selector"></div>
            <div onClick={() => changeTheme('darker')} className="darker-theme theme-selector"></div>
          </div>
          <h1 id="title">Just do it.<div id="border"></div></h1>
        </div>

        <div className="taskinput" id="form">
          <input
            onChange={(e) => setTask(e.target.value)}
            value={task}
            type="text"
            className={`todo-input ${savedTheme}-input`}
            placeholder="Add a task."
          />
          <button onClick={addToDo} className={`todo-btn ${savedTheme}-button`}>
            I Got This!
          </button>
          <button onClick={() => { signOut(auth); window.location.href = "/"; }}>
            Logout
          </button>
        </div>
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <div key={index} className={`todo ${savedTheme}-todo ${todo.completed ? 'completed' : ''}`}>
              <li className="todo-item">{todo.task}</li>
              <button
                className={`check-btn ${savedTheme}-button`}
                onClick={() => toggleTodoStatus(index)}
              >
                <i className="fas fa-check" />
              </button>
              <button
                className={`delete-btn ${savedTheme}-button`}
                onClick={() => deleteToDo(index)}
              >
                <i className="fas fa-trash" />
              </button>
            </div>
          ))}
        </ul>
        <div className="playercss">
          <HomePage
            user={user}
            podcastData={podcastData}
          />
        </div>
      </body>
    </html>
  );
};

export default TestPage;
