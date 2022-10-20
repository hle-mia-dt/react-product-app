import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  getByText,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductDetail from "../ProductDetail";

test("product detail shouldn't show any info at the beginning", async () => {
  render(<ProductDetail />);

  expect(screen.queryByText("Product Details")).toBeNull();
});
