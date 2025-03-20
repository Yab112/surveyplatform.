import React from "react"; // Added React import
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom for custom matchers
// import Callout from '@/components/callout/callout'
import Home from "../page"; // Corrected import path

// `describe` is not required, but it helps the tests read nicely
describe("The Home Page Component", () => {
  // Each test for the component will get an `it` block
  it("should have exactly 1 `main` section", () => {
    // The getByRole will error if there are less or more than 1 element found
    render(<Home />);
    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();
  });
});
