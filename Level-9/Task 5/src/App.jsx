import React, { useEffect, useState } from 'react';
import LargeList from './components/LargeList';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [listData] = useState(
    Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)
  );


  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <h1>React.memo Optimization</h1>
      <p>Counter: {counter}</p>
      <LargeList items={listData} />
    </div>
  );
};

export default App;
