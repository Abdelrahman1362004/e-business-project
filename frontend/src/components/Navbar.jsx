import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, user, onLogout }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>3bood Store 🛒</Link>
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/products" style={styles.link}>Products</Link></li>
        <li>
          <Link to="/cart" style={styles.link}>
            Cart <span style={styles.badge}>{cartCount}</span>
          </Link>
        </li>
        {user ? (
          <>
            <li style={styles.userName}>{user.split('@')[0]}</li>
            <li><button onClick={onLogout} style={styles.logoutBtn}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login" style={styles.link}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2.5rem', backgroundColor: '#1a1a1a', color: '#fff' },
  logo: { fontSize: '1.6rem', fontWeight: 'bold' },
  navLinks: { display: 'flex', listStyle: 'none', gap: '25px', alignItems: 'center' },
  link: { color: '#fff', textDecoration: 'none', fontWeight: '500' },
  badge: { backgroundColor: '#0072ff', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem' },
  userName: { color: '#00c6ff', fontWeight: 'bold', textTransform: 'capitalize' },
  logoutBtn: { backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer' }
};

export default Navbar;