import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div className="product-detail">Product not found</div>;
  }

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <p><strong>Description:</strong> {product.description}</p>
      <p><strong>Price:</strong> {product.price}</p>
    </div>
  );
};

export default ProductDetail;
