import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipes } from '../utils/api';

function SearchResults() {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchRecipes(`complexSearch?query=${query}&number=12`).then((data) => {
      setResults(data.results);
    });
  }, [query]);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {results.map((item) => (
        <Link key={item.id} to={`/recipe/${item.id}`}>
          <img src={item.image} alt={item.title} className="rounded-lg shadow-md" />
          <h3 className="mt-2">{item.title}</h3>
        </Link>
      ))}
    </div>
  );
}

export default SearchResults;
