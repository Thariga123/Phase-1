import React, { useState, useCallback } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import "../App.css";

const InfiniteScrollList = () => {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => `Item #${i + 1}`));

  const loadMore = useCallback(() => {
    setItems((prev) => [
      ...prev,
      ...Array.from({ length: 10 }, (_, i) => `Item #${prev.length + i + 1}`)
    ]);
  }, []);

  const loaderRef = useIntersectionObserver(loadMore, {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  return (
    <div className="scroll-container">
      <h2>Infinite Scroll List</h2>
      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="list-item">{item}</li>
        ))}
      </ul>
      <div ref={loaderRef} className="loading">Loading more...</div>
    </div>
  );
};

export default InfiniteScrollList;
