import React from 'react';

const Parent = React.memo(({ onIncrement }) => {
  console.log('Child rendered');

  return (
    <div className="child-box">
      <h2>Parent Component</h2>
      <button onClick={onIncrement} className="child-button">
        Increment Count
      </button>
    </div>
  );
});

export default Parent;
