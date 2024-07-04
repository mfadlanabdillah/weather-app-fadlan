import React, { useState } from "react";
import axios from "axios";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherDataByCity = async (city) => {
    setLoading(true);
    try {
      const apiKey = "d850807fb9903e51261372b73ec1ec31";
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const { lat, lon } = weatherResponse.data.coord;
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data.list);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setForecastData(null);
      setError("Error fetching the weather data");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherDataByLocation = async (latitude, longitude) => {
    setLoading(true);
    try {
      const apiKey = "d850807fb9903e51261372b73ec1ec31";
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data.list);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setForecastData(null);
      setError("Error fetching the weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container mt-5">
          <h1 className="mb-4">Weather App</h1>
          <WeatherForm
            onCitySubmit={fetchWeatherDataByCity}
            onLocationSubmit={fetchWeatherDataByLocation}
          />
          <WeatherDisplay
            weatherData={weatherData}
            error={error}
            loading={loading}
          />
          <ForecastDisplay forecastData={forecastData} />
        </div>
      </header>
    </div>
  );
}

export default App;
