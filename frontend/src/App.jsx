import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios'; 
import Navbar from './components/Navbar';
import './App.css';

const productsData = [
  { id: 1, name: "iPhone 17 Pro", price: 999, image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=500", category: "Phones" },
  { id: 2, name: "MacBook Air M2", price: 1199, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTy0eOnXXVWjJ9R8la4Mlp1ASsEiRTSlHVtsyRoOi0CtRHNhfArdgGnmT34AEWqQyBGDTUjp4EPvdpzcMLl-SOlV7pYwZ7blWxZ7JPnVcKFqUmPlYsNHGKa91VuvSQ_DMRSI0YTE1anmbI", category: "Laptops" },
  { id: 3, name: "Samsung S26 Ultra", price: 1299, image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=500", category: "Phones" },
  { id: 4, name: "Apple Watch Series 9", price: 399, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS19dHmcLz27bwIorN6pW-PlI7XgLdhEpBJDogxiHPzR2R3mbrWEyYMookNn87DZ4GGnPnIN7v3i_z2ruLkaLofi7syQQyS81etID3yf2NOYNnyodLfFSmCezQ-u3rGEYAAyZbb1yA", category: "Watches" },
];

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // State to store logged-in user info

  // Check if user is already logged in on page load
  useEffect(() => {
    const savedUser = localStorage.getItem('userEmail');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // --- Cart Functions ---
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart! 🛒`);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => {
    if (window.confirm("Clear your cart?")) setCart([]);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  // --- Auth Functions ---
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('userEmail', email); // Save session
        setUser(email);
        alert("Welcome back! 🎉");
        window.location.href = "/"; // Redirect to home
      }
    } catch (error) {
      alert("Invalid credentials ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUser(null);
    alert("Logged out successfully.");
  };

  return (
    <Router>
      <div className="app-wrapper">
        {/* Pass user and logout function to Navbar */}
        <Navbar cartCount={cart.length} user={user} onLogout={handleLogout} />
        
        <main className="content">
          <Routes>
            <Route path="/" element={
              <div className="hero-container">
                <div className="hero-content">
                  <h1 className="hero-title">Elevate Your Style 🚀</h1>
                  <p className="hero-subtitle">Welcome {user ? user : 'to 3bood Store'}</p>
                  <Link to="/products"><button className="hero-button">Shop Now</button></Link>
                </div>
              </div>
            } />
            
            <Route path="/products" element={
              <div className="products-page">
                <h1 className="page-title">Premium Collection</h1>
                <div className="products-grid">
                  {productsData.map((product) => (
                    <div key={product.id} className="product-card">
                      <img src={product.image} alt={product.name} />
                      <div className="product-info">
                        <h3>{product.name}</h3>
                        <p className="price">${product.price}</p>
                        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            } />

            <Route path="/login" element={
              <div className="login-wrapper">
                <div className="login-card">
                  <h2>Login 👋</h2>
                  <form className="login-form" onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit" className="login-button">Login</button>
                  </form>
                </div>
              </div>
            } />

            <Route path="/cart" element={
              <div className="cart-page">
                <div className="cart-header">
                  <h1>Cart 🛒</h1>
                  {cart.length > 0 && <button className="clear-cart-btn" onClick={clearCart}>Clear All</button>}
                </div>
                {cart.length === 0 ? <p>Empty cart.</p> : (
                  <div className="cart-container">
                    <div className="cart-items-list">
                      {cart.map((item, index) => (
                        <div key={index} className="cart-item-card">
                          <h3>{item.name}</h3>
                          <p>${item.price}</p>
                          <button onClick={() => removeFromCart(index)}>Remove</button>
                        </div>
                      ))}
                    </div>
                    <div className="cart-summary-card">
                      <h2>Total: ${totalPrice}</h2>
                      <button className="checkout-btn">Checkout</button>
                    </div>
                  </div>
                )}
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;