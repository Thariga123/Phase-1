import React, { useState, useMemo, useCallback } from 'react';
import ChildButton from './components/ChildButton';

const App = () => {
  const [limit, setLimit] = useState(5000);
  const [count, setCount] = useState(0);

  
  const primes = useMemo(() => {
    console.log('Calculating primes...');
    const isPrime = (num) => {
      for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
        if (num % i === 0) return false;
      }
      return num > 1;
    };

    const result = [];
    for (let i = 2; i <= limit; i++) {
      if (isPrime(i)) result.push(i);
    }
    return result;
  }, [limit]);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleLimitChange = useCallback((e) => {
    setLimit(Number(e.target.value));
  }, []);

  return (
    <div className="app">
      <h1>useMemo & useCallback Optimization</h1>

      <div className="controls">
        <label>
          Prime Limit:
          <input type="number" value={limit} onChange={handleLimitChange} />
        </label>
        <p>Total primes found: {primes.length}</p>
      </div>

      <div className="counter">
        <p>Count: {count}</p>
        <ChildButton onClick={increment} label="Increment Counter" />
      </div>
    </div>
  );
};

export default App;
