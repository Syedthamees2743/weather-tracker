import React from 'react';
import { Wind } from 'lucide-react';

const AirQuality = () => {
  // In a real app, you would fetch this from an API
  const aqi = 35; // Mock value (Good)
  
  const getStatus = (val) => {
    if (val < 50) return { text: "Good", color: "text-green-400" };
    if (val < 100) return { text: "Moderate", color: "text-yellow-400" };
    return { text: "Unhealthy", color: "text-red-400" };
  };

  const status = getStatus(aqi);

  return (
    <div className="aqi-container">
      <div className="aqi-header">
        <Wind size={20} className="text-gray-400" />
        <h3 className="section-title">Air Quality</h3>
      </div>
      <div className="aqi-content">
        <div className="aqi-value">
          <span>{aqi}</span>
          <span className="aqi-unit">US AQI</span>
        </div>
        <div className={`aqi-status ${status.color}`}>
          {status.text}
        </div>
        <p className="aqi-desc">
          Air quality is satisfactory, and air pollution poses little or no risk.
        </p>
      </div>
    </div>
  );
};

export default AirQuality;