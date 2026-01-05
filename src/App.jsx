import { useState } from "react";


function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("")

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
                <li key={task.id}>{task.text}</li>
              ))}
            </ul>
        )}
      </div>
    </div> 
  );
}

export default App;