import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import './index.css';

const ThemedPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme}`}>
      <h1>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</h1>
      <ThemeToggle />
      <p>This is a simple theme switcher using useContext.</p>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <ThemedPage />
  </ThemeProvider>
);

export default App;
