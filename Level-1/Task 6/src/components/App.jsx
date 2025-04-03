import React, { useState } from "react";
import ColorBox from "./ColorBox";

const App = () => {
  const [color, setColor] = useState("blue");

  return (
    <div>
      <ColorBox bgColor={color} />
      <button onClick={() => setColor("red")}>Red</button>
      <button onClick={() => setColor("green")}>Green</button>
      <button onClick={() => setColor("blue")}>Blue</button>
      <button onClick={() => setColor("teal")}>Teal</button>
      <button onClick={() => setColor("brown")}>Brown</button>
      <button onClick={() => setColor("pink")}>Default</button>
    </div>
  );
};

export default App;
