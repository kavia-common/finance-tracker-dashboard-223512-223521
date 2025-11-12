import React from "react";

export function Field({ label, error, children, required }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label
        style={{
          display: "block",
          marginBottom: 6,
          fontSize: 13,
          color: "var(--color-muted)",
        }}
      >
        {label} {required ? <span aria-hidden="true" style={{ color: "var(--color-error)" }}>*</span> : null}
      </label>
      {children}
      {error ? (
        <div role="alert" style={{ color: "var(--color-error)", fontSize: 12, marginTop: 4 }}>
          {error}
        </div>
      ) : null}
    </div>
  );
}

// PUBLIC_INTERFACE
export function Input(props) {
  /** Accessible input */
  return (
    <input
      {...props}
      style={{
        width: "100%",
        border: "1px solid var(--color-border)",
        borderRadius: 10,
        padding: "10px 12px",
        outline: "none",
        background: "var(--color-surface)",
      }}
    />
  );
}

export function Select({ options = [], ...props }) {
  return (
    <select
      {...props}
      style={{
        width: "100%",
        border: "1px solid var(--color-border)",
        borderRadius: 10,
        padding: "10px 12px",
        background: "var(--color-surface)",
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Button({ kind = "primary", children, ...props }) {
  const color =
    kind === "primary"
      ? "var(--color-primary)"
      : kind === "success"
      ? "var(--color-success)"
      : kind === "danger"
      ? "var(--color-error)"
      : "var(--color-surface)";
  const textColor = kind === "neutral" ? "inherit" : "#fff";
  return (
    <button
      {...props}
      style={{
        border: "none",
        borderRadius: 12,
        padding: "10px 14px",
        background: color,
        color: textColor,
        cursor: "pointer",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {children}
    </button>
  );
}

// PUBLIC_INTERFACE
export function validateExpense(payload) {
  /** Validate expense payload and return errors map */
  const errors = {};
  if (!payload.title || payload.title.trim().length < 2) {
    errors.title = "Title is required (min 2 characters).";
  }
  if (payload.amount === undefined || payload.amount === null || payload.amount === "" || isNaN(Number(payload.amount))) {
    errors.amount = "Valid amount is required.";
  } else if (Number(payload.amount) <= 0) {
    errors.amount = "Amount must be greater than 0.";
  }
  if (!payload.date) {
    errors.date = "Date is required.";
  }
  if (!payload.categoryId) {
    errors.categoryId = "Category is required.";
  }
  return errors;
}
