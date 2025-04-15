import React, { useState } from 'react';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '' });
    setMessage('');
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

   
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }


    setTimeout(() => {
      if (isLogin) {
        if (formData.email === 'test@example.com' && formData.password === 'password') {
          setMessage('Login successful!');
        } else {
          setError('Invalid email or password.');
        }
      } else {
        setMessage('Signup successful! You can now log in.');
      }
    }, 1000);
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <p onClick={toggleMode} className="toggle-link">
        {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
      </p>
    </div>
  );
};

export default AuthForm;
