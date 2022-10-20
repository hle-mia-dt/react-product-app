import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchTextField from "../SearchTextField";

test("search keyword should be blank", async () => {
  render(<SearchTextField />);
  const textInput = screen.getByRole("textbox", { name: "search product" });
  expect(textInput).toBeVisible();
  expect(textInput).toHaveValue("");
});

test("search keyword should have value", async () => {
  render(<SearchTextField />);
  const textInput: HTMLInputElement = screen.getByRole("textbox", {
    name: "search product",
  });
  fireEvent.change(textInput, {
    target: { value: "Foxit software PhantomPDF Standard" },
  });
  expect(textInput.value).toBe("Foxit software PhantomPDF Standard");
});
