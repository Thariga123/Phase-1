import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

const weatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  humidity: Number,
  condition: String,
  timestamp: { type: Date, default: Date.now }
});

const WeatherEntry = mongoose.model('WeatherEntry', weatherSchema);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/log-weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    const entry = new WeatherEntry({
      city,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      condition: data.weather[0].description,
    });

    await entry.save();

    console.log(`✅ Weather data saved for ${city}`);
    console.log(`🌡️ Temperature: ${data.main.temp}°C`);
    console.log(`💧 Humidity: ${data.main.humidity}%`);
    console.log(`🌥️ Condition: ${data.weather[0].description}`);

    res.send(`✅ Weather data logged for ${city}`);
  } catch (error) {
    console.error('❌ Error fetching/saving weather data:', error.message);
    res.status(500).send('❌ Failed to log weather data');
  }
});

app.get('/history/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const entries = await WeatherEntry.find({ city }).sort({ timestamp: -1 });

    if (entries.length === 0) {
      return res.status(404).send(`❌ No weather history found for ${city}`);
    }

    res.json(entries);
  } catch (error) {
    console.error('❌ Error fetching history:', error.message);
    res.status(500).send('❌ Failed to fetch history');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
