import React from 'react';
import useAxios from '../hooks/useAxios';

const CachedDataViewer = () => {
  const {
    data: users,
    loading,
    error,
    refresh,
  } = useAxios('/users');

  return (
    <div>
      <h2>Users (with Caching)</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={refresh}>Force Refresh</button>
      <ul>
        {users?.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CachedDataViewer;
