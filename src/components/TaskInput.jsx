import { useState, useCallback } from "react";
import { useTasks } from "../context/TaskContext";

export default function TaskInput() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { addTask } = useTasks();

  const handleAdd = useCallback(() => {
    if (!text.trim()) {
      setError("Task can't be empty.");
      return;
    }
    const added = addTask(text);
    if (added !== false) {
      setText("");
      setError("");
    }
  }, [text, addTask]);

  const handleChange = (e) => {
    setText(e.target.value);
    if (error) setError("");
  };

  return (
    <div>
      <div className={`task-input-wrapper${error ? " has-error" : ""}`}>
        <input
          className="task-input"
          value={text}
          onChange={handleChange}
          placeholder="Add a new task..."
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          maxLength={200}
          autoFocus
        />
        <button className="add-btn" onClick={handleAdd}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1v12M1 7h12"
              stroke="white"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
          Add
        </button>
      </div>
      {error && <p className="input-error">{error}</p>}
    </div>
  );
}
