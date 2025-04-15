import React from 'react';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Header />
        <Profile />
      </div>
    </UserProvider>
  );
}

export default App;
