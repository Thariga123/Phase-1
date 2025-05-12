import { promises as fs } from 'fs';
import { success, error, info, heading } from './style.js';

const FILE_PATH = './tasks.json';

const readTasks = async () => {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    console.error(error(`Failed to read tasks: ${err.message}`));
    process.exit(1);
  }
};

const writeTasks = async (tasks) => {
  try {
    await fs.writeFile(FILE_PATH, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error(error(`Failed to write tasks: ${err.message}`));
    process.exit(1);
  }
};

export const addTask = async ({ title, description, status = 'pending', dueDate }) => {
  const tasks = await readTasks();
  const newTask = {
    id: Date.now(),
    title,
    description,
    status,
    dueDate: dueDate || null,
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  console.log(success('✅ Task added successfully!'));
};

export const listTasks = async ({ status, sortByDate }) => {
  const tasks = await readTasks();
  let filteredTasks = tasks;

  if (status) {
    filteredTasks = tasks.filter(task => task.status === status);
  }

  if (sortByDate) {
    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  console.log(heading(`\n📝 Task List (${filteredTasks.length} tasks)`));
  filteredTasks.forEach(task => {
    console.log(
      info(`\nID: ${task.id}`) +
      `\nTitle: ${task.title}` +
      `\nDescription: ${task.description}` +
      `\nStatus: ${task.status}` +
      `\nDue Date: ${task.dueDate || 'N/A'}\n`
    );
  });
};

export const updateTask = async ({ id, title, description, status, dueDate }) => {
  const tasks = await readTasks();
  const index = tasks.findIndex(task => task.id === Number(id));

  if (index === -1) {
    console.error(error('❌ Task not found.'));
    return;
  }

  if (title) tasks[index].title = title;
  if (description) tasks[index].description = description;
  if (status) tasks[index].status = status;
  if (dueDate) tasks[index].dueDate = dueDate;

  await writeTasks(tasks);
  console.log(success('✅ Task updated successfully!'));
};

export const deleteTask = async ({ id }) => {
  const tasks = await readTasks();
  const newTasks = tasks.filter(task => task.id !== Number(id));

  if (newTasks.length === tasks.length) {
    console.error(error('❌ Task not found.'));
    return;
  }

  await writeTasks(newTasks);
  console.log(success('🗑️ Task deleted successfully!'));
};
