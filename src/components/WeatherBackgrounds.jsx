import React from "react";
import "./WeatherBackgrounds.css";

const WeatherBackgrounds = ({ condition, theme }) => {
  // Helper to normalize conditions
  const getWeatherType = () => {
    const c = condition?.toLowerCase() || "";
    if (c.includes("clear")) return "clear";
    if (c.includes("rain") || c.includes("drizzle")) return "rain";
    if (c.includes("cloud")) return "clouds";
    if (c.includes("snow")) return "snow";
    if (c.includes("thunder")) return "thunder";
    if (c.includes("mist") || c.includes("fog") || c.includes("haze")) return "mist";
    return "default";
  };

  const weatherType = getWeatherType();

  // Generate cloud elements for CSS-based clouds
  const generateClouds = (count) =>
    Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="cloud-layer"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 40}%`,
          animationDuration: `${25 + Math.random() * 15}s`,
          animationDelay: `${Math.random() * 10}s`,
          opacity: 0.2 + Math.random() * 0.3
        }}
      />
    ));

  return (
    <div className={`weather-bg-container ${weatherType} ${theme}`}>
      {/* CSS-based animations */}
      {weatherType === "clear" && (
        <div className="sun-glow">
          <div className="sun-core"></div>
          <div className="sun-rays"></div>
        </div>
      )}

      {weatherType === "clouds" && (
        <div className="cloud-container">
          {generateClouds(8)}
        </div>
      )}

      {weatherType === "thunder" && (
        <>
          <div className="cloud-container">
            {generateClouds(6)}
          </div>
          <div className="lightning-flash"></div>
        </>
      )}

      {weatherType === "mist" && (
        <>
          <div className="fog-layer fog-1"></div>
          <div className="fog-layer fog-2"></div>
          <div className="fog-layer fog-3"></div>
        </>
      )}
    </div>
  );
};

export default WeatherBackgrounds;
