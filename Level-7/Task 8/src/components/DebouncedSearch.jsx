import React, { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import "../App.css";

const DebouncedSearch = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); // 500ms debounce

  useEffect(() => {
    if (debouncedQuery) {
      console.log("API Call with:", debouncedQuery);
      // You could replace this with your API call logic
    }
  }, [debouncedQuery]);

  return (
    <div className="search-container">
      <h2>Debounced Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input-field"
        placeholder="Type to search..."
      />
      <p className="debounced-value">Debounced Value: <strong>{debouncedQuery}</strong></p>
    </div>
  );
};

export default DebouncedSearch;
