import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import FilterBar from "./FilterBar";
import ThemeToggle from "./ThemeToggle";

export default function TaskApp() {
  const { counts } = useTasks();

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <header className="app-header">
          <div>
            <Link to="/" className="app-logo-btn" title="Back to home">
              <h1 className="app-title">
                task<span>.</span>
              </h1>
            </Link>
            <p className="app-subtitle">
              {counts.pending} remaining · {counts.completed} done
            </p>
          </div>
          <ThemeToggle />
        </header>

        <TaskInput />
        <FilterBar />
        <TaskList />
      </div>
    </div>
  );
}
