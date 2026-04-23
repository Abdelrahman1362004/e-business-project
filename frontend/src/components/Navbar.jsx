import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="link">3bood Store 🛒</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/products" className="link">Products</Link></li>
        <li>
          <Link to="/cart" className="link">
            Cart <span className="badge">{cartCount}</span>
          </Link>
        </li>
        {user ? (
          <>
            <li className="user-display">{user.split('@')[0]}</li>
            <li><button onClick={onLogout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <li><Link to="/login" className="link">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;