import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders main content with title", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Møtebingo/i);
  expect(linkElement).toBeInTheDocument();
});
