import React from "react";
import "./ColorBox.css";

const ColorBox = ({ bgColor }) => {
  return <div className="color-box" style={{ backgroundColor: bgColor }}>Dynamic Background</div>;
};

export default ColorBox;
