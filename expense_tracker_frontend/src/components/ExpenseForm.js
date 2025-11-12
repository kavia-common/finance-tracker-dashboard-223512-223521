import React from "react";
import { Field, Input, Select, Button, validateExpense } from "./Form";

// PUBLIC_INTERFACE
export default function ExpenseForm({ initialValue, categories = [], onCancel, onSubmit }) {
  /** Add/Edit expense form with validation */
  const [values, setValues] = React.useState(
    initialValue || {
      title: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      categoryId: "",
      notes: "",
    }
  );
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);

  function update(field, val) {
    setValues((v) => ({ ...v, [field]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validateExpense(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    try {
      await onSubmit?.(values);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Expense form"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <Field label="Title" error={errors.title} required>
        <Input
          value={values.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="e.g., Office supplies"
          aria-required="true"
        />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Amount" error={errors.amount} required>
          <Input
            type="number"
            step="0.01"
            value={values.amount}
            onChange={(e) => update("amount", e.target.value)}
            placeholder="0.00"
            aria-required="true"
          />
        </Field>
        <Field label="Date" error={errors.date} required>
          <Input
            type="date"
            value={values.date}
            onChange={(e) => update("date", e.target.value)}
            aria-required="true"
          />
        </Field>
      </div>
      <Field label="Category" error={errors.categoryId} required>
        <Select
          value={values.categoryId}
          onChange={(e) => update("categoryId", e.target.value)}
          aria-required="true"
          options={[
            { value: "", label: "Select category" },
            ...categories.map((c) => ({ value: c.id, label: c.name })),
          ]}
        />
      </Field>
      <Field label="Notes">
        <Input
          value={values.notes || ""}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Optional notes"
        />
      </Field>
      <div style={{ display: "flex", gap: 8 }}>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save"}
        </Button>
        <Button
          type="button"
          kind="neutral"
          onClick={onCancel}
          style={{ background: "transparent", border: "1px solid var(--color-border)" }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
