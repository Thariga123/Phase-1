import React from "react";
import useFetch from "../hooks/useFetch";
import "../App.css";

const FetchComponent = () => {
  const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/posts");

  return (
    <div className="fetch-container">
      <h2>Posts</h2>
      {loading && <p className="status-message">Loading...</p>}
      {error && <p className="status-message error">Error: {error}</p>}
      {data && (
        <ul className="data-list">
          {data.slice(0, 5).map((post) => (
            <li key={post.id} className="data-item">
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchComponent;
