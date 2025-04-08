import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2>Simple Counter</h2>
      <h1>{count}</h1>
      <button onClick={increment} style={buttonStyle}>Increment</button>
      <button onClick={decrement} style={buttonStyle}>Decrement</button>
    </div>
  );
};

const buttonStyle = {
  margin: "0 10px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};

export default Counter;
