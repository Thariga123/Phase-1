import React, { useEffect } from 'react';
import { fetchDataPromise } from './fetchDatapromise';

function App() {
  useEffect(() => {
    fetchDataPromise()
      .then((data) => {
        console.log('Data received:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Check the console after 2 seconds (Promise version)!</h1>
    </div>
  );
}

export default App;
