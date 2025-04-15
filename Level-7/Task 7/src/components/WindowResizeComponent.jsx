import React from "react";
import useWindowResize from "../hooks/useWindowResize";
import "../App.css";

const WindowResizeComponent = () => {
  const { width, height } = useWindowResize();

  return (
    <div className="resize-container">
      <h2>Window Size Tracker</h2>
      <p className="dimension">Width: <strong>{width}px</strong></p>
      <p className="dimension">Height: <strong>{height}px</strong></p>
    </div>
  );
};

export default WindowResizeComponent;
