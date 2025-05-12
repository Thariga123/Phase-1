import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/budgetTracker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

const goalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
});

const Goal = mongoose.model('Goal', goalSchema);

app.post('/transaction', async (req, res) => {
  const { amount, category, date, type } = req.body;

  if (!amount || !category || !date || !type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (type !== 'income' && type !== 'expense') {
    return res.status(400).json({ message: "Invalid type. Must be 'income' or 'expense'" });
  }

  try {
    const newTransaction = new Transaction({ amount, category, date, type });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({ message: "Error saving transaction", error: err.message });
  }
});

app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching transactions", error: err.message });
  }
});
app.get('/transactions/filter', async (req, res) => {
  const { startDate, endDate, category } = req.query;

  let query = {};

  if (startDate) query.date = { $gte: new Date(startDate) };
  if (endDate) query.date = { ...query.date, $lte: new Date(endDate) };
  if (category) query.category = category;

  try {
    const filteredTransactions = await Transaction.find(query);
    res.json(filteredTransactions);
  } catch (err) {
    res.status(500).json({ message: "Error filtering transactions", error: err.message });
  }
});

app.get('/summary', async (req, res) => {
  try {
    const income = await Transaction.aggregate([
      { $match: { type: 'income' } },
      { $group: { _id: null, totalIncome: { $sum: '$amount' } } }
    ]);
    
    const expenses = await Transaction.aggregate([
      { $match: { type: 'expense' } },
      { $group: { _id: null, totalExpenses: { $sum: '$amount' } } }
    ]);

    const totalIncome = income.length ? income[0].totalIncome : 0;
    const totalExpenses = expenses.length ? expenses[0].totalExpenses : 0;
    const balance = totalIncome - totalExpenses;

    res.json({
      totalIncome,
      totalExpenses,
      balance
    });
  } catch (err) {
    res.status(500).json({ message: "Error generating summary", error: err.message });
  }
});

app.post('/goal', async (req, res) => {
  const { name, targetAmount } = req.body;

  if (!name || !targetAmount) {
    return res.status(400).json({ message: "Name and target amount are required" });
  }

  try {
    const newGoal = new Goal({ name, targetAmount });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(500).json({ message: "Error saving goal", error: err.message });
  }
});

app.get('/goals', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: "Error fetching goals", error: err.message });
  }
});
app.put('/goal/:id', async (req, res) => {
  const { id } = req.params;
  const { currentAmount } = req.body;

  try {
    const goal = await Goal.findByIdAndUpdate(id, { currentAmount }, { new: true });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ message: "Error updating goal", error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
