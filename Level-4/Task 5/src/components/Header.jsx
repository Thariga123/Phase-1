import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <header className="header">
      <h2>React Context API</h2>
      {user && (
        <div>
          Welcome, <strong>{user.name}</strong>!{' '}
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;
