import React, { useState } from "react";
import ProductList from "./components/ProductList";
import products from "./data/products";
import "./App.css";

const App = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>ShopEasy</h1>
        <div className="cart">
          🛒 <span className="cart-badge">{cart.length}</span>
        </div>
      </header>
      <ProductList products={products} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default App;
