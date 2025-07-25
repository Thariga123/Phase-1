const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
});

router.post('/', async (req, res) => {
    const { title, description, dueDate } = req.body;
    const task = new Task({ userId: req.user.id, title, description, dueDate });
    await task.save();
    res.json(task);
});

router.put('/:id', async (req, res) => {
    const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true });
    res.json(task);
});

router.delete('/:id', async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ msg: 'Task deleted' });
});

module.exports = router;
