import React, { useEffect } from 'react';
import { fetchData } from './fetchData';

function App() {
  
  const handleData = (data) => {
    console.log('Data received:', data);
  };

  useEffect(() => {
    fetchData(handleData); 
  }, []);

  return (
    <div className="App">
      <h1>Check the console after 2 seconds!</h1>
    </div>
  );
}

export default App;
