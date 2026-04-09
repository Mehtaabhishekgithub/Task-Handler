import { useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export default function ThemeToggle() {
  // BUG FIX: Use useLocalStorage hook instead of reading localStorage directly
  // on render (which can cause hydration mismatches and bypasses the hook system)
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const dark = theme === "dark";

  useEffect(() => {
    document.body.className = dark ? "dark" : "light";
  }, [dark]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
    >
      {dark ? (
        // Sun icon
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        // Moon icon
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M13.5 10A6 6 0 016 2.5a6 6 0 100 11 6 6 0 007.5-3.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
