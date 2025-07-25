const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bookshelf', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));