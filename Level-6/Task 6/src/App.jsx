import React, { useState } from 'react';
import TimerLogger from './components/TimerLogger';
import './components/TimerLogger.css';

function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div className="app-container">
      <h1>useEffect Cleanup Example</h1>
      <button onClick={() => setShowTimer(!showTimer)}>
        {showTimer ? 'Unmount Timer' : 'Mount Timer'}
      </button>
      {showTimer && <TimerLogger />}
    </div>
  );
}

export default App;
