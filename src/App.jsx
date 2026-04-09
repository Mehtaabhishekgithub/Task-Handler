import { TaskProvider } from "./context/TaskContext";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import ThemeToggle from "./components/ThemeToggle";
import { useTasks } from "./context/TaskContext";
import "./styles/globals.css";

function AppContent() {
  const { counts } = useTasks();

  return (
    <div className="app-wrapper">
      <div className="app-container">
        <header className="app-header">
          <div>
            <h1 className="app-title">
              task<span>.</span>
            </h1>
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

export default function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}
