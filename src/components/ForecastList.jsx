import React from 'react';
import { Cloud, CloudRain, Sun, Snowflake } from 'lucide-react';

const ForecastList = ({ forecast, unit }) => {
  if (!forecast || forecast.length === 0) return null;

  const getIcon = (main) => {
    if (main.includes("clear")) return <Sun size={24} className="text-yellow-400" />;
    if (main.includes("rain")) return <CloudRain size={24} className="text-blue-400" />;
    if (main.includes("cloud")) return <Cloud size={24} className="text-gray-400" />;
    if (main.includes("snow")) return <Snowflake size={24} className="text-white" />;
    return <Sun size={24} />;
  };

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-list">
        {forecast.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const temp = unit === 'C' 
            ? Math.round(day.main.temp) 
            : Math.round((day.main.temp * 9/5) + 32);

          return (
            <div 
              key={day.dt} 
              className="forecast-item"
              style={{ animationDelay: `${index * 0.1}s` }} // Staggered animation
            >
              <span className="forecast-day">{dayName}</span>
              <div className="forecast-icon">
                {getIcon(day.weather[0].main)}
              </div>
              <span className="forecast-temp">{temp}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastList;