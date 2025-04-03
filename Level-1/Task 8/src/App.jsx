import React from 'react';
import RoleBasedMessage from './RoleBasedMessage';

function App() {
  const userRole = 'Admin'; 

  return (
    <div>
      <h1>Role-Based Messages</h1>
      <RoleBasedMessage role={userRole} />
    </div>
  );
}

export default App;
