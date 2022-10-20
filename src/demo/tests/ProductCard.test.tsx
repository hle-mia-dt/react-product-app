import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from "../ProductCard";

test("product card should display summary information", async () => {
  const product = {
    productId: 10,
    productName: "Zoom Meetingroom",
    tags: ["Zoom", "Meetingrooms", "Zoomrooms", "Sharing content"],
    category: "Daily Business",
    manufacturerUrl: "https://zoom.us/zoomrooms",
    description: [
      "Zoom Rooms tackles the three biggest pain points of the conference room: Starting a meeting, booking a meeting, and sharing content.",
    ],
    option1: null,
    option2: null,
  };
  render(<ProductCard product={product} />);
  expect(screen.getByText(product.productName)).toHaveTextContent(
    product.productName
  );
  expect(screen.getByText(product.category)).toHaveTextContent(
    product.category
  );
  product.tags.forEach((tag) => {
    expect(screen.getByText(tag)).toHaveTextContent(tag);
  });
});
