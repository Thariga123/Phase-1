import React, { useState } from 'react';
import UserFetcher from './components/UserFetcher';

const App = () => {
  const [showUser, setShowUser] = useState(true);

  return (
    <div className="App">
      <h1>Axios Request Cancellation</h1>
      <button onClick={() => setShowUser(prev => !prev)}>
        {showUser ? 'Unmount UserFetcher' : 'Mount UserFetcher'}
      </button>
      <hr />
      {showUser && <UserFetcher />}
    </div>
  );
};

export default App;
