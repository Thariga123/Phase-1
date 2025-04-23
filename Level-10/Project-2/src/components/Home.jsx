import { useEffect, useState } from 'react';
import { fetchRecipes } from '../utils/api';
import Recipe from './Recipe';

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes('random?number=12&tags=vegetarian').then(data => {
      setRecipes(data.recipes);
    });
  }, []);

  return (
    <div className="grid">
      {recipes.map(recipe => (
        <Recipe key={recipe.id} id={recipe.id} title={recipe.title} image={recipe.image} />
      ))}
    </div>
  );
}

export default Home;
