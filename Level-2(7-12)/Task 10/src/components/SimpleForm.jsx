import React, { useState } from 'react';
import './SimpleForm.css';

const SimpleForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('Form Submitted:', formData);
    alert('✅ Your details have been submitted!');
    setFormData({ name: '', email: '' }); 
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Submit Your Info</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SimpleForm;
