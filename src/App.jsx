import { useState, useEffect } from "react";
import {
  FaBookOpen,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaMoon,
  FaSun,
  FaTrashAlt,
  FaRedoAlt,
} from "react-icons/fa";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const addTask = () => {
    if (!task.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: task,
        status: "Yet To Start",
        progress: 0,
        due: "None",
      },
    ]);
    setTask("");
  };

  const updateTask = (id, field, value) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const resetProgress = (id) => {
    updateTask(id, "progress", 0);
  };

  return (
    <>
      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video-bg"
      >
        <source src="/earth-bg.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="overlay"></div>

      {/* APP CONTENT */}
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1>
            <FaBookOpen style={{ marginRight: "8px" }} />
            Study Todo Tracker
          </h1>

          <button
            className="theme-btn"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            title="Toggle theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>

        {/* Input */}
        <div className="input-box">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What will you study?"
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        {/* Task List */}
        {tasks.map(t => (
          <div className="task-card" key={t.id}>
            <h3>
              <FaBookOpen style={{ marginRight: "6px" }} />
              {t.title}
            </h3>

            <p>
              Status:
              <span className={`status ${t.status}`}> {t.status}</span>
            </p>

            {/* Status Buttons */}
            <div className="buttons">
              <button onClick={() => updateTask(t.id, "status", "Ongoing")}>
                <FaClock /> Ongoing
              </button>

              <button onClick={() => updateTask(t.id, "status", "Completed")}>
                <FaCheckCircle /> Completed
              </button>

              <button onClick={() => updateTask(t.id, "status", "Dropped")}>
                <FaTimesCircle /> Dropped
              </button>
            </div>

            {/* Progress */}
            <div className="progress">
              <p><b>Progress</b></p>

              {[1, 2, 3, 4, 5].map(n => (
                <span
                  key={n}
                  onClick={() => updateTask(t.id, "progress", n)}
                  title={`Progress ${n}/5`}
                >
                  {n <= t.progress ? "★" : "☆"}
                </span>
              ))}

              {t.progress > 0 && (
                <button
                  className="reset-btn"
                  onClick={() => resetProgress(t.id)}
                  title="Reset progress"
                >
                  <FaRedoAlt />
                </button>
              )}
            </div>

            {/* Due Buttons */}
            <div className="due-buttons">
              <button
                className={t.due === "Today" ? "active" : ""}
                onClick={() => updateTask(t.id, "due", "Today")}
              >
                Today
              </button>

              <button
                className={t.due === "Tomorrow" ? "active" : ""}
                onClick={() => updateTask(t.id, "due", "Tomorrow")}
              >
                Tomorrow
              </button>
            </div>

            {/* Delete */}
            <button
              className="delete-btn"
              onClick={() => deleteTask(t.id)}
              title="Delete task"
            >
              <FaTrashAlt /> Delete Task
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
