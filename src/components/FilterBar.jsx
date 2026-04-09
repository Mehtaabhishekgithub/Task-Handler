import { useTasks } from "../context/TaskContext";

const FILTERS = ["all", "pending", "completed"];

export default function FilterBar() {
  const { setFilter, filter, counts } = useTasks();

  return (
    <div className="filter-bar">
      {FILTERS.map((f) => (
        <button
          key={f}
          className={`filter-btn${filter === f ? " active" : ""}`}
          onClick={() => setFilter(f)}
        >
          {f}
          {counts[f] > 0 && (
            <span
              style={{
                marginLeft: 5,
                fontSize: "0.72rem",
                opacity: filter === f ? 0.8 : 0.5,
              }}
            >
              {counts[f]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
