import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user, login } = useContext(UserContext);
  const [nameInput, setNameInput] = useState('');

  const handleLogin = () => {
    if (nameInput.trim() !== '') {
      login(nameInput);
      setNameInput('');
    }
  };

  return (
    <div className="profile">
      {!user ? (
        <>
          <input
            type="text"
            placeholder="Enter your name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <p>Your profile info will go here!</p>
      )}
    </div>
  );
};

export default Profile;
