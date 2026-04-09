import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function LandingPage() {
  const navigate = useNavigate();

  const goToApp = () => navigate("/app");

  return (
    <div className="landing-wrapper">
      {/* Navbar */}
      <nav className="landing-nav">
        <span className="landing-logo">
          task<span>.</span>
        </span>
        <div className="landing-nav-right">
          <ThemeToggle />
          <button className="landing-nav-btn" onClick={goToApp}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="landing-hero">
        <div className="landing-badge">
          <span className="landing-badge-dot" />
          Simple · Fast · Focused
        </div>

        <h1 className="landing-headline">
          Your tasks,
          <br />
          <em>beautifully</em> organized.
        </h1>

        <p className="landing-subtext">
          A minimal task manager that stays out of your way. Add tasks, drag to
          reorder, track progress — everything saves automatically.
        </p>

        <button className="landing-cta" onClick={goToApp}>
          Get Started
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <p className="landing-hint">No sign-up. No sync. Just tasks.</p>
      </main>

      {/* Feature cards */}
      <section className="landing-features">
        {[
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10l4 4 8-8"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: "Track completion",
            desc: "Mark tasks done with a click. See what's left at a glance.",
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M7 4h10M7 10h10M7 16h10M3 4v.01M3 10v.01M3 16v.01"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            ),
            title: "Drag to reorder",
            desc: "Prioritize your day by dragging tasks into any order you like.",
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle
                  cx="10"
                  cy="10"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
                <path
                  d="M10 6v4l2.5 2.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            ),
            title: "Smart timestamps",
            desc: "See when each task was added and when you got it done.",
          },
          {
            icon: (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2a8 8 0 100 16A8 8 0 0010 2z"
                  stroke="currentColor"
                  strokeWidth="1.75"
                />
                <path
                  d="M10 6c-1.5 0-3 .8-3 2.5S10 12 10 14c0-2 3-3.5 3-5.5S11.5 6 10 6z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: "Dark mode",
            desc: "Easy on the eyes at night. Your preference is saved automatically.",
          },
        ].map((f) => (
          <div className="landing-card" key={f.title}>
            <div className="landing-card-icon">{f.icon}</div>
            <h3 className="landing-card-title">{f.title}</h3>
            <p className="landing-card-desc">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="landing-bottom-cta">
        <p className="landing-bottom-text">Ready to get things done?</p>
        <button className="landing-cta" onClick={goToApp}>
          Open Task Manager
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </section>

      <footer className="landing-footer">
        Built with React · Saves to localStorage · No account needed
      </footer>
    </div>
  );
}
