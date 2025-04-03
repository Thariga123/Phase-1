import React from "react";
import './App.css'

function App() {
  const num1 = 5;
  const num2 = 6;

  return (
    <div>
      <h1>Calculation Inside JSX</h1>
      <h2>The multiplication of {num1} and {num2} is: {num1 * num2}</h2>
      <h2>The sum of {num1} and {num2} is: {num1 + num2}</h2>
      <h2>The difference of {num1} and {num2} is: {num1 - num2}</h2>
      <h2>The division of {num1} and {num2} is: {num1 / num2}</h2>
    </div>
  );
}

export default App;
