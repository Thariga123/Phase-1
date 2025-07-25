import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [auth, setAuth] = useState({ email: '', password: '' });
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [form, setForm] = useState({
    name: '', instructions: '', cuisine: '', mealType: '', servings: 1, ingredients: []
  });
  const [search, setSearch] = useState('');
  const [newServings, setNewServings] = useState(1);
  const [scaledRecipe, setScaledRecipe] = useState(null);
  const [mealPlan, setMealPlan] = useState({
    Monday: '', Tuesday: '', Wednesday: '', Thursday: '',
    Friday: '', Saturday: '', Sunday: ''
  });
  const [shoppingList, setShoppingList] = useState([]);

  const login = async () => {
    const res = await axios.post('http://localhost:5000/api/login', auth);
    setToken(res.data.token);
  };

  const fetchRecipes = async () => {
    const res = await axios.get(`http://localhost:5000/api/recipes?q=${search}`, {
      headers: { Authorization: token }
    });
    setRecipes(res.data);
  };

  const fetchAllRecipes = async () => {
    const res = await axios.get(`http://localhost:5000/api/all-recipes`, {
      headers: { Authorization: token }
    });
    setAllRecipes(res.data);
  };

  const addRecipe = async () => {
    await axios.post('http://localhost:5000/api/recipes', form, {
      headers: { Authorization: token }
    });
    setForm({ name: '', instructions: '', cuisine: '', mealType: '', servings: 1, ingredients: [] });
    fetchRecipes();
    fetchAllRecipes();
  };

  const scaleRecipe = async (id) => {
    const res = await axios.post(`http://localhost:5000/api/recipes/${id}/scale`, {
      newServings: parseInt(newServings),
    }, { headers: { Authorization: token } });
    setScaledRecipe(res.data);
  };

  const generateShoppingList = async () => {
    const recipeIds = Object.values(mealPlan).filter(Boolean);
    const res = await axios.post('http://localhost:5000/api/shopping-list', {
      recipeIds
    }, { headers: { Authorization: token } });
    setShoppingList(res.data);
  };

  useEffect(() => {
    if (token) {
      fetchRecipes();
      fetchAllRecipes();
    }
  }, [token]);

  return (
    <div className="app">
      <h1>🍲 RecipeBox</h1>
      {!token ? (
        <div className="auth">
          <input placeholder="Email" onChange={e => setAuth({ ...auth, email: e.target.value })} />
          <input placeholder="Password" type="password" onChange={e => setAuth({ ...auth, password: e.target.value })} />
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <>
          <h2>Create Recipe</h2>
          <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <textarea placeholder="Instructions" value={form.instructions} onChange={e => setForm({ ...form, instructions: e.target.value })} />
          <input placeholder="Cuisine" value={form.cuisine} onChange={e => setForm({ ...form, cuisine: e.target.value })} />
          <input placeholder="Meal Type" value={form.mealType} onChange={e => setForm({ ...form, mealType: e.target.value })} />
          <input type="number" placeholder="Servings" value={form.servings} onChange={e => setForm({ ...form, servings: parseInt(e.target.value) })} />
          <button onClick={() => setForm({ ...form, ingredients: [...form.ingredients, { name: '', quantity: '', unit: '' }] })}>+ Ingredient</button>
          {form.ingredients.map((ing, idx) => (
            <div key={idx} className="ingredient-row">
              <input placeholder="Name" value={ing.name || ''} onChange={e => {
                const ingredients = [...form.ingredients];
                ingredients[idx].name = e.target.value;
                setForm({ ...form, ingredients });
              }} />
              <input type="number" placeholder="Quantity" value={ing.quantity || ''} onChange={e => {
                const ingredients = [...form.ingredients];
                ingredients[idx].quantity = parseFloat(e.target.value) || 0;
                setForm({ ...form, ingredients });
              }} />
              <input placeholder="Unit" value={ing.unit || ''} onChange={e => {
                const ingredients = [...form.ingredients];
                ingredients[idx].unit = e.target.value;
                setForm({ ...form, ingredients });
              }} />
            </div>
          ))}
          <button onClick={addRecipe}>Save Recipe</button>

          <h2>Search Recipes</h2>
          <input placeholder="Search by name/ingredient" value={search} onChange={e => setSearch(e.target.value)} />
          <button onClick={fetchRecipes}>Search</button>

          {recipes.map(r => (
            <div key={r._id} className="recipe-card">
              <h3>{r.name}</h3>
              <p><strong>Cuisine:</strong> {r.cuisine} | <strong>Meal:</strong> {r.mealType}</p>
              <p><strong>Instructions:</strong> {r.instructions}</p>
              <p><strong>Servings:</strong> {r.servings}</p>
              <ul>
                {r.ingredients.map((i, idx) => (
                  <li key={idx}>{i.name} - {i.quantity} {i.unit}</li>
                ))}
              </ul>
              <input type="number" placeholder="New servings" value={newServings} onChange={e => setNewServings(e.target.value)} />
              <button onClick={() => scaleRecipe(r._id)}>Scale</button>
            </div>
          ))}

          {scaledRecipe && (
            <div className="scaled">
              <h3>Scaled Recipe: {scaledRecipe.name}</h3>
              <p><strong>New Servings:</strong> {scaledRecipe.servings}</p>
              <ul>
                {scaledRecipe.ingredients.map((i, idx) => (
                  <li key={idx}>{i.name} - {i.quantity} {i.unit}</li>
                ))}
              </ul>
            </div>
          )}

          <h2>🍽 Weekly Meal Planner</h2>
          <div className="meal-plan">
            {Object.keys(mealPlan).map(day => (
              <div key={day} className="meal-day">
                <label>{day}</label>
                <select value={mealPlan[day]} onChange={e => setMealPlan({ ...mealPlan, [day]: e.target.value })}>
                  <option value="">-- Select Recipe --</option>
                  {allRecipes.map(r => (
                    <option value={r._id} key={r._id}>{r.name}</option>
                  ))}
                </select>
              </div>
            ))}
            <button onClick={generateShoppingList}>Generate Shopping List</button>
          </div>

          {shoppingList.length > 0 && (
            <div className="shopping-list">
              <h3>🛒 Shopping List</h3>
              <ul>
                {shoppingList.map((item, idx) => (
                  <li key={idx}>
                    {item.name}: {item.total} {item.unit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
