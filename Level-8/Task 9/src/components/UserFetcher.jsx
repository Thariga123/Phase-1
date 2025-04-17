import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import axios from 'axios';

const UserFetcher = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchUser = async () => {
      try {
        const response = await api.get('/users/1', {
          cancelToken: source.token,
        });
        setUser(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request cancelled:', err.message);
        } else {
          setError('Failed to fetch user');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    return () => {
      source.cancel('Component unmounted: request cancelled');
    };
  }, []);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
    <h3>User Info</h3>
    {user && (
      <>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </>
    )}
  </div>
  );
};

export default UserFetcher;
