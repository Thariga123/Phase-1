import React from 'react';
import './Greeting.css';

const Greeting = ({ isLoggedIn }) => {
  return (
    <div className="greeting-box">
      <h1>{isLoggedIn ? 'Welcome back!' : 'Please log in'}</h1>
    </div>
  );
};

export default Greeting;
