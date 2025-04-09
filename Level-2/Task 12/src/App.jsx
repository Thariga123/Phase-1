import React from 'react';
import Greeting from './components/Greeting';

const App = () => {
  const userIsLoggedIn = true; 

  return (
    <div className="app-container">
      <Greeting isLoggedIn={userIsLoggedIn} />
    </div>
  );
};

export default App;
