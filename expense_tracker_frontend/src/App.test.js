import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders top navigation and routes", () => {
  render(<App />);
  const nav = screen.getByLabelText(/Top navigation bar/i);
  expect(nav).toBeInTheDocument();

  // Sidebar entries
  const dashboardLink = screen.getAllByText(/Dashboard/i)[0];
  expect(dashboardLink).toBeInTheDocument();
});
