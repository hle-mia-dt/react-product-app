import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filter from "../Filter";

test("category checkboxes should be visible", async () => {
  render(<Filter />);
  [
    "Software Development",
    "Daily Business",
    "Text Editors",
    "Management Tools",
  ].forEach((categoryName) => {
    expect(screen.getByText(categoryName)).toBeVisible();
  });
});

test("category checkboxes could be checked", async () => {
  render(<Filter />);
  [
    "Software_Development",
    "Daily_Business",
    "Text_Editors",
    "Management_Tools",
  ].forEach((name) => {
    const input = screen.getByRole("checkbox", { name });
    expect(input).not.toBeChecked();
    fireEvent.click(input);
    expect(input).toBeChecked();
  });
});
