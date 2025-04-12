import React from "react";
import { useParams, Link } from "react-router-dom";
import products from "../data/products";

const RecipeDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p>Recipe not found.</p>;

  return (
    <div className="recipe-details-container">
      <Link to="/">← Back to Recipes</Link>
      <h2>{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} style={{ maxWidth: "300px" }} />
      <p>{product.description}</p>
      <h3>Ingredients</h3>
      <ul>
        {product.ingredients.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <h3>Instructions</h3>
      <p>{product.instructions}</p>
    </div>
  );
};

export default RecipeDetails;
