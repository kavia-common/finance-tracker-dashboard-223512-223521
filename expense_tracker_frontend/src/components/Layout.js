import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Layout() {
  /** App shell with top navigation and sidebar, responsive */
  const [open, setOpen] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    // close sidebar on route change for small screens
    setOpen(false);
  }, [location.pathname]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        color: "var(--color-text)",
        display: "grid",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <TopNav onMenuClick={() => setOpen((v) => !v)} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: "16px",
        }}
      >
        <Sidebar open={open} />
        <main
          role="main"
          style={{
            padding: "16px",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function TopNav({ onMenuClick }) {
  return (
    <header
      style={{
        background: "var(--color-surface)",
        boxShadow: "var(--shadow-sm)",
        borderBottom: "1px solid var(--color-border)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
      aria-label="Top navigation bar"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 16px",
          gap: 12,
        }}
      >
        <button
          onClick={onMenuClick}
          aria-label="Toggle menu"
          style={iconButtonStyle}
        >
          ☰
        </button>
        <div style={{ fontWeight: 700 }}>
          <span
            style={{
              color: "var(--color-primary)",
              marginRight: 6,
            }}
          >
            Ocean
          </span>
          Expenses
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
          <input
            aria-label="Search"
            placeholder="Search..."
            style={searchStyle}
          />
          <button style={iconButtonStyle} aria-label="Notifications">
            🔔
          </button>
          <button style={profileButtonStyle} aria-label="Profile">
            <span role="img" aria-label="user">
              👤
            </span>
            <span className="sr-only">Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ open }) {
  return (
    <aside
      style={{
        background: "var(--color-surface)",
        borderRight: "1px solid var(--color-border)",
        borderRadius: "0 0 var(--radius-md) 0",
        padding: 16,
        display: open ? "block" : "none",
      }}
      aria-label="Sidebar navigation"
    >
      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <NavItem to="/dashboard" label="Dashboard" />
          <NavItem to="/expenses" label="Expenses" />
          <NavItem to="/settings" label="Settings" />
          <NavItem to="/health" label="Health" />
        </ul>
      </nav>
    </aside>
  );
}

function NavItem({ to, label }) {
  return (
    <li>
      <NavLink
        to={to}
        style={({ isActive }) => ({
          display: "block",
          padding: "10px 12px",
          margin: "6px 0",
          textDecoration: "none",
          color: isActive ? "var(--color-primary)" : "inherit",
          background: isActive ? "var(--gradient)" : "transparent",
          borderRadius: "var(--radius-md)",
          transition: "all .2s ease",
        })}
        aria-label={label}
      >
        {label}
      </NavLink>
    </li>
  );
}

const iconButtonStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "10px",
  padding: "8px 10px",
  cursor: "pointer",
};

const profileButtonStyle = {
  ...iconButtonStyle,
};

const searchStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "12px",
  padding: "8px 10px",
  minWidth: 180,
};
