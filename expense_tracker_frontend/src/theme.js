//
// Ocean Professional theme tokens and helpers
//

export const theme = {
  colors: {
    primary: "#2563EB",
    secondary: "#F59E0B",
    success: "#10B981",
    error: "#EF4444",
    background: "#f9fafb",
    surface: "#ffffff",
    text: "#111827",
    mutedText: "#6B7280",
    border: "#E5E7EB",
    surfaceAlt: "#F3F4F6",
  },
  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
    xl: "20px",
  },
  shadow: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
  },
  gradient: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(249,250,251,0.8))",
};

// PUBLIC_INTERFACE
export function applyThemeToDocument() {
  /** Apply CSS variables to document root for theming. */
  const root = document.documentElement;
  root.style.setProperty("--color-primary", theme.colors.primary);
  root.style.setProperty("--color-secondary", theme.colors.secondary);
  root.style.setProperty("--color-success", theme.colors.success);
  root.style.setProperty("--color-error", theme.colors.error);
  root.style.setProperty("--color-bg", theme.colors.background);
  root.style.setProperty("--color-surface", theme.colors.surface);
  root.style.setProperty("--color-text", theme.colors.text);
  root.style.setProperty("--color-muted", theme.colors.mutedText);
  root.style.setProperty("--color-border", theme.colors.border);
  root.style.setProperty("--radius-md", theme.radius.md);
  root.style.setProperty("--shadow-md", theme.shadow.md);
  root.style.setProperty("--shadow-sm", theme.shadow.sm);
  root.style.setProperty("--gradient", theme.gradient);
}
