const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const favoriteSchema = new mongoose.Schema({
  city: String,
});
const Favorite = mongoose.model('Favorite', favoriteSchema);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cache = {};
const CACHE_TTL = 10 * 60 * 1000;

function isCached(city) {
  const data = cache[city];
  return data && (Date.now() - data.timestamp < CACHE_TTL);
}

app.get('/api/weather/:city', async (req, res) => {
  const city = req.params.city;

  if (isCached(city)) {
    return res.json(cache[city].data);
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );
    cache[city] = { data: response.data, timestamp: Date.now() };
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.get('/api/forecast/:city', async (req, res) => {
  const city = req.params.city;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch forecast' });
  }
});

app.post('/api/favorites', async (req, res) => {
  const { city } = req.body;
  try {
    const newFav = new Favorite({ city });
    await newFav.save();
    res.json(newFav);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save favorite' });
  }
});

app.get('/api/favorites', async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));