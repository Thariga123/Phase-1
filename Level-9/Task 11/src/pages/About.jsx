import React from 'react';
import '../App.css'; 

export default function About() {
  return (
    <div className="page-content">
      <h1 className="text-center">About ℹ️</h1>
      <p>Welcome to the about page!</p>
      <p>
        <a href="/contact">Contact us</a> or learn more about our mission and values.
      </p>
    </div>
  );
}
