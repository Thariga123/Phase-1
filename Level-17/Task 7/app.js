const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('Connection error:', err);
    process.exit(1);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    try {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

userSchema.post('save', function(doc, next) {
  console.log(`New user created: ${doc.name} (${doc.email})`);
  next();
});

userSchema.pre('find', function(next) {
  this.where({ isActive: true });
  next();
});

userSchema.methods.generateProfile = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email
  };
};

userSchema.statics.findByEmailDomain = async function(domain) {
  return this.find({ email: { $regex: `@${domain}$`, $options: 'i' } });
};

const User = mongoose.model('User', userSchema);

app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already exists' });
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user.generateProfile());
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/users/domain/:domain', async (req, res) => {
  const { domain } = req.params;
  try {
    const users = await User.findByEmailDomain(domain);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
