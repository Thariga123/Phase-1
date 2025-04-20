import React from 'react';
import { useAuth } from '../AuthContext';

const Profile = () => {
  const { logout } = useAuth();

  return (
    <div className="page">
      <h2>Profile Page</h2>
      <p>This is your profile.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
