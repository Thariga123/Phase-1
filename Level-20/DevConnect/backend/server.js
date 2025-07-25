const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  bio: String,
  skills: [String],
  profileImage: String,
});
const postSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  content: String,
  image: String,
  likes: [mongoose.Schema.Types.ObjectId],
  comments: [{
    userId: mongoose.Schema.Types.ObjectId,
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed });
  res.json(user);
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
});

app.post('/api/profile-image', auth, upload.single('image'), async (req, res) => {
  const imagePath = req.file.path;
  await User.findByIdAndUpdate(req.userId, { profileImage: imagePath });
  res.json({ message: 'Profile image uploaded' });
});

app.get('/api/profile', auth, async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
});

app.put('/api/profile', auth, async (req, res) => {
  const { bio, skills } = req.body;
  const user = await User.findByIdAndUpdate(req.userId, { bio, skills }, { new: true });
  res.json(user);
});

app.get('/api/users', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

app.post('/api/posts', auth, upload.single('image'), async (req, res) => {
  const post = await Post.create({
    userId: req.userId,
    content: req.body.content,
    image: req.file?.path,
  });
  res.json(post);
});

app.get('/api/posts', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

app.post('/api/posts/:id/like', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  const index = post.likes.indexOf(req.userId);
  if (index > -1) post.likes.splice(index, 1);
  else post.likes.push(req.userId);
  await post.save();
  res.json(post);
});

app.post('/api/posts/:id/comment', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({ userId: req.userId, text: req.body.text });
  await post.save();
  res.json(post);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
