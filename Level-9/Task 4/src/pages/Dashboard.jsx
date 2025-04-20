import React from 'react';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="page">
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
      <Link to="/profile">Go to Profile</Link><br />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
