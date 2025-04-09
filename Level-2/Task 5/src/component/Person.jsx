
import React from "react";

function Person(props) {
  return (
   
      <div className="one">
        <h2>Name: {props.name}</h2>
        <p>Age: {props.age}</p>
        <p>City: {props.city}</p>
      </div>
    
  );
}

export default Person;

