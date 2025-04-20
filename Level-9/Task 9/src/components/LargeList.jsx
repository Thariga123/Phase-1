import React, { useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';

const LargeList = () => {
  const items = useMemo(() => Array.from({ length: 1000 }, (_, i) => `Item ${i}`), []);

  const Row = ({ index, style }) => <div style={style}>{items[index]}</div>;

  return (
    <div style={{ height: 300 }}>
      <List height={300} itemCount={items.length} itemSize={35} width={'100%'}>
        {Row}
      </List>
    </div>
  );
};

export default React.memo(LargeList);
