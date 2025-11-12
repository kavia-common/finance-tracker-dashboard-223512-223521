import React from "react";
import { Button } from "./Form";

export function EmptyState({ title, description, action }) {
  return (
    <div
      role="region"
      aria-label="Empty state"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: 24,
        textAlign: "center",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ color: "var(--color-muted)", marginBottom: 10 }}>
        {description}
      </div>
      {action}
    </div>
  );
}

// PUBLIC_INTERFACE
export default function ExpensesTable({ data, onEdit, onDelete, loading }) {
  /** Simple table for expenses list with actions */
  if (loading) {
    return <div aria-busy="true">Loading expenses...</div>;
  }
  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No expenses found"
        description="Get started by adding your first expense."
        action={null}
      />
    );
  }
  return (
    <div
      style={{
        overflowX: "auto",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--color-surfaceAlt)" }}>
            <Th>Title</Th>
            <Th>Amount</Th>
            <Th>Category</Th>
            <Th>Date</Th>
            <Th style={{ textAlign: "right" }}>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => (
            <tr key={e.id} style={{ borderTop: "1px solid var(--color-border)" }}>
              <Td>{e.title}</Td>
              <Td>${Number(e.amount).toFixed(2)}</Td>
              <Td>{e.categoryName || e.category || "-"}</Td>
              <Td>{new Date(e.date).toLocaleDateString()}</Td>
              <Td style={{ textAlign: "right" }}>
                <Button kind="neutral" onClick={() => onEdit(e)} style={{ marginRight: 8, background: "transparent", border: "1px solid var(--color-border)" }}>
                  Edit
                </Button>
                <Button kind="danger" onClick={() => onDelete(e.id)}>Delete</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children, ...props }) {
  return (
    <th
      {...props}
      style={{
        textAlign: "left",
        padding: "12px",
        fontSize: 12,
        color: "var(--color-muted)",
      }}
    >
      {children}
    </th>
  );
}

function Td({ children, ...props }) {
  return (
    <td
      {...props}
      style={{
        padding: "12px",
        fontSize: 14,
      }}
    >
      {children}
    </td>
  );
}
