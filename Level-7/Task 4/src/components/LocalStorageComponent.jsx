import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import "../App.css";

const LocalStorageComponent = () => {
  const [name, setName] = useLocalStorage("name", "");

  return (
    <div className="storage-container">
      <label htmlFor="name">Enter your name:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
        placeholder="Your name"
      />
      <p className="input-display">Stored name: {name || "none"}</p>
    </div>
  );
};

export default LocalStorageComponent;
