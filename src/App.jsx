import { Routes, Route, Navigate } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext";
import LandingPage from "./pages/LandingPage";
import TaskApp from "./components/TaskApp";
import "./styles/globals.css";

export default function App() {
  return (
    <TaskProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<TaskApp />} />
        {/* Catch-all — redirect unknown routes to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TaskProvider>
  );
}
