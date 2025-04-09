import React from 'react';
import Person from './component/Person';

function App() {
  return (
    <>
    <h1>Multiple props</h1>
    <div>
      <Person name="Thariga" age={20} city="Hyderabad" />
      <Person name="Agalya" age={35} city="Bangalore" />
      <Person name="Reena" age={28} city="Mumbai" />
      
    </div>
    </>
  );
}

export default App;
