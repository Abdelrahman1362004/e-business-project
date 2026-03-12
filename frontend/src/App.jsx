import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        
        <main className="content">
          <Routes>
            
            {/* 1. Home Page (Hero Section) */}
            <Route path="/" element={
              <div className="hero-container">
                <div className="hero-content">
                  <h1 className="hero-title">Elevate Your Style 🚀</h1>
                  <p className="hero-subtitle">Discover the best deals on 3bood Store</p>
                  <Link to="/products">
                    <button className="hero-button">Shop Now</button>
                  </Link>
                </div>
              </div>
            } />
            
            {/* 2. Login Page */}
            <Route path="/login" element={
              <div className="login-wrapper">
                <div className="login-card">
                  <h2>Welcome Back! 👋</h2>
                  <p>Please enter your details to login</p>
                  
                  <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                      <label>Email Address</label>
                      <input type="email" placeholder="name@company.com" required />
                    </div>
                    
                    <div className="input-group">
                      <label>Password</label>
                      <input type="password" placeholder="••••••••" required />
                    </div>
                    
                    <div className="form-options">
                      <label><input type="checkbox" /> Remember me</label>
                      <a href="#">Forgot password?</a>
                    </div>
                    
                    <button type="submit" className="login-button">Login to Account</button>
                  </form>
                  
                  <p className="signup-link">
                    Don't have an account? <a href="#">Sign up for free</a>
                  </p>
                </div>
              </div>
            } />

            {/* 3. Placeholder Pages */}
            <Route path="/products" element={
              <div className="page-placeholder">
                <h1>Our Products List 📦</h1>
                <p>New arrivals coming soon!</p>
              </div>
            } />
            
            <Route path="/cart" element={
              <div className="page-placeholder">
                <h1>Your Shopping Cart 🛒</h1>
                <p>Your cart is currently empty.</p>
              </div>
            } />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;