import React, { useState, useCallback } from 'react';
import Parent from './components/Parent';
import './index.css';

const App = () => {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(false);

  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div className="app-wrapper">
      <h1>useCallback Memoized Callback</h1>
      <p>Count: {count}</p>
      <Parent onIncrement={handleIncrement} />

      <button
        className="toggle-button"
        onClick={() => setOther((prev) => !prev)}
      >
        Toggle Other State
      </button>

      <p>Other state is: {other ? 'True' : 'False'}</p>
    </div>
  );
};

export default App;
