import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api.js';
import { useAuth } from '../context/AuthContext';

export default function Register() {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/register', form);
            login(res.data.token);
            navigate('/tasks');
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Register</h2>
            <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} required />
            <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} required />
            <button type="submit">Register</button>
        </form>
    );
}
