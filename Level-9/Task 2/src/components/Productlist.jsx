import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products';
import '../styles/ProductList.css';

const ProductList = () => {
  return (
    <div className="product-list">
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
