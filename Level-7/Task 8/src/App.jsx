import React from "react";
import DebouncedSearch from "./components/DebouncedSearch";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>useDebounce Custom Hook</h1>
      <DebouncedSearch />
    </div>
  );
}

export default App;
