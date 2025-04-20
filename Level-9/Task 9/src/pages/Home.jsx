import React, { useCallback, useContext } from 'react';
import LargeList from '../components/LargeList';
import { AppContext } from '../context/AppContext';

const Home = () => {
  const { count, increment } = useContext(AppContext);

  const handleClick = useCallback(() => {
    increment();
  }, [increment]);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleClick}>Clicked {count} times</button>
      <LargeList />
    </div>
  );
};

export default Home;
