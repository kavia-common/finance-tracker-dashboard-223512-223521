import React from "react";
import "./App.css";
import AppRouter from "./AppRouter";

/**
 * PUBLIC_INTERFACE
 * App entry component that renders the application router and providers.
 * It uses AppRouter to set up routes, React Query, and the global theme.
 */
function App() {
  return <AppRouter />;
}

export default App;
