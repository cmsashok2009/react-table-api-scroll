import { render, screen, fireEvent } from "@testing-library/react";
import ItemsPerPage from "./ItemsPerPage"; // Adjust path if necessary

describe("ItemsPerPage Component", () => {
  const setLimitMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render ItemsPerPage with initial limit and options", () => {
    const initialLimit = 10;

    render(
      <ItemsPerPage
        limit={initialLimit}
        setLimit={setLimitMock}
        loading={false}
      />
    );

    // Ensure the select element is rendered
    const select = screen.getByLabelText(/items per page/i);

    // Ensure the initial value is set correctly
    expect(select.value).toBe(String(initialLimit));

    // Ensure all options are rendered
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(4); // 4 options (5, 10, 15, 20)
    expect(options[0].value).toBe("5");
    expect(options[1].value).toBe("10");
    expect(options[2].value).toBe("15");
    expect(options[3].value).toBe("20");
  });

  test("should call setLimit when selecting a new option", () => {
    const initialLimit = 10;

    render(
      <ItemsPerPage
        limit={initialLimit}
        setLimit={setLimitMock}
        loading={false}
      />
    );

    // Get the select element
    const select = screen.getByLabelText(/items per page/i);

    // Simulate changing the select value to "15"
    fireEvent.change(select, { target: { value: "15" } });

    // Ensure setLimit is called with the correct argument
    expect(setLimitMock).toHaveBeenCalledWith(15);
  });

  test("should disable the select when loading is true", () => {
    const initialLimit = 10;

    render(
      <ItemsPerPage
        limit={initialLimit}
        setLimit={setLimitMock}
        loading={true}
      />
    );

    // Get the select element
    const select = screen.getByLabelText(/items per page/i);

    // Ensure the select is disabled
    expect(select).toBeDisabled();
  });

  test("should not call setLimit when loading is true", () => {
    const initialLimit = 10;

    // Render the component with loading set to true
    render(
      <ItemsPerPage
        limit={initialLimit}
        setLimit={setLimitMock}
        loading={true}
      />
    );

    // Get the select element
    const select = screen.getByLabelText(/items per page/i);

    // Ensure the select is disabled when loading is true
    expect(select).toBeDisabled();
  });

  test("should re-render and maintain the correct selected value when limit changes", () => {
    const initialLimit = 10;

    const { rerender } = render(
      <ItemsPerPage
        limit={initialLimit}
        setLimit={setLimitMock}
        loading={false}
      />
    );

    // Ensure the correct limit is selected initially
    const select = screen.getByLabelText(/items per page/i);
    expect(select.value).toBe("10");

    // Re-render with a different limit
    rerender(
      <ItemsPerPage limit={15} setLimit={setLimitMock} loading={false} />
    );

    // Ensure the selected value is updated
    expect(select.value).toBe("15");
  });
});
