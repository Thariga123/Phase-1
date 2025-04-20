import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo'>Demo</div>
      <ul>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>

        <NavLink to="/about">
          <li>About</li>
        </NavLink>

        <NavLink to="/contact">
          <li>Contact</li>
        </NavLink>
      </ul>
      <button>Login</button>
    </div>
  )
}

export default Navbar
