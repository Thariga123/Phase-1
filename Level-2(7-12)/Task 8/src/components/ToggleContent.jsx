import React, { useState } from 'react';
import './ToggleContent.css'

const ToggleContent = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(prev => !prev);

  return (
    <div className="toggle-container">
      <button className="toggle-button" onClick={toggleVisibility}>
        {visible ? 'Hide' : 'Show'} Content
      </button>
      {visible && (
        <div className="toggle-content" key="content">
          <p>Welcome !!! Let's get started and keep going 🚀</p>
        </div>
      )}
    </div>
  );
};

export default ToggleContent;
