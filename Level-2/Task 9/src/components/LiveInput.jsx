import React, { useState } from 'react';
import './LiveInput.css';

const LiveInput = () => {
  const [text, setText] = useState('');

  return (
    <div className="live-input-container">
      <h2 className="title">Live Input Display</h2>
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="styled-input"
      />
      <p className="live-display">
        {text ? `You typed: ${text}` : 'Start typing above 👆'}
      </p>
    </div>
  );
};

export default LiveInput;
