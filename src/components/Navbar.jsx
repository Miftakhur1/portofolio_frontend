import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* LOGO */}
        <Link to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <span className="brand-name">Miftah</span>
          <span className="brand-dot">.</span>
          <span className="brand-suffix">dev</span>
        </Link>

        {/* HAMBURGER */}
        <button
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* MENU */}
        <div className={`navbar-menu ${open ? "open" : ""}`}>
          {["/", "/project", "/contact"].map((path, i) => {
            const label = ["Home", "Projects", "Contact"][i];
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={`navbar-link ${pathname === path ? "active" : ""}`}
              >
                {label}
              </Link>
            );
          })}

          <button
            onClick={() => setDark(!dark)}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            <span className="toggle-icon">
              {dark ? "🌙" : "☀️"}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
