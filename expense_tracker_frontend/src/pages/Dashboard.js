import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import { BarChart, DonutChart, StatCard } from "../components/Charts";

function useExpensesOverview(filters) {
  return useQuery({
    queryKey: ["expenses", "overview", filters],
    queryFn: async () => {
      const list = await api.expenses.list(filters);
      // Compute stats client-side for demo; assumes shape { id, amount, date, categoryName }
      const total = list.reduce((sum, e) => sum + Number(e.amount || 0), 0);
      const last30 = list.filter(
        (e) => Date.now() - new Date(e.date).getTime() <= 1000 * 60 * 60 * 24 * 30
      );
      const total30 = last30.reduce((sum, e) => sum + Number(e.amount || 0), 0);
      const byMonth = Array.from({ length: 6 }).map((_, idxFromEnd) => {
        const d = new Date();
        d.setMonth(d.getMonth() - (5 - idxFromEnd));
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        const sum = list
          .filter((x) => (x.date || "").slice(0, 7) === key)
          .reduce((s, x) => s + Number(x.amount || 0), 0);
        return { label: key, value: sum };
      });
      return { total, total30, byMonth, list };
    },
  });
}

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Dashboard overview with charts and stats */
  const { data, isLoading, isError, error } = useExpensesOverview();

  if (isLoading) return <div aria-busy="true">Loading dashboard...</div>;
  if (isError) return <div role="alert">Failed to load: {error?.message}</div>;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        }}
      >
        <StatCard title="Total Spend (All Time)" value={`$${data.total.toFixed(2)}`} />
        <StatCard
          title="Last 30 Days"
          value={`$${data.total30.toFixed(2)}`}
          hint="Recent trend"
          accent="var(--color-secondary)"
        />
        <StatCard title="Transactions" value={String(data.list.length)} />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 12,
        }}
      >
        <BarChart data={data.byMonth} />
        <DonutChart
          value={data.total30}
          total={data.total}
          label="30 Days vs All Time"
        />
      </div>
    </div>
  );
}
