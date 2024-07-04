import React from "react";

function WeatherDisplay({ weatherData, error, loading }) {
  if (loading) {
    return <div className="mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  if (!weatherData) {
    return <div className="mt-4">No data available</div>;
  }

  const { name, main, weather } = weatherData;
  return (
    <div className="mt-4">
      <h2 className="mb-4">Weather in {name}</h2>
      <p className="mb-2">Temperature: {main.temp} °C</p>
      <p className="mb-2">Condition: {weather[0].description}</p>
    </div>
  );
}

export default WeatherDisplay;
