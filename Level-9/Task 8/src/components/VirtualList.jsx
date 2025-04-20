import React from 'react';
import { FixedSizeList as List } from 'react-window';
import items from '../data/items';

const VirtualList = () => {

  const Row = ({ index, style }) => {
    const item = items[index];
    return (
      <div className="item" style={style}>
        <h4>{item.name}</h4>
        <p>{item.description}</p>
      </div>
    );
  };

  return (
    <div className="virtual-list-container">
      <List
        height={600} 
        itemCount={items.length} 
        itemSize={100}
        width={800} 
      >
        {Row}
      </List>
    </div>
  );
};

export default VirtualList;
