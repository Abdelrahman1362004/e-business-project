import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        
        <main className="content">
          <Routes>
            {/* الصفحة الرئيسية - Hero Section */}
            <Route path="/" element={
              <div className="hero-container">
                <div className="hero-content">
                  <h1 className="hero-title">Elevate Your Style 🚀</h1>
                  <p className="hero-subtitle">Discover the best deals on 3bood Store</p>
                  <button className="hero-button">Shop Now</button>
                </div>
              </div>
            } />
            
            {/* صفحات مؤقتة لحد ما نبرمجها المرات الجاية */}
            <Route path="/products" element={<div className="page-placeholder"><h1>Our Products List 📦</h1><p>Coming Soon...</p></div>} />
            <Route path="/cart" element={<div className="page-placeholder"><h1>Your Shopping Cart 🛒</h1><p>Your cart is empty.</p></div>} />
            <Route path="/login" element={<div className="page-placeholder"><h1>Login to your Account 🔑</h1><p>Access your dashboard.</p></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;