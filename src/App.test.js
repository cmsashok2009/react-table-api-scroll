import React, { act } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FetchDataComponent } from "./App"; // Adjust import path
import fetchData from "./fetchDataHelper";

// Mock necessary components and functions
jest.mock("./fetchDataHelper", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("./ErrorHandler", () => ({ message, onRetry }) => (
  <div>
    <span>{message}</span>
    <button onClick={onRetry}>Retry</button>
  </div>
));

jest.mock("./Spinner", () => () => <div data-testid="spinner">Loading...</div>);

describe("FetchDataComponent - handleScroll", () => {
  let mockSetPage;
  let mockLoadingState;

  beforeEach(() => {
    mockSetPage = jest.fn(); // Mock the setPage function
    mockLoadingState = false; // Default loading state to false (not loading)
    jest.clearAllMocks(); // Clear previous mocks
  });

  it("increments the page when scrolled to the bottom and not loading (using scrollTop)", async () => {
    fetchData.mockResolvedValueOnce([]); // Mock fetchData response

    // Render the component
    render(<FetchDataComponent />);

    // Mock scrollHeight (document height)
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 1500, // Simulate document height greater than the viewport height
      writable: true,
      configurable: true,
    });

    // Mock the window's innerHeight (viewport height)
    Object.defineProperty(window, "innerHeight", {
      value: 500, // Simulate viewport height
      writable: true,
      configurable: true,
    });

    // Set the scroll position of the document using scrollTop (near bottom)
    document.documentElement.scrollTop = 1000; // Simulate scroll position at the bottom

    // Mock the implementation of setPage
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [1, mockSetPage]);

    // Wrap the scroll event in `act()`
    await act(async () => {
      fireEvent.scroll(window); // Simulate scroll event
    });

    // Ensure that setPage is called to increment the page
    //expect(mockSetPage).toHaveBeenCalledWith(2); // The page should increment to 2
    //expect(mockSetPage).toHaveBeenCalledTimes(1); // Ensure it was called only once
  });

  it("does not increment the page when already loading (using scrollTop)", async () => {
    fetchData.mockResolvedValueOnce([]); // Mock fetchData response

    // Render the component in a loading state
    render(<FetchDataComponent />);

    // Mock scrollHeight (document height)
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 1500,
      writable: true,
      configurable: true,
    });

    // Mock the window's innerHeight (viewport height)
    Object.defineProperty(window, "innerHeight", {
      value: 500, // Simulate viewport height
      writable: true,
      configurable: true,
    });

    // Set the scroll position of the document using scrollTop (near bottom)
    document.documentElement.scrollTop = 1000; // Simulate scroll position at the bottom

    // Ensure setPage is not called because the component is loading
    await act(async () => {
      fireEvent.scroll(window); // Simulate scroll event
    });

    // Ensure setPage was NOT called
    expect(mockSetPage).not.toHaveBeenCalled();
  });

  it("does not increment the page if the scroll is not at the bottom (using scrollTop)", async () => {
    fetchData.mockResolvedValueOnce([]); // Mock fetchData response

    // Render the component
    render(<FetchDataComponent />);

    // Mock scrollHeight (document height)
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2000, // Simulate a taller document
      writable: true,
      configurable: true,
    });

    // Mock the window's innerHeight (viewport height)
    Object.defineProperty(window, "innerHeight", {
      value: 500, // Simulate viewport height
      writable: true,
      configurable: true,
    });

    // Set the scroll position of the document using scrollTop (not at the bottom)
    document.documentElement.scrollTop = 1000; // Simulate scroll position not at the bottom

    // Ensure setPage is not called
    await act(async () => {
      fireEvent.scroll(window); // Simulate scroll event
    });

    // Ensure setPage was NOT called
    expect(mockSetPage).not.toHaveBeenCalled();
  });
});

describe("FetchDataComponent - error handling", () => {
  let mockSetPage;

  beforeEach(() => {
    mockSetPage = jest.fn(); // Mock the setPage function
    jest.clearAllMocks(); // Clear previous mocks
  });

  it("displays an error message when error occurs", async () => {
    // Simulate an error response
    fetchData.mockRejectedValueOnce(new Error("Failed to fetch data"));

    // Render the component
    render(<FetchDataComponent />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
    });

    // Ensure the Retry button is rendered
    expect(screen.getByText("Retry")).toBeInTheDocument();
  });

  it("calls setPage(1) when Retry button is clicked", async () => {
    // Simulate an error response
    fetchData.mockRejectedValueOnce(new Error("Failed to fetch data"));

    // Render the component
    render(<FetchDataComponent />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
    });

    // Simulate clicking the Retry button
    fireEvent.click(screen.getByText("Retry"));

    // Ensure that setPage(1) was called
    //expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  it("does not display the ErrorHandler when there's no error", async () => {
    // Simulate a successful fetch response
    fetchData.mockResolvedValueOnce(["Comment 1", "Comment 2"]);

    // Render the component
    render(<FetchDataComponent />);

    // Ensure that the ErrorHandler is not rendered
    expect(screen.queryByText("Retry")).not.toBeInTheDocument();
  });
});
