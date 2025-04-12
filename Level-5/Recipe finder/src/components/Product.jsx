import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <Link to={`/recipe/${product.id}`}>
        <img src={product.imageUrl} alt={product.name} />
        <h3>{product.name}</h3>
      </Link>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default Product;
