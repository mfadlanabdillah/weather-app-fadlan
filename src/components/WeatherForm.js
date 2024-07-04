import React, { useState } from "react";

function WeatherForm({ onCitySubmit, onLocationSubmit }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCitySubmit(city);
    setCity("");
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationSubmit(latitude, longitude);
        },
        (error) => {
          console.error("Error getting the location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="weather-form mb-4">
      <form
        onSubmit={handleSubmit}
        className="form-inline justify-content-center"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="form-control mr-2 mb-2"
        />
        <button type="submit" className="btn btn-primary mr-2 mb-2">
          Get Weather
        </button>
      </form>
      <button onClick={handleLocationClick} className="btn btn-secondary mt-2">
        Get Weather by Location
      </button>
    </div>
  );
}

export default WeatherForm;
