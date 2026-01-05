import { useState, useEffect } from "react";


function App() {
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [taskText, setTaskText] = useState("")

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (taskText.trim() === "") {
      alert("Please enter a task!");
      return;
    } 
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: taskText,
        completed: false
      }
    ]);
    setTaskText("")
  }

  function toggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
  }

  function deleteTask(id) {
    if (!window.confirm("Delete this task?")) return;
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <div className="App">
      <h1>Task Manager</h1>

      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a new task"
          value={taskText}
          onChange={(e) =>setTaskText(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-counter">
        <p>
          {tasks.filter(task => !task.completed).length} task
          {tasks.filter(task => !task.completed).length !== 1 ? "s" : ""} left        
        </p>
      </div>

      <div className="task-input">
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
            <ul>
              {filteredTasks.map(task => (
                <li key={task.id} className="task-item">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className={task.completed ? "completed" : ""}>
                    {task.text}
                  </span>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    ❌
                  </button>

                </li>
              ))}
            </ul>
        )}
      </div>

      <div className="filters">
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

    </div> 
  );
}

export default App;