import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';

const App = () => {
  return (
    <div className="app">
      <h1>Product Search</h1>
      <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes>
    </div>
  );
};

export default App;
