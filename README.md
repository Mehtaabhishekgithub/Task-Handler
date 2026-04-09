# task. ✦ Advanced Task Manager

A clean, fast task manager built with React — featuring drag-and-drop, dark mode, smart timestamps, and local persistence.

---

## Features

### Core
- **Add tasks** — press Enter or click Add; empty/whitespace tasks are rejected with inline feedback
- **Complete tasks** — click the checkbox to toggle; completed tasks show a strikethrough
- **Delete tasks** — hover a task to reveal the × button
- **Filter tasks** — switch between All, Pending, and Completed views (with live counts)
- **Persist tasks** — everything saves to `localStorage` automatically; no backend needed

### React Challenges
- **Custom Hook** — `useLocalStorage` wraps `localStorage` with React state, functional updates, and error handling
- **Context API** — `TaskContext` manages all task state globally; no prop drilling anywhere
- **Performance** — `React.memo` on `TaskItem`, `useCallback` on all mutators, `useMemo` for filtered views and counts
- **Form Validation** — empty/whitespace input is blocked with an animated error message

### UI/UX
- **Dark / Light mode** — toggle persists across sessions via `localStorage`
- **Drag-and-drop reordering** — powered by `@hello-pangea/dnd`; works correctly across all filter views
- **Timestamps** — each task shows when it was added and, once completed, when it was marked done (smart relative format: `just now → 5m ago → 3h ago → yesterday → Nov 12`)
- **Animations** — tasks slide in on add; drag state shown with rotation + accent border
- **Responsive** — mobile-first layout, delete button always visible on small screens

---

## Tech Stack

| Concern | Library |
|---|---|
| Framework | React 18 |
| Build tool | Vite |
| Drag-and-drop | `@hello-pangea/dnd` |
| Unique IDs | `uuid` |
| Fonts | DM Sans + DM Mono (Google Fonts) |
| Storage | Browser `localStorage` |

---

## Project Structure

```
task-manager/
├── public/
├── src/
│   ├── components/
│   │   ├── TaskInput.jsx      # Input field with validation + error state
│   │   ├── TaskList.jsx       # Drag-and-drop list container
│   │   ├── TaskItem.jsx       # Individual task card with timestamps
│   │   ├── FilterBar.jsx      # All / Pending / Completed filter tabs
│   │   └── ThemeToggle.jsx    # Dark/light mode toggle (icon button)
│   ├── context/
│   │   └── TaskContext.jsx    # Global state: tasks, filter, counts, actions
│   ├── hooks/
│   │   └── useLocalStorage.js # Custom hook for persistent state
│   ├── styles/
│   │   └── globals.css        # All styles — CSS variables, dark mode, animations
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone https://github.com/your-username/task-manager.git
cd task-manager

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Key Implementation Notes

### Bug Fixes Applied

**Drag-and-drop with active filters** — The original code wrote the *filtered* task list back as the full list on reorder, silently deleting tasks in other filter groups. Fixed in `TaskContext` by mapping reordered visible IDs back into the complete `allTasks` array.

**ThemeToggle** — Was reading `localStorage` directly during render, bypassing the custom hook. Replaced with `useLocalStorage("theme", "light")` for consistency.

**useLocalStorage** — Added `try/catch` around `JSON.parse` to handle corrupt storage gracefully, and a `keyRef` to prevent stale closure issues in the sync effect.

**Empty task validation** — Added a proper error state with a shake animation rather than silently dropping the input.

### Data Shape

Each task stored in `localStorage` looks like:

```json
{
  "id": "uuid-v4",
  "text": "Buy oat milk",
  "completed": false,
  "createdAt": 1712650000000,
  "completedAt": null
}
```

`completedAt` is set to `Date.now()` when marked done, and reset to `null` if unchecked.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## License

MIT