import React, { useState } from 'react';
import { getWeather } from './services/weatherApi';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import WeatherEffects from './components/WeatherEffects'; 
import WeatherTips from './components/WeatherTips';
import AirQuality from './components/AirQuality';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C');

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

  const toggleUnit = () => setUnit((prev) => (prev === 'C' ? 'F' : 'C'));

  // --- THEME & EARTH LIGHTING ---
  const getThemeClass = () => {
    if (!weatherData) return 'theme-neutral';
    const temp = unit === 'C' ? weatherData.current.main.temp : (weatherData.current.main.temp * 9/5) + 32;
    const condition = weatherData.current.weather[0].main.toLowerCase();

    if (temp > 25) return 'theme-hot';
    if (temp < 10) return 'theme-cold';
    if (condition.includes('rain')) return 'theme-rain';
    return 'theme-neutral';
  };

   return (
    <div className={`app-wrapper ${getThemeClass()}`}>
      {/* Noise Texture Overlay for Premium Feel */}
      <div className="noise-overlay"></div>
      
      {/* Background Effects */}
      {weatherData && <WeatherEffects condition={weatherData.current.weather[0].main} />}

      {/* --- LANDING PAGE --- */}
      {!weatherData && !loading && (
        <div className="landing-container">
          <div className="landing-content">
            <h1 className="brand-logo">SkyCast</h1>
            <p className="brand-tagline">Global Climate Intelligence</p>
            
            <div className="search-giant">
               <SearchBar onSearch={handleSearch} isLoading={loading} isHero={true} />
            </div>
            
            {error && <ErrorMessage message={error} />}
          </div>
        </div>
      )}

      {/* --- LOADING --- */}
      {loading && <div className="loading-fullscreen"><Loader /></div>}

      {/* --- PROFESSIONAL DASHBOARD --- */}
      {weatherData && !loading && (
        <div className="dashboard-container">
           {/* Top Bar */}
           <header className="dash-header">
              <div className="header-title">
                <h2>SkyCast</h2>
                <span>Live Data</span>
              </div>
              <div className="header-search">
                 <SearchBar onSearch={handleSearch} isLoading={loading} />
              </div>
           </header>
           
           {error && <ErrorMessage message={error} />}

           {/* Bento Grid Layout */}
           <div className="bento-grid">
              {/* Left Column */}
              <div className="bento-column-left">
                <WeatherCard 
                  data={weatherData.current} 
                  unit={unit} 
                  onToggleUnit={toggleUnit} 
                />
                <ForecastList forecast={weatherData.forecast} unit={unit} />
              </div>

              {/* Right Column */}
              <div className="bento-column-right">
                 <WeatherTips 
                   temp={weatherData.current.main.temp} 
                   condition={weatherData.current.weather[0].main}
                   humidity={weatherData.current.main.humidity}
                 />
                 <AirQuality />
                 <div className="quote-card">
                   <p>"Atmospheric conditions are currently optimal."</p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default App;