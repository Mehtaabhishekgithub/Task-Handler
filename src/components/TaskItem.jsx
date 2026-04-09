import { memo } from "react";
import { useTasks } from "../context/TaskContext";

function formatTime(ts) {
  if (!ts) return null;
  const date = new Date(ts);
  const diffMs = Date.now() - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function TaskItem({ task, provided, snapshot }) {
  const { deleteTask, toggleTask } = useTasks();

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className={`task-item${task.completed ? " completed" : ""}${snapshot.isDragging ? " is-dragging" : ""}`}
      style={{ ...provided.draggableProps.style }}
    >
      {/* Drag handle */}
      <div {...provided.dragHandleProps} className="drag-handle" tabIndex={-1}>
        <span />
        <span />
        <span />
      </div>

      {/* Checkbox */}
      <div
        className="task-checkbox"
        onClick={() => toggleTask(task.id)}
        role="checkbox"
        aria-checked={task.completed}
        tabIndex={0}
        onKeyDown={(e) => e.key === " " && toggleTask(task.id)}
      >
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
          <path
            d="M1 4l3 3 6-6"
            stroke="white"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Text + timestamps */}
      <div className="task-body" onClick={() => toggleTask(task.id)}>
        <span className="task-text">{task.text}</span>
        <div className="task-timestamps">
          {task.createdAt && (
            <span className="task-ts">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle
                  cx="5"
                  cy="5"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M5 3v2l1.5 1.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              Added {formatTime(task.createdAt)}
            </span>
          )}
          {task.completed && task.completedAt && (
            <span className="task-ts task-ts--done">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2 5.5l2.5 2.5 4-5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Done {formatTime(task.completedAt)}
            </span>
          )}
        </div>
      </div>

      {/* Delete */}
      <button
        className="delete-btn"
        onClick={() => deleteTask(task.id)}
        aria-label="Delete task"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 2l10 10M12 2L2 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default memo(TaskItem);
