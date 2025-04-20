import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page">
      <h2>Home Page</h2>
      <p>Welcome! <Link to="/login">Login</Link> to access your dashboard.</p>
    </div>
  );
};

export default Home;
