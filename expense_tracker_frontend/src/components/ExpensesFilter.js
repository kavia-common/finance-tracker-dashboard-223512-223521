import React from "react";
import { Select, Input, Button } from "./Form";

// PUBLIC_INTERFACE
export default function ExpensesFilter({ categories = [], value, onChange, onReset }) {
  /** Filters: text, category, start/end date */
  const [local, setLocal] = React.useState(value || {});

  React.useEffect(() => {
    setLocal(value || {});
  }, [value]);

  function update(field, val) {
    const next = { ...local, [field]: val };
    setLocal(next);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 8,
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
      }}
    >
      <Input
        placeholder="Search title..."
        value={local.q || ""}
        onChange={(e) => update("q", e.target.value)}
        aria-label="Search title"
      />
      <Select
        value={local.categoryId || ""}
        onChange={(e) => update("categoryId", e.target.value)}
        aria-label="Filter by category"
        options={[
          { value: "", label: "All categories" },
          ...categories.map((c) => ({ value: c.id, label: c.name })),
        ]}
      />
      <Input
        type="date"
        value={local.startDate || ""}
        onChange={(e) => update("startDate", e.target.value)}
        aria-label="Start date"
      />
      <Input
        type="date"
        value={local.endDate || ""}
        onChange={(e) => update("endDate", e.target.value)}
        aria-label="End date"
      />
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          type="button"
          onClick={() => onChange?.(local)}
          aria-label="Apply filters"
        >
          Apply
        </Button>
        <Button
          type="button"
          kind="neutral"
          onClick={() => {
            onReset?.();
          }}
          aria-label="Reset filters"
          style={{
            background: "transparent",
            border: "1px solid var(--color-border)",
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
