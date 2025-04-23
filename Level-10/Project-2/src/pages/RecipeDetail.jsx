import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipes } from '../utils/api';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipes(`${id}/information?includeNutrition=false`).then(setRecipe);
  }, [id]);

  if (!recipe) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full max-w-md rounded my-4" />
      <h2 className="text-xl">Ingredients:</h2>
      <ul className="list-disc ml-6">
        {recipe.extendedIngredients.map((ing) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>
      <h2 className="text-xl mt-4">Instructions:</h2>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    </div>
  );
}

export default RecipeDetail;
