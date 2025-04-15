import React from "react";
import useInput from "../hooks/useInput";
import "../App.css";

const InputComponent = () => {
  const input = useInput("");

  return (
    <div className="input-container">
      <label htmlFor="custom-input">Enter Text:</label>
      <input
        id="custom-input"
        type="text"
        {...input}
        className="input-field"
        placeholder="Type something..."
      />
      <p className="input-display">You typed: {input.value}</p>
    </div>
  );
};

export default InputComponent;
