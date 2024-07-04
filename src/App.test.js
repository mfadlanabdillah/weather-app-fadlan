import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import axios from "axios";

jest.mock("axios");

test("renders Weather App and handles input and loading state", async () => {
  const mockWeatherData = {
    data: {
      name: "London",
      main: { temp: 20 },
      weather: [{ description: "clear sky" }],
    },
  };

  axios.get.mockResolvedValue(mockWeatherData);

  render(<App />);

  // Check if the initial elements are rendered
  expect(screen.getByText(/Weather App/i)).toBeInTheDocument();
  const inputElement = screen.getByPlaceholderText(/Enter city name/i);
  const submitButton = screen.getByRole("button", { name: /Get Weather/i });

  // Simulate input change and form submission
  fireEvent.change(inputElement, { target: { value: "London" } });
  fireEvent.click(submitButton);

  // Check if the loading state is displayed
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  // Wait for the weather data to be displayed
  const weatherData = await screen.findByText(/Weather in London/i);
  expect(weatherData).toBeInTheDocument();
});
