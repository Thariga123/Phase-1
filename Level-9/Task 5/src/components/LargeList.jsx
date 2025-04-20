import React from 'react';

const LargeList = ({ items }) => {
  console.log('Rendering LargeList');
  return (
    <div className="list-container">
      {items.map((item, index) => (
        <div className="list-item" key={index}>
          {item}
        </div>
      ))}
    </div>
  );
};


const areEqual = (prevProps, nextProps) => {
  return JSON.stringify(prevProps.items) === JSON.stringify(nextProps.items);
};

export default React.memo(LargeList, areEqual);
