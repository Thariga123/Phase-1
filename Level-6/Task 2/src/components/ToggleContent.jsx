import React, { useState } from 'react';
import './ToggleContent.css';

const ToggleContent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(prev => !prev);

  return (
    <div className="toggle-container">
      <div className="toggle-box">
        <button className="toggle-button" onClick={toggleVisibility}>
          {isVisible ? 'Hide Content' : 'Show Content'}
        </button>

        {isVisible && (
          <div className="toggle-content">
            <p>This is the content that shows and hides!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToggleContent;
