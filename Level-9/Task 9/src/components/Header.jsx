import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = React.memo(() => (
  <nav className="header">
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/large">Large Component</Link>
  </nav>
));

export default Header;
