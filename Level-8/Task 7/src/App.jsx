import React from 'react';
import UserList from './components/UserList';
import PostList from './components/PostList';
import { LoadingProvider, useLoading } from './context/LoadingContext';

const LoadingIndicator = () => {
  const { isLoading } = useLoading();
  return isLoading ? <p style={{ color: 'blue' }}>Loading...</p> : null;
};

const AppContent = () => (
  <>
    <h1>Axios Interceptors</h1>
    <LoadingIndicator />
    <UserList />
    <PostList />
  </>
);

const App = () => (
  <LoadingProvider>
    <AppContent />
  </LoadingProvider>
);

export default App;
