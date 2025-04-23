import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Delicious</h2>
      <nav>
        <NavLink to="/" className="nav-item">Home</NavLink>
        <NavLink to="/search/Italian" className="nav-item">Italian</NavLink>
        <NavLink to="/search/American" className="nav-item">American</NavLink>
        <NavLink to="/search/Indian" className="nav-item">Indian</NavLink>
        <NavLink to="/search/Thai" className="nav-item">Thai</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
