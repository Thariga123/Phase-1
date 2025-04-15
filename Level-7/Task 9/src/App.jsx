import React from "react";
import InfiniteScrollList from "./components/InfiniteScrollList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>useIntersectionObserver Custom Hook</h1>
      <InfiniteScrollList />
    </div>
  );
}

export default App;
