import axios from "axios";
import { fetchData } from "./fetchDataHelper"; // adjust path as necessary

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })), // Mocked axios.get
}));

describe("fetchData", () => {
  // Test for successful data fetch
  test("should fetch data successfully", async () => {
    // Arrange: Mock the axios.get response
    const mockData = [
      { id: 1, name: "Test Comment 1" },
      { id: 2, name: "Test Comment 2" },
    ];
    axios.get.mockResolvedValue({ data: mockData });

    // Act: Call the fetchData function
    const data = await fetchData(1, 10);

    // Assert: Check if axios.get was called with the correct parameters
    expect(axios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/comments",
      {
        params: {
          _page: 1,
          _limit: 10,
        },
      }
    );

    // Assert: Check if the returned data matches the mock data
    expect(data).toEqual(mockData);
  });

  // Test for failed API call
  test("should throw an error when the API call fails", async () => {
    // Arrange: Mock axios.get to throw an error
    const errorMessage = "Something went wrong";
    axios.get.mockRejectedValue(new Error(errorMessage));

    // Act & Assert: Ensure that the fetchData function throws the correct error
    await expect(fetchData(1, 10)).rejects.toThrowError(errorMessage);
  });

  // Test for network error handling (e.g., no response from the server)
  test("should throw an error when there is no response", async () => {
    // Arrange: Mock axios.get to throw an error without a response object
    const errorMessage = "Network error";
    axios.get.mockRejectedValue(new Error(errorMessage));

    // Act & Assert: Ensure that the fetchData function throws the correct error
    await expect(fetchData(1, 10)).rejects.toThrowError(errorMessage);
  });
});

describe("fetchData 1", () => {
  test("should throw an error when the request fails", async () => {
    // Simulate an error from axios
    axios.get.mockRejectedValue({
      response: {
        data: "Network Error",
      },
    });

    // Test the error handling
    await expect(fetchData(1, 10)).rejects.toThrow("Network Error");
  });

  test("should throw an error when there is no response", async () => {
    // Simulate an error with no response (e.g., network issues)
    axios.get.mockRejectedValue(new Error("Something went wrong"));

    // Test the error handling
    await expect(fetchData(1, 10)).rejects.toThrow("Something went wrong");
  });
});
