import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios'; 
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch Products and User Session on Load
  useEffect(() => {
    // 1. Fetch products from Backend
    const getProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    getProducts();

    // 2. Check for saved login session
    const savedUser = localStorage.getItem('userEmail');
    if (savedUser) setUser(savedUser);
  }, []);

  // --- Cart Actions ---
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart! 🛒`);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => {
    if (window.confirm("Empty your shopping cart?")) setCart([]);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  // --- Auth Actions ---
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('userEmail', email);
        setUser(email);
        alert("Login Successful! 🎉");
        window.location.href = "/"; 
      }
    } catch (err) {
      alert("Wrong email or password! ❌");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUser(null);
    alert("Logged out.");
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar cartCount={cart.length} user={user} onLogout={handleLogout} />
        
        <main className="content">
          <Routes>
            <Route path="/" element={
              <div className="hero-container">
                <div className="hero-content">
                  <h1 className="hero-title">Elevate Your Style 🚀</h1>
                  <p className="hero-subtitle">Welcome {user ? user.split('@')[0] : 'to 3bood Store'}</p>
                  <Link to="/products"><button className="hero-button">Shop Now</button></Link>
                </div>
              </div>
            } />
            
            <Route path="/products" element={
              <div className="products-page">
                <h1 className="page-title">Premium Collection</h1>
                <div className="products-grid">
                  {products.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-image"><img src={product.image} alt={product.name} /></div>
                      <div className="product-info">
                        <span className="category-tag">{product.category}</span>
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
                    <input type="email" placeholder="Email (admin@3bood.com)" required />
                    <input type="password" placeholder="Password (123)" required />
                    <button type="submit" className="login-button">Login</button>
                  </form>
                </div>
              </div>
            } />

            <Route path="/cart" element={
              <div className="cart-page">
                <h1>Your Cart 🛒</h1>
                {cart.length === 0 ? <p>Your cart is empty.</p> : (
                  <div className="cart-container">
                    <div className="cart-items-list">
                      {cart.map((item, index) => (
                        <div key={index} className="cart-item-card">
                          <img src={item.image} width="50" alt="" />
                          <div className="info">
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
                          </div>
                          <button onClick={() => removeFromCart(index)}>Remove</button>
                        </div>
                      ))}
                      <button className="clear-cart-btn" onClick={clearCart}>Clear All</button>
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