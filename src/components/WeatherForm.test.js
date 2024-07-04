import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherForm from "./WeatherForm";

test("renders WeatherForm and handles input and submission", () => {
  const mockOnCitySubmit = jest.fn();
  const mockOnLocationSubmit = jest.fn();

  render(
    <WeatherForm
      onCitySubmit={mockOnCitySubmit}
      onLocationSubmit={mockOnLocationSubmit}
    />
  );

  // Check if the input and buttons are rendered
  const inputElement = screen.getByPlaceholderText(/Enter city name/i);
  const buttons = screen.getAllByRole("button");
  const submitButton = buttons.find(
    (button) => button.textContent === "Get Weather"
  );
  const locationButton = buttons.find(
    (button) => button.textContent === "Get Weather by Location"
  );

  expect(inputElement).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(locationButton).toBeInTheDocument();

  // Simulate input change and form submission
  fireEvent.change(inputElement, { target: { value: "London" } });
  fireEvent.click(submitButton);

  expect(mockOnCitySubmit).toHaveBeenCalledWith("London");

  // Simulate location button click
  fireEvent.click(locationButton);

  expect(mockOnLocationSubmit).toHaveBeenCalled();
});
