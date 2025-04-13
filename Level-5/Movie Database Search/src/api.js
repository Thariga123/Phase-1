const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (searchTerm) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${searchTerm}`);
  if (!response.ok) throw new Error("Network response was not ok");

  const data = await response.json();
  console.log("Fetched data:", data); 

  return data;
};

export const fetchMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  if (data.Response === "False") throw new Error(data.Error);
  return data;
};
