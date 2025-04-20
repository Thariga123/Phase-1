import React from 'react';

const ChildButton = React.memo(({ onClick, label }) => {
  console.log(`Rendering Button: ${label}`);
  return (
    <button className="btn" onClick={onClick}>
      {label}
    </button>
  );
});

export default ChildButton;
