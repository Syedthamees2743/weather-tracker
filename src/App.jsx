import React, { useState } from "react";
import { getWeather } from "./services/weatherApi";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import WeatherEffects from "./components/WeatherEffects";
import WeatherTips from "./components/WeatherTips";
import AirQuality from "./components/AirQuality";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import { Moon, Sun } from "lucide-react";
import "./App.css";

function App() {
  // 1. LOAD THEME FROM LOCAL STORAGE (Default to True if not found)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("skycast_theme");
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  // 2. LOAD UNIT FROM LOCAL STORAGE (Default to 'C' if not found)
  const [unit, setUnit] = useState(() => {
    const savedUnit = localStorage.getItem("skycast_unit");
    return savedUnit || "C";
  });

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modeAnimating, setModeAnimating] = useState(false);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. TOGGLE THEME: Update State AND Save to LocalStorage
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("skycast_theme", JSON.stringify(newMode)); // <--- SAVES HERE

    setModeAnimating(true);
    setTimeout(() => setModeAnimating(false), 1000);
  };

  // 4. TOGGLE UNIT: Update State AND Save to LocalStorage
  const toggleUnit = () => {
    const newUnit = unit === "C" ? "F" : "C";
    setUnit(newUnit);
    localStorage.setItem("skycast_unit", newUnit); // <--- SAVES HERE
  };

  const getThemeClass = () => {
    let classes = "";

    // Unit Colors
    classes += unit === "C" ? "unit-celsius " : "unit-fahrenheit ";

    // Mode
    if (!darkMode) classes += "light-mode ";

    // Animation Trigger
    if (modeAnimating) classes += "bg-animating ";

    return classes;
  };

  return (
    <div className={`app-wrapper ${getThemeClass()}`}>
      {/* Animated Background Blob */}
      <div className="bg-blob"></div>

      {/* Background Effects */}
      {weatherData && (
        <WeatherEffects condition={weatherData.current.weather[0].main} />
      )}

      {/* --- LANDING PAGE --- */}
      {!weatherData && !loading && (
        <div className="landing-container">
          <div className="landing-content">
            <div className="landing-controls">
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                title="Toggle Theme"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            <h1 className="brand-logo">SkyCast</h1>
            <p className="brand-tagline">Global Climate Intelligence</p>

            <div className="search-giant">
              <SearchBar
                onSearch={handleSearch}
                isLoading={loading}
                isHero={true}
              />
            </div>
            {error && <ErrorMessage message={error} />}
          </div>
        </div>
      )}

      {loading && (
        <div className="loading-fullscreen">
          <Loader />
        </div>
      )}

      {/* --- DASHBOARD --- */}
      {weatherData && !loading && (
        <div className="dashboard-container">
          <header className="dash-header">
            <div className="header-title">
              <h2>SkyCast</h2>
              <span>{unit === "C" ? "Metric (C)" : "Imperial (F)"}</span>
            </div>

            <div className="header-actions">
              <div className="header-search">
                <SearchBar onSearch={handleSearch} isLoading={loading} />
              </div>
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                title="Toggle Theme"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </header>

          {error && <ErrorMessage message={error} />}

          <div className="bento-grid">
            <div className="bento-column-left">
              <WeatherCard
                data={weatherData.current}
                unit={unit}
                onToggleUnit={toggleUnit}
              />
              <ForecastList forecast={weatherData.forecast} unit={unit} />
            </div>

            <div className="bento-column-right">
              <WeatherTips
                temp={weatherData.current.main.temp}
                condition={weatherData.current.weather[0].main}
                humidity={weatherData.current.main.humidity}
              />
              <AirQuality />
              <div className="quote-card">
                <p>"Visual clarity meets data precision."</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
