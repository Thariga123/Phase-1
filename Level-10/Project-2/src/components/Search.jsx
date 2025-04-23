import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search/${input}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="p-4 flex justify-center">
      <input
        className="border p-2 w-1/2 rounded"
        type="text"
        value={input}
        placeholder="Search recipes..."
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
}

export default Search;
