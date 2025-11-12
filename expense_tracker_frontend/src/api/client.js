//
// API client with environment variable configuration and helpers
//

const BASE =
  process.env.REACT_APP_API_BASE ||
  process.env.REACT_APP_BACKEND_URL ||
  "";

function buildUrl(path) {
  // Avoid double slashes
  return `${BASE.replace(/\/+$/, "")}/${String(path).replace(/^\/+/, "")}`;
}

async function parseJSON(response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return { raw: text };
  }
}

async function request(path, options = {}) {
  const res = await fetch(buildUrl(path), {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  const body = await parseJSON(res);
  if (!res.ok) {
    const message = body?.error?.message || res.statusText || "Request failed";
    const err = new Error(message);
    err.status = res.status;
    err.data = body;
    throw err;
  }
  return body;
}

// PUBLIC_INTERFACE
export const api = {
  /** Get health info */
  health(path) {
    const healthPath =
      path || process.env.REACT_APP_HEALTHCHECK_PATH || "/health";
    return request(healthPath, { method: "GET" });
  },
  /** Expenses CRUD */
  expenses: {
    list(params) {
      const qs = params
        ? "?" +
          new URLSearchParams(
            Object.entries(params).reduce((acc, [k, v]) => {
              if (v !== undefined && v !== null && v !== "") acc[k] = v;
              return acc;
            }, {})
          ).toString()
        : "";
      return request(`/expenses${qs}`, { method: "GET" });
    },
    create(payload) {
      return request(`/expenses`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    update(id, payload) {
      return request(`/expenses/${encodeURIComponent(id)}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    },
    remove(id) {
      return request(`/expenses/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    },
  },
  /** Categories list */
  categories: {
    list() {
      return request(`/categories`, { method: "GET" });
    },
  },
};
