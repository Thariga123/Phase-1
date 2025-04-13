import React, { useState } from 'react';
import './InputDisplay.css';

function InputDisplay() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p className="output-text">You typed: {inputValue}</p>
    </div>
  );
}

export default InputDisplay;
