import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseForm from "./ExpenseForm";

test("ExpenseForm shows validation errors", async () => {
  const onSubmit = jest.fn();
  render(<ExpenseForm categories={[{ id: "1", name: "General" }]} onSubmit={onSubmit} />);
  fireEvent.click(screen.getByText(/Save/i));
  expect(await screen.findByText(/Title is required/i)).toBeInTheDocument();
  expect(onSubmit).not.toHaveBeenCalled();
});
