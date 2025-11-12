import React from "react";

export function StatCard({ title, value, hint, accent = "var(--color-primary)" }) {
  return (
    <div
      role="region"
      aria-label={`${title} card`}
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: 16,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div style={{ fontSize: 12, color: "var(--color-muted)" }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700, marginTop: 6 }}>{value}</div>
      {hint && (
        <div
          style={{
            marginTop: 8,
            fontSize: 12,
            color: accent,
            fontWeight: 600,
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
export function BarChart({ data = [], height = 160 }) {
  /** Simple bar chart representation using divs. */
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div
      role="img"
      aria-label="Bar chart"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height }}>
        {data.map((d) => (
          <div
            key={d.label}
            title={`${d.label}: ${d.value}`}
            style={{
              flex: 1,
              height: `${(d.value / max) * 100}%`,
              background:
                "linear-gradient(180deg, rgba(37,99,235,0.8), rgba(37,99,235,0.3))",
              borderRadius: 6,
            }}
            aria-label={`${d.label} bar with value ${d.value}`}
          />
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${data.length}, 1fr)`,
          gap: 8,
          marginTop: 8,
          fontSize: 12,
          color: "var(--color-muted)",
        }}
      >
        {data.map((d) => (
          <div key={d.label} style={{ textAlign: "center" }}>
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
export function DonutChart({ value = 0, total = 100, label = "Chart" }) {
  /** Simple donut chart using conic-gradient */
  const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
  const rest = 100 - pct;
  return (
    <div
      role="img"
      aria-label={`${label} ${pct}%`}
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <div
        style={{
          width: 160,
          height: 160,
          margin: "0 auto",
          borderRadius: "50%",
          background: `conic-gradient(var(--color-secondary) ${pct}%, #E5E7EB 0 ${rest}%)`,
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: "50%",
            background: "var(--color-surface)",
            display: "grid",
            placeItems: "center",
            color: "var(--color-text)",
            fontWeight: 700,
          }}
        >
          {pct}%
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 8, color: "var(--color-muted)" }}>
        {label}
      </div>
    </div>
  );
}
