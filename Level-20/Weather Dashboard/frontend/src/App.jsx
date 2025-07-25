import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState('C');

  const fetchWeather = async () => {
    const res = await axios.get(`http://localhost:5000/api/weather/${city}`);
    setWeather(res.data);
  };

  const fetchForecast = async () => {
    const res = await axios.get(`http://localhost:5000/api/forecast/${city}`);
    const daily = res.data.list.filter((item, idx) => idx % 8 === 0);
    setForecast(daily);
  };

  const fetchFavorites = async () => {
    const res = await axios.get('http://localhost:5000/api/favorites');
    setFavorites(res.data);
  };

  const saveFavorite = async () => {
    await axios.post('http://localhost:5000/api/favorites', { city });
    fetchFavorites();
  };

  const handleSearch = () => {
    fetchWeather();
    fetchForecast();
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const convertTemp = (tempC) => (unit === 'C' ? tempC : (tempC * 9) / 5 + 32);

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="container">
      <h1>WeatherDash 🌦️</h1>
      <div className="search-bar">
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
        <button onClick={handleSearch}>Search</button>
        <button onClick={saveFavorite}>Save ⭐</button>
        <button onClick={toggleUnit}>Toggle °{unit}</button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <h3>{convertTemp(weather.main.temp).toFixed(1)}°{unit}</h3>
        </div>
      )}

      <h3>5-Day Forecast</h3>
      <div className="forecast">
        {forecast.map((f, i) => (
          <div key={i} className="forecast-card">
            <p>{new Date(f.dt * 1000).toDateString()}</p>
            <p>{convertTemp(f.main.temp).toFixed(1)}°{unit}</p>
            <p>{f.weather[0].main}</p>
          </div>
        ))}
      </div>

      <h3>Temperature Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={forecast.map((f) => ({
          name: new Date(f.dt * 1000).toLocaleDateString(),
          temp: convertTemp(f.main.temp),
        }))}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>

      <h3>Favorites</h3>
      <ul>
        {favorites.map((f, i) => (
          <li key={i}>{f.city}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;