import React, { useState } from 'react';
import './UserForm.css';

function UserForm() {
  const [user, setUser] = useState({
    name: '',
    age: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  return (
    <div className="form-container">
      <h2>User Info</h2>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={user.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Enter your age"
        value={user.age}
        onChange={handleChange}
      />
      <div className="output">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Age:</strong> {user.age}</p>
      </div>
    </div>
  );
}

export default UserForm;
