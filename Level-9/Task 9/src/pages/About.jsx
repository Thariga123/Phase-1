import React from 'react';
import useCachedFetch from '../hooks/useCachedFetch';

const About = () => {
  const { data, loading, error } = useCachedFetch('https://jsonplaceholder.typicode.com/posts');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data.</p>;

  return (
    <div>
      <h1>About</h1>
      <ul>
        {data.slice(0, 5).map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default About;
