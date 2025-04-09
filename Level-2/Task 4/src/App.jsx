import React from "react";


const Greeting = ({ name = "Hello, World!" }) => {
  return <h1>{name}</h1>;
};

const App = () => {
  return (
    <div>
      <Greeting name="Hello, Thariga!" />
      <Greeting />
      
    </div>
  );
};

export default App