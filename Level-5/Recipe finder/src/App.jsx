import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import productsData from "./data/products";
import RecipeDetails from "./components/RecipeDetails";
import "./index.css";

function Home({ cart, setCart }) {
  const [search, setSearch] = useState("");

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const filteredProducts = productsData.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <h1>RECIPE FINDER</h1>
        <div className="search-cart">
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="cart-badge">
            🛒 <span>{cart.length}</span>
          </div>
        </div>
      </header>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Product key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
