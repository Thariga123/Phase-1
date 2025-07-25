import React, { useState, useEffect } from 'react';
import API from '../api.js';
import TaskForm from './TaskForm';
import { useAuth } from '../context/AuthContext';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const { token } = useAuth();

    const fetchTasks = async () => {
        const res = await API.get('/tasks', { headers: { Authorization: token } });
        setTasks(res.data);
    };

    useEffect(() => { fetchTasks(); }, []);

    const toggleComplete = async (task) => {
        await API.put(`/tasks/${task._id}`, { ...task, completed: !task.completed }, { headers: { Authorization: token } });
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await API.delete(`/tasks/${id}`, { headers: { Authorization: token } });
        fetchTasks();
    };

    const filteredTasks = tasks.filter(t => filter === 'all' || (filter === 'completed' ? t.completed : !t.completed));

    return (
        <div className="task-container">
            <TaskForm refresh={fetchTasks} />
            <div className="filter-buttons">
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('incomplete')}>Incomplete</button>
            </div>
            {filteredTasks.map(task => (
                <div key={task._id} className={`task ${task.completed ? 'completed' : ''}`}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Due: {task.dueDate}</p>
                    <button onClick={() => toggleComplete(task)}>Mark {task.completed ? 'Incomplete' : 'Complete'}</button>
                    <button onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
