import React from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

// PUBLIC_INTERFACE
export default function HealthCheck() {
  /** HealthCheck page calls REACT_APP_HEALTHCHECK_PATH (or /health) */
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["health"],
    queryFn: () => api.health(process.env.REACT_APP_HEALTHCHECK_PATH),
  });

  if (isLoading) return <div aria-busy="true">Checking health...</div>;
  if (isError) return <div role="alert">Health failed: {error?.message}</div>;

  return (
    <div
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <h2 style={{ marginTop: 0 }}>Health</h2>
      <pre
        style={{
          background: "var(--color-surfaceAlt)",
          borderRadius: 12,
          padding: 12,
          overflowX: "auto",
        }}
        aria-label="Health response"
      >
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
