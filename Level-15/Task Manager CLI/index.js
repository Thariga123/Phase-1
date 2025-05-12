import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { addTask, listTasks, updateTask, deleteTask } from './taskManager.js';

yargs(hideBin(process.argv))
  .command('add', 'Add a new task', {
    title: {
      describe: 'Task title',
      demandOption: true,
      type: 'string',
    },
    description: {
      describe: 'Task description',
      demandOption: true,
      type: 'string',
    },
    status: {
      describe: 'Task status (pending/completed)',
      choices: ['pending', 'completed'],
      type: 'string',
      default: 'pending',
    },
    dueDate: {
      describe: 'Due date (YYYY-MM-DD)',
      type: 'string',
    },
  }, addTask)
  .command('list', 'List all tasks', {
    status: {
      describe: 'Filter tasks by status',
      choices: ['pending', 'completed'],
      type: 'string',
    },
    sortByDate: {
      describe: 'Sort tasks by due date',
      type: 'boolean',
      default: false,
    },
  }, listTasks)
  .command('update', 'Update an existing task', {
    id: {
      describe: 'Task ID',
      demandOption: true,
      type: 'number',
    },
    title: {
      describe: 'New title',
      type: 'string',
    },
    description: {
      describe: 'New description',
      type: 'string',
    },
    status: {
      describe: 'New status (pending/completed)',
      choices: ['pending', 'completed'],
      type: 'string',
    },
    dueDate: {
      describe: 'New due date',
      type: 'string',
    },
  }, updateTask)
  .command('delete', 'Delete a task', {
    id: {
      describe: 'Task ID',
      demandOption: true,
      type: 'number',
    },
  }, deleteTask)
  .demandCommand(1, 'Please provide a valid command to run.')
  .help()
  .argv;
