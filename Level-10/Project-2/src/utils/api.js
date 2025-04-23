import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

export const fetchRecipes = async (endpoint) => {
  const cached = localStorage.getItem(endpoint);
  if (cached) return JSON.parse(cached);

  const { data } = await axios.get(`https://api.spoonacular.com/recipes/${endpoint}&apiKey=${API_KEY}`);
  localStorage.setItem(endpoint, JSON.stringify(data));
  return data;
};
