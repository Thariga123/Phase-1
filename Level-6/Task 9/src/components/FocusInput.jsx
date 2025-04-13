import React, { useRef } from 'react';
import '../index.css';

const FocusInput = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="focus-container">
      <h1>useRef DOM Manipulation</h1>
      <input
        type="text"
        ref={inputRef}
        placeholder="Click the button to focus me"
        className="input-box"
      />
      <button onClick={handleFocus} className="focus-button">
        Focus Input
      </button>
    </div>
  );
};

export default FocusInput;
