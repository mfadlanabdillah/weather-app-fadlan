import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherDisplay from "./WeatherDisplay";

test("renders WeatherDisplay with no data", () => {
  render(<WeatherDisplay weatherData={null} error={null} loading={false} />);
  expect(screen.getByText(/No data available/i)).toBeInTheDocument();
});

test("renders loading state", () => {
  render(<WeatherDisplay weatherData={null} error={null} loading={true} />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test("renders error message", () => {
  render(
    <WeatherDisplay
      weatherData={null}
      error="Error fetching data"
      loading={false}
    />
  );
  expect(screen.getByText(/Error fetching data/i)).toBeInTheDocument();
});

test("renders weather data", () => {
  const mockWeatherData = {
    name: "London",
    main: { temp: 20 },
    weather: [{ description: "clear sky" }],
  };

  render(
    <WeatherDisplay
      weatherData={mockWeatherData}
      error={null}
      loading={false}
    />
  );
  expect(screen.getByText(/Weather in London/i)).toBeInTheDocument();
  expect(screen.getByText(/Temperature: 20 °C/i)).toBeInTheDocument();
  expect(screen.getByText(/Condition: clear sky/i)).toBeInTheDocument();
});
