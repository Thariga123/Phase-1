import React, { useEffect } from 'react';
import { fetchDataPromise } from './fetchDataPromise';

function App() {
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchDataPromise();
        console.log('Data received:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDataAsync();
  }, []);

  return (
    <div className="App">
      <h1>Check the console after 2 seconds (Async/Await version)!</h1>
    </div>
  );
}

export default App;
