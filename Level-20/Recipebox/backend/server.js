const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const recipeSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  ingredients: [{ name: String, quantity: Number, unit: String }],
  instructions: String,
  cuisine: String,
  mealType: String,
  servings: Number,
});

const User = mongoose.model('User', userSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

app.post('/api/register', async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ email: req.body.email, password: hashed });
  res.json(user);
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

app.post('/api/recipes', auth, async (req, res) => {
  const recipe = await Recipe.create({ ...req.body, userId: req.userId });
  res.json(recipe);
});

app.get('/api/recipes', auth, async (req, res) => {
  const q = req.query.q;
  let filter = { userId: req.userId };
  if (q) {
    filter = {
      ...filter,
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { 'ingredients.name': { $regex: q, $options: 'i' } },
      ],
    };
  }
  const recipes = await Recipe.find(filter);
  res.json(recipes);
});

app.get('/api/all-recipes', auth, async (req, res) => {
  const recipes = await Recipe.find({ userId: req.userId });
  res.json(recipes);
});

app.post('/api/recipes/:id/scale', auth, async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  const factor = req.body.newServings / recipe.servings;
  const scaledIngredients = recipe.ingredients.map(i => ({
    ...i,
    quantity: i.quantity * factor,
  }));
  res.json({ ...recipe.toObject(), ingredients: scaledIngredients, servings: req.body.newServings });
});

app.post('/api/shopping-list', auth, async (req, res) => {
  const { recipeIds } = req.body;
  const recipes = await Recipe.find({ _id: { $in: recipeIds } });

  const ingredientMap = {};

  recipes.forEach(recipe => {
    recipe.ingredients.forEach(i => {
      const key = `${i.name}-${i.unit}`;
      if (!ingredientMap[key]) {
        ingredientMap[key] = { name: i.name, unit: i.unit, total: 0 };
      }
      ingredientMap[key].total += i.quantity;
    });
  });

  res.json(Object.values(ingredientMap));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
