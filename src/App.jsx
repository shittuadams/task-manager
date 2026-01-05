import { useState, useEffect } from "react";


function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [taskText, setTaskText] = useState("")

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
      <div className="task-input">
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
            <ul>
              {tasks.map(task => (
                <li key={task.id} className="task-item">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className={task.completed ? "completed" : ""}>
                    {task.text}
                  </span>
                </li>
              ))}
            </ul>
        )}
      </div>
    </div> 
  );
}

export default App;