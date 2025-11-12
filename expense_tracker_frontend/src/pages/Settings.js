import React from "react";

// PUBLIC_INTERFACE
export default function Settings() {
  /** Basic settings/profile stub */
  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <h2 style={{ marginTop: 0 }}>Settings</h2>
      <p style={{ color: "var(--color-muted)" }}>
        Profile and application settings will appear here in future iterations.
      </p>
      <ul>
        <li>Profile: name, avatar, email</li>
        <li>Preferences: currency, theme, default filters</li>
        <li>Security: sessions, 2FA</li>
      </ul>
    </div>
  );
}
