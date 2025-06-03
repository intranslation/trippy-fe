import { afterEach, describe, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import App from "./app";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("renders the App", () => {
    render(<App />);
  });
});
