import React, { useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "../App.css";

const DocumentTitleComponent = () => {
  const [inputValue, setInputValue] = useState("React App");


  useDocumentTitle(inputValue || "React App");

  return (
    <div className="title-container">
      <label htmlFor="title-input">Set Document Title:</label>
      <input
        id="title-input"
        type="text"
        className="input-field"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter a new title..."
      />
      <p className="input-display">Current Title: {inputValue || "React App"}</p>
    </div>
  );
};

export default DocumentTitleComponent;
