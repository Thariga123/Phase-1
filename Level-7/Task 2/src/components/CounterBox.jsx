import React from 'react';
import useCounter from '../hooks/useCounter';
import './CounterBox.css';

function CounterBox() {
  const [count, increment, decrement, reset] = useCounter(0);

  return (
    <div className="counter-wrapper">
      <div className="highlighted-counter">
        <h2>Counter: {count}</h2>
        <div className="button-group">
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default CounterBox;
