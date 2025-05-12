import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Journal from './models/Journal.js';

dotenv.config();
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.post('/entries', async (req, res) => {
  try {
    const { title, content, date, tags } = req.body;
    const newEntry = new Journal({ title, content, date, tags });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: 'Error creating journal entry', details: err });
  }
});
app.get('/entries', async (req, res) => {
  try {
    const entries = await Journal.find();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching entries', details: err });
  }
});

app.get('/entries/search', async (req, res) => {
  try {
    const { title, date } = req.query;
    const query = {};
    if (title) query.title = new RegExp(title, 'i'); 
    if (date) query.date = date;
    const entries = await Journal.find(query);
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Error searching entries', details: err });
  }
});

app.put('/entries/:id', async (req, res) => {
  try {
    const { title, content, date, tags } = req.body;
    const updatedEntry = await Journal.findByIdAndUpdate(req.params.id, { title, content, date, tags }, { new: true });
    if (!updatedEntry) return res.status(404).json({ error: 'Entry not found' });
    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(400).json({ error: 'Error updating journal entry', details: err });
  }
});

app.delete('/entries/:id', async (req, res) => {
  try {
    const deletedEntry = await Journal.findByIdAndDelete(req.params.id);
    if (!deletedEntry) return res.status(404).json({ error: 'Entry not found' });
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting entry', details: err });
  }
});

app.get('/entries/tags', async (req, res) => {
  try {
    const { tag } = req.query;
    if (!tag) return res.status(400).json({ error: 'Tag query parameter is required' });
    const entries = await Journal.find({ tags: tag });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: 'Error filtering entries by tag', details: err });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
