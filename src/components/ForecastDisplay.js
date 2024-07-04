import React from "react";

function ForecastDisplay({ forecastData, unit }) {
  if (!forecastData) {
    return null;
  }

  const groupedData = forecastData.reduce((acc, curr) => {
    const date = new Date(curr.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  const temperatureUnit = unit === "metric" ? "°C" : "°F";

  return (
    <div className="forecast-display mt-4">
      <h2>5-Day Forecast</h2>
      <div className="row">
        {Object.keys(groupedData).map((date, index) => (
          <div key={index} className="col-md-2 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{date}</h5>
                {groupedData[date].map((data, idx) => (
                  <p key={idx} className="card-text">
                    {new Date(data.dt * 1000).toLocaleTimeString()}:{" "}
                    {data.main.temp} {temperatureUnit},{" "}
                    {data.weather[0].description}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastDisplay;
