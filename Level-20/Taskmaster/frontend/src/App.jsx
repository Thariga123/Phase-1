import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';

export default function App() {
    const { token } = useAuth();
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={token ? <TaskList /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/tasks" />} />
            </Routes>
        </div>
    );
}
