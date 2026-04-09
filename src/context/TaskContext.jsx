import { createContext, useContext, useMemo, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // Store the full (unfiltered) task list
  const [allTasks, setAllTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useLocalStorage("filter", "all");

  const addTask = useCallback(
    (text) => {
      if (!text.trim()) return false;
      const newTask = {
        id: uuidv4(),
        text: text.trim(),
        completed: false,
        createdAt: Date.now(),
      };
      setAllTasks((prev) => [newTask, ...prev]);
      return true;
    },
    [setAllTasks],
  );

  const deleteTask = useCallback(
    (id) => {
      setAllTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [setAllTasks],
  );

  const toggleTask = useCallback(
    (id) => {
      setAllTasks((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t;
          const nowCompleted = !t.completed;
          return {
            ...t,
            completed: nowCompleted,
            completedAt: nowCompleted ? Date.now() : null,
          };
        }),
      );
    },
    [setAllTasks],
  );

  // BUG FIX: reorder operates on allTasks, not filteredTasks.
  // When filter is active, we map the reordered filtered IDs back into the full list.
  const reorderTasks = useCallback(
    (reorderedVisible) => {
      setAllTasks((prev) => {
        const reorderedIds = reorderedVisible.map((t) => t.id);
        // Build a new list: place tasks in order of reorderedIds,
        // then append any tasks not in the visible set (other filter group).
        const visibleSet = new Set(reorderedIds);
        const hidden = prev.filter((t) => !visibleSet.has(t.id));
        const reordered = reorderedIds.map((id) =>
          prev.find((t) => t.id === id),
        );
        // Merge: interleave hidden tasks back by their original relative positions
        // For simplicity: put hidden tasks at the end (they're not visible anyway)
        return [...reordered, ...hidden];
      });
    },
    [setAllTasks],
  );

  const filteredTasks = useMemo(() => {
    if (filter === "completed") return allTasks.filter((t) => t.completed);
    if (filter === "pending") return allTasks.filter((t) => !t.completed);
    return allTasks;
  }, [allTasks, filter]);

  const counts = useMemo(
    () => ({
      all: allTasks.length,
      completed: allTasks.filter((t) => t.completed).length,
      pending: allTasks.filter((t) => !t.completed).length,
    }),
    [allTasks],
  );

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        allTasks,
        addTask,
        deleteTask,
        toggleTask,
        setFilter,
        filter,
        reorderTasks,
        counts,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
