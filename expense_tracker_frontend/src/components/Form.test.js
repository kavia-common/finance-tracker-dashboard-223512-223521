import { validateExpense } from "./Form";

describe("validateExpense", () => {
  it("returns errors for missing fields", () => {
    const errors = validateExpense({});
    expect(errors.title).toBeTruthy();
    expect(errors.amount).toBeTruthy();
    expect(errors.date).toBeTruthy();
    expect(errors.categoryId).toBeTruthy();
  });

  it("validates positive amount", () => {
    const errors = validateExpense({
      title: "Test",
      amount: "-1",
      date: "2024-01-01",
      categoryId: "1",
    });
    expect(errors.amount).toBeTruthy();
  });

  it("passes for valid payload", () => {
    const errors = validateExpense({
      title: "Coffee",
      amount: "3.5",
      date: "2024-01-01",
      categoryId: "1",
    });
    expect(Object.keys(errors).length).toBe(0);
  });
});
