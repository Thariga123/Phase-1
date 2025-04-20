import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = () => {
    login(() => {
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="page">
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
