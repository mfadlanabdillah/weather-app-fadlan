import React, { useState } from "react";
import axios from "axios";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherDataByCity = async (city) => {
    setLoading(true);
    try {
      const apiKey = "d850807fb9903e51261372b73ec1ec31";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError("Error fetching the weather data for the specified city");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherDataByLocation = async (latitude, longitude) => {
    setLoading(true);
    try {
      const apiKey = "d850807fb9903e51261372b73ec1ec31";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError("Error fetching the weather data for the current location");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container mt-5">
          <h1 className="mb-4">Fadlan's Weather App</h1>
          <WeatherForm
            onCitySubmit={fetchWeatherDataByCity}
            onLocationSubmit={fetchWeatherDataByLocation}
          />
          <WeatherDisplay
            weatherData={weatherData}
            error={error}
            loading={loading}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
