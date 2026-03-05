import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>MyStore</Link>
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>الرئيسية</Link></li>
        <li><Link to="/products" style={styles.link}>المنتجات</Link></li>
        <li><Link to="/cart" style={styles.link}>السلة 🛒</Link></li>
        <li><Link to="/login" style={styles.link}>دخول</Link></li>
      </ul>
    </nav>
  );
};


const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#333',
    color: '#fff',
  },
  logo: { fontSize: '1.5rem', fontWeight: 'bold' },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '20px',
  },
  link: { color: '#fff', textDecoration: 'none' }
};

export default Navbar;