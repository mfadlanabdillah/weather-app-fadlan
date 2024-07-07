/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay";
import SearchHistory from "./components/SearchHistory";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [unit, setUnit] = useState("metric"); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [currentCity, setCurrentCity] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [theme, setTheme] = useState("light"); // 'light' for Light Mode, 'dark' for Dark Mode

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    if (currentCity) {
      fetchWeatherDataByCity(currentCity, unit);
    } else if (currentLocation) {
      fetchWeatherDataByLocation(
        currentLocation.latitude,
        currentLocation.longitude,
        unit
      );
    }
  }, [unit]);

  const saveHistory = (city) => {
    const newHistory = [city, ...history.filter((item) => item !== city)].slice(
      0,
      5
    );
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const fetchWeatherDataByCity = async (city, unit) => {
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
      );
      const { lat, lon } = weatherResponse.data.coord;
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`
      );
      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data.list);
      setError(null);
      saveHistory(city);
      setCurrentCity(city);
      setCurrentLocation(null);
    } catch (error) {
      setWeatherData(null);
      setForecastData(null);
      setError("Error fetching the weather data");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherDataByLocation = async (latitude, longitude, unit) => {
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`
      );
      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data.list);
      setError(null);
      setCurrentCity(null);
      setCurrentLocation({ latitude, longitude });
    } catch (error) {
      setWeatherData(null);
      setForecastData(null);
      setError("Error fetching the weather data");
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`App ${theme}`}>
      <header className="App-header">
        <div className="container mt-5">
          <h1 className="mb-4">Fadlan's Weather App</h1>
          <button onClick={toggleUnit} className="btn btn-secondary mb-4">
            Toggle to {unit === "metric" ? "Fahrenheit" : "Celsius"}
          </button>
          <button onClick={toggleTheme} className="btn btn-secondary mb-4">
            Toggle to {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
          <WeatherForm
            onCitySubmit={(city) => fetchWeatherDataByCity(city, unit)}
            onLocationSubmit={(lat, lon) =>
              fetchWeatherDataByLocation(lat, lon, unit)
            }
          />
          <WeatherDisplay
            weatherData={weatherData}
            error={error}
            loading={loading}
            unit={unit}
          />
          <ForecastDisplay forecastData={forecastData} unit={unit} />
          <SearchHistory
            history={history}
            onHistoryClick={(city) => fetchWeatherDataByCity(city, unit)}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
