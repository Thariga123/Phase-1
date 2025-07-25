import React, { useState } from 'react';
import API from '../api.js';
import { useAuth } from '../context/AuthContext';

export default function TaskForm({ refresh }) {
    const [form, setForm] = useState({ title: '', description: '', dueDate: '' });
    const { token } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post('/tasks', form, { headers: { Authorization: token } });
        setForm({ title: '', description: '', dueDate: '' });
        refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Add Task</h2>
            <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
            <input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} required />
            <button type="submit">Add Task</button>
        </form>
    );
}
