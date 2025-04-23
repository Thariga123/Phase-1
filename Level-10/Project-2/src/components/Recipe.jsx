import { Link } from 'react-router-dom';

function Recipe({ id, title, image }) {
  return (
    <Link to={`/recipe/${id}`} className="block rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-2">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </Link>
  );
}

export default Recipe;
