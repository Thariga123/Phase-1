import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [operator, setOperator] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [result, setResult] = useState(null);

  const handleNumberClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleOperatorClick = (op) => {
    if (input) {
      setFirstOperand(parseFloat(input));
      setOperator(op);
      setInput('');
    }
  };

  const handleEqualsClick = () => {
    if (firstOperand !== null && operator && input !== '') {
      const secondOperand = parseFloat(input);
      let res = 0;
      switch (operator) {
        case '+':
          res = firstOperand + secondOperand;
          break;
        case '-':
          res = firstOperand - secondOperand;
          break;
        case '*':
          res = firstOperand * secondOperand;
          break;
        case '/':
          res = secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
          break;
        default:
          break;
      }
      setResult(res);
      setInput('');
      setFirstOperand(null);
      setOperator(null);
    }
  };

  const handleClearClick = () => {
    setInput('');
    setOperator(null);
    setFirstOperand(null);
    setResult(null);
  };

  return (
    <div className="calculator">
      <div className="display">
        {input || result || '0'}
      </div>
      <div className="buttons">
        <button className="operator" onClick={handleClearClick}>C</button>
        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
        <button className="operator" onClick={() => handleOperatorClick('/')}>/</button>

        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
        <button className="operator" onClick={() => handleOperatorClick('*')}>*</button>

        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>
        <button className="operator" onClick={() => handleOperatorClick('-')}>-</button>

        <button onClick={() => handleNumberClick('0')}>0</button>
        <button className="operator" onClick={handleEqualsClick}>=</button>
        <button className="operator" onClick={() => handleOperatorClick('+')}>+</button>
      </div>
    </div>
  );
};

export default Calculator;
