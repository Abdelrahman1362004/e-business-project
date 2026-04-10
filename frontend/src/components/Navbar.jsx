import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>3bood Store 🛒</Link>
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/products" style={styles.link}>Products</Link></li>
        <li>
          <Link to="/cart" style={styles.link}>
            Cart <span style={styles.badge}>{cartCount}</span>
          </Link>
        </li>
        <li><Link to="/login" style={styles.link}>Login</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2.5rem',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)', 
  },
  logo: { 
    fontSize: '1.6rem', 
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '30px',
    margin: 0,
    padding: 0,
  },
  link: { 
    color: '#fff', 
    textDecoration: 'none',
    fontSize: '1.1rem',
    transition: '0.3s',
  },
  badge: {
    backgroundColor: '#0072ff',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    marginLeft: '5px',
    fontWeight: 'bold',
  }
};

export default Navbar;