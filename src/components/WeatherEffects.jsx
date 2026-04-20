import React from 'react';

const WeatherEffects = ({ condition }) => {
  const main = condition?.toLowerCase() || "";
  
  // Generate drops/flakes
  const generateElements = (count, className) => {
    return Array.from({ length: count }).map((_, i) => (
      <div 
        key={i} 
        className={className} 
        style={{ 
          left: `${Math.random() * 100}%`, 
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${0.5 + Math.random() * 0.5}s`
        }} 
      />
    ));
  };

  if (main.includes("rain")) {
    return <div className="weather-overlay">{generateElements(50, "rain-drop")}</div>;
  }
  
  if (main.includes("snow")) {
    return <div className="weather-overlay">{generateElements(30, "snow-flake")}</div>;
  }
  
  if (main.includes("clear")) {
    return (
      <div className="weather-overlay">
        <div className="sun-rays"></div>
      </div>
    );
  }

  return null;
};

export default WeatherEffects;