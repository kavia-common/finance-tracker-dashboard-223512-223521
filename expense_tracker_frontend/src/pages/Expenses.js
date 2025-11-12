import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";
import ExpensesTable from "../components/ExpensesTable";
import ExpensesFilter from "../components/ExpensesFilter";
import ExpenseForm from "../components/ExpenseForm";
import { Button } from "../components/Form";

function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => api.categories.list(),
    staleTime: 1000 * 60 * 10,
  });
}

function useExpenses(filters) {
  return useQuery({
    queryKey: ["expenses", filters],
    queryFn: () => api.expenses.list(filters),
  });
}

// PUBLIC_INTERFACE
export default function Expenses() {
  /** Expenses list with CRUD and filters */
  const queryClient = useQueryClient();
  const [filters, setFilters] = React.useState({});
  const [showForm, setShowForm] = React.useState(false);
  const [selected, setSelected] = React.useState(null);

  const { data: categories = [] } = useCategories();
  const {
    data: expenses = [],
    isLoading,
    isError,
    error,
  } = useExpenses(filters);

  const createMutation = useMutation({
    mutationFn: (payload) => api.expenses.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => api.expenses.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      setSelected(null);
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.expenses.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });

  function handleEdit(item) {
    setSelected(item);
    setShowForm(true);
  }
  function handleAdd() {
    setSelected(null);
    setShowForm(true);
  }
  async function handleSubmit(values) {
    if (selected) {
      await updateMutation.mutateAsync({ id: selected.id, payload: values });
    } else {
      await createMutation.mutateAsync(values);
    }
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ margin: 0 }}>Expenses</h2>
        <Button onClick={handleAdd}>+ Add Expense</Button>
      </div>
      <ExpensesFilter
        categories={categories}
        value={filters}
        onChange={(f) => setFilters(f)}
        onReset={() => setFilters({})}
      />
      {isError ? (
        <div role="alert" style={{ color: "var(--color-error)" }}>
          Failed to load expenses: {error?.message}
        </div>
      ) : (
        <ExpensesTable
          data={expenses}
          onEdit={handleEdit}
          onDelete={(id) => deleteMutation.mutate(id)}
          loading={isLoading}
        />
      )}
      {showForm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expense form dialog"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "grid",
            placeItems: "center",
            padding: 16,
          }}
          onClick={() => setShowForm(false)}
        >
          <div
            style={{ maxWidth: 520, width: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <ExpenseForm
              initialValue={
                selected
                  ? {
                      title: selected.title,
                      amount: selected.amount,
                      date: (selected.date || "").slice(0, 10),
                      categoryId: selected.categoryId,
                      notes: selected.notes || "",
                    }
                  : undefined
              }
              categories={categories}
              onCancel={() => setShowForm(false)}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}
