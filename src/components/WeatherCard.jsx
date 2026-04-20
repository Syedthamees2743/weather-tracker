import React from 'react';
import { Cloud, CloudRain, Sun, Snowflake, CloudLightning, Wind, Droplets, Gauge, Eye, ThermometerSun, Sunrise } from 'lucide-react';

const WeatherCard = ({ data, unit, onToggleUnit }) => {
  if (!data) return null;

  const getIcon = (condition) => {
    const main = condition.toLowerCase();
    if (main.includes("clear")) return <Sun size={90} className="weather-icon" />;
    if (main.includes("cloud")) return <Cloud size={90} className="weather-icon" />;
    if (main.includes("rain")) return <CloudRain size={90} className="weather-icon" />;
    if (main.includes("snow")) return <Snowflake size={90} className="weather-icon" />;
    if (main.includes("thunder")) return <CloudLightning size={90} className="weather-icon" />;
    return <Cloud size={90} className="weather-icon" />;
  };

  const displayTemp = unit === 'C' 
    ? Math.round(data.main.temp) 
    : Math.round((data.main.temp * 9/5) + 32);
    
  const feelsLike = unit === 'C'
    ? Math.round(data.main.feels_like)
    : Math.round((data.main.feels_like * 9/5) + 32);

  // Format time
  const formatTime = (timestamp) => new Date(timestamp * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div>
          <h2 className="city-name">{data.name}, {data.sys.country}</h2>
          <p className="weather-desc">{data.weather[0].description}</p>
        </div>
        <div className="date-badge">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>
      </div>

      <div className="weather-main">
        <div className="temp-container">
          <span className="temperature">{displayTemp}</span>
          <span className="unit-badge" onClick={onToggleUnit} title="Switch Unit">
            °{unit}
          </span>
        </div>
        <div className="icon-wrapper">
           {getIcon(data.weather[0].main)}
        </div>
      </div>

      {/* Expanded Details Grid */}
      <div className="details-grid">
        <div className="detail-item">
          <ThermometerSun size={20} className="detail-icon" />
          <div className="detail-text">
            <span>Feels Like</span> 
            <strong>{feelsLike}°</strong>
          </div>
        </div>
        <div className="detail-item">
          <Sunrise size={20} className="detail-icon" />
          <div className="detail-text">
            <span>Sunrise</span>
            <strong>{formatTime(data.sys.sunrise)}</strong>
          </div>
        </div>
        <div className="detail-item">
          <Droplets size={20} className="detail-icon" />
          <div className="detail-text">
            <span>Humidity</span>
            <strong>{data.main.humidity}%</strong>
          </div>
        </div>
        <div className="detail-item">
          <Wind size={20} className="detail-icon" />
          <div className="detail-text">
            <span>Wind</span>
            <strong>{Math.round (data.wind.speed)} <small>m/s</small></strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;