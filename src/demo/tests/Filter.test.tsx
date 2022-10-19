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

  fireEvent.click(screen.getByTestId("Software_Development"));
  expect(screen.getByTestId("Software_Development")).toHaveAttribute("checked");
});
