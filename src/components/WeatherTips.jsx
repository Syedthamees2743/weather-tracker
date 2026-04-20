import React from 'react';
import { AlertTriangle, Umbrella, Droplets, Thermometer, Smile } from 'lucide-react';

const WeatherTips = ({ temp, condition, humidity }) => {
  const getTips = () => {
    const tips = [];
    
    // Heat Tips
    if (temp > 28) {
      tips.push({ icon: <Thermometer className="text-red-500" />, text: "It's very hot! Stay hydrated and avoid midday sun." });
      tips.push({ icon: <AlertTriangle className="text-orange-500" />, text: "High UV Index expected. Apply sunscreen." });
    }
    
    // Cold Tips
    if (temp < 5) {
      tips.push({ icon: <Smile className="text-blue-300" />, text: "Bundle up! It's freezing outside." });
      tips.push({ icon: <AlertTriangle className="text-blue-500" />, text: "Icy roads possible. Drive carefully." });
    }

    // Condition Tips
    if (condition.includes("rain") || condition.includes("drizzle")) {
      tips.push({ icon: <Umbrella className="text-blue-400" />, text: "Don't forget your umbrella!" });
    }
    
    // Humidity Tips
    if (humidity > 80) {
      tips.push({ icon: <Droplets className="text-teal-400" />, text: "High humidity. It might feel warmer than it is." });
    }

    // Default Tip
    if (tips.length === 0) {
      tips.push({ icon: <Smile className="text-green-400" />, text: "Weather looks pleasant. Have a great day!" });
    }

    return tips;
  };

  const tipsList = getTips();

  return (
    <div className="tips-container">
      <h3 className="section-title">Daily Tips</h3>
      <div className="tips-list">
        {tipsList.map((tip, index) => (
          <div key={index} className="tip-item">
            <div className="tip-icon">{tip.icon}</div>
            <p className="tip-text">{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherTips;