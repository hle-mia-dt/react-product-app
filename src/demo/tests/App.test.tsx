import React from "react";
import { render, fireEvent, within, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";

test("product list should have 2 items", async () => {
  render(<App />);
  const textInput: HTMLInputElement = screen.getByRole("textbox", {
    name: "search product",
  });
  fireEvent.change(textInput, {
    target: { value: "Foxit" },
  });
  expect(await screen.findAllByText(/Foxit/)).toHaveLength(2);
});

test("product detail shoule be visible", async () => {
  render(<App />);
  const textInput: HTMLInputElement = screen.getByRole("textbox", {
    name: "search product",
  });
  fireEvent.change(textInput, {
    target: { value: "software" },
  });
  userEvent.click(await screen.findByText(/software/));
  expect(screen.getByText("Product Details")).toBeVisible();
  expect(
    screen.getAllByText(/Foxit software PhantomPDF Standard/)
  ).toHaveLength(2);
  expect(screen.getByRole("link")).toHaveAttribute(
    "href",
    "https://www.foxitsoftware.com/de/pdf-editor"
  );
  expect(
    screen.getByText(
      "PhantomPDF provides powerful PDF Editor capabilities to allow authors to update their documents themselves.Standard - Simple interface and limited functionality."
    )
  ).toBeInTheDocument();
});
