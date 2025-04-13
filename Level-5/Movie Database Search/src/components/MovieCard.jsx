import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
  <div className="border rounded shadow p-2 w-60 text-center">
    <Link to={`/movie/${movie.imdbID}`}>
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
        alt={movie.Title}
        className="w-full h-80 object-cover rounded"
      />
      <h3 className="mt-2 font-semibold">{movie.Title}</h3>
    </Link>
  </div>
);

export default MovieCard;
