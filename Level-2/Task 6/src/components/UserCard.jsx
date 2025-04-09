import React from "react";
import PropTypes from "prop-types";

const UserCard = ({ name, age, isActive }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem" }}>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Status: {isActive ? "Active" : "Inactive"}</p>
    </div>
  );
};


UserCard.propTypes = {
  name: PropTypes.string.isRequired,   
  age: PropTypes.number,              
  isActive: PropTypes.bool             
};

export default UserCard;
