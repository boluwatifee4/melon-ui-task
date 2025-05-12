/*
Directory: src/components/ProductForm.test.tsx
*/
import { render, screen, fireEvent } from "@testing-library/react";
import { ProductForm } from "./ProductForm";
import { vi } from "vitest";

describe("ProductForm", () => {
  it("renders input and submit button", () => {
    render(<ProductForm onSubmit={vi.fn()} />);
    expect(screen.getByPlaceholderText(/product name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add product/i })
    ).toBeInTheDocument();
  });
  it("shows validation error for empty input", async () => {
    render(<ProductForm onSubmit={vi.fn()} />);
    fireEvent.click(screen.getByRole("button", { name: /add product/i }));
    expect(
      await screen.findByText(/product name is required/i)
    ).toBeInTheDocument();
  });
});
