import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <div className="counter-container">
      <div className="counter-box">
        <div className="counter-value">Counter: {count}</div>
        <div className="button-group">
          <button className="counter-button" onClick={increment}>Increment</button>
          <button className="counter-button decrement" onClick={decrement}>Decrement</button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
