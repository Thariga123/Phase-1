import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar">
            <h2>📚 BookShelf</h2>
            <div>
                <Link to="/">Home</Link>
                <Link to="/mybooks">My Books</Link>
            </div>
        </nav>
    );
}
