import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DataFetcher() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Fetched Posts:</h2>
      <ul>
        {data.slice(0, 10).map((post) => (  
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataFetcher;
