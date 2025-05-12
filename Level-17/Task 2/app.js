import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  app.post('/users', async (req, res) => {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
app.get('/users', (req, res) => {
  res.json({
    fields: Object.keys(User.schema.paths),
    schema: User.schema.obj
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
