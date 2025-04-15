import React from 'react';
import useToggle from '../hooks/useToggle';
import './ToggleContent.css';

function ToggleContent() {
  const [isVisible, toggleVisibility] = useToggle(false);

  return (
    <div className="toggle-wrapper">
      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'} Content
      </button>

      {isVisible && (
        <div className="highlighted-box">
         Content gets disappear when the button is clicked
        </div>
      )}
    </div>
  );
}

export default ToggleContent;
