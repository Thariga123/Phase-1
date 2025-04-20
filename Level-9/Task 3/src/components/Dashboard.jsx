import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav>
          <NavLink to="overview" className={({ isActive }) => isActive ? 'active' : ''}>Overview</NavLink>
          <NavLink to="profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
          <NavLink to="settings" className={({ isActive }) => isActive ? 'active' : ''}>Settings</NavLink>
        </nav>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
