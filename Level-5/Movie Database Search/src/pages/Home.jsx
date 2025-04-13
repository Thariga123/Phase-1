import React, { useState, useEffect } from "react";
import { fetchMovies } from "../api";
import "../index.css";
import { Link } from 'react-router-dom';


const Home = () => {
  const [query, setQuery] = useState("Avengers");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getMovies = async () => {
    try {
      setLoading(true);
      const data = await fetchMovies(query);

      console.log("API Response:", data); 

      if (data.Response === "True") {
        setMovies(data.Search);
        console.log("Movies:", data.Search); 
        setError("");
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    getMovies();
  };

  return (
    <div>
      <h1>🎬 Movie Search</h1>
      <form onSubmit={handleSearch} className="search-box">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
      </form>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {!loading && movies.length === 0 && !error && (
        <div className="text-white mt-4">No movies found.</div>
      )}

<div className="movies-container">
  {movies.map((movie) => (
    <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
        alt={movie.Title}
      />
      <h2>{movie.Title}</h2>
    </Link>

        ))}
      </div>
    </div>
  );
};

export default Home;
