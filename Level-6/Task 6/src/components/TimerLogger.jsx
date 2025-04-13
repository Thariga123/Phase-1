import React, { useEffect } from 'react';

function TimerLogger() {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Timer is running...');
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log('Timer cleared on unmount.');
    };
  }, []);

  return (
    <div className="timer-box">
      <p>Open the console to see the timer log every second.</p>
    </div>
  );
}

export default TimerLogger;
