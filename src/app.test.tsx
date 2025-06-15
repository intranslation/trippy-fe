import { afterEach, describe, it, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import App from "./app";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("renders the App", () => {
    render(<App />);
  });
});
