import React, { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    axios.post('https://jsonplaceholder.typicode.com/posts', formData)
      .then((response) => {
        console.log('Response:', response.data);
        setSuccess('Form submitted successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to submit form. Please try again.');
      });
  };

  return (
    <div>
      <h2>Contact Us</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email: </label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Message: </label><br />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
