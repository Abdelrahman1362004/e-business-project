import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios'; // For backend communication
import Navbar from './components/Navbar';
import './App.css';

// Product data for the store
const productsData = [

  { id: 1, name: "iPhone 17 Pro", price: 999, image: "AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADrbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAETAAAK7QAAAChpaW5mAAAAAAABAAAAGmluZmUCAAAAAAEAAGF2MDFDb2xvcgAAAABqaXBycAAAAEtpcGNvAAAAFGlzcGUAAAAAAAAAwQAAAQEAAAAQcGl4aQAAAAADCAgIAAAADGF2MUOBAAwAAAAAE2NvbHJuY2x4AAIAAgAGgAAAABdpcG1hAAAAAAAAAAEAAQQBAoMEAAAK9W1kYXQSAAoKGB4wIAwQICBoQDLcFRIAAooooUDdK1IambTg95651vra4zTjtYeHNqK", category: "Phones" },

  { id: 2, name: "MacBook Air M2", price: 1199, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTy0eOnXXVWjJ9R8la4Mlp1ASsEiRTSlHVtsyRoOi0CtRHNhfArdgGnmT34AEWqQyBGDTUjp4EPvdpzcMLl-SOlV7pYwZ7blWxZ7JPnVcKFqUmPlYsNHGKa91VuvSQ_DMRSI0YTE1anmbI", category: "Laptops" },

  { id: 3, name: "Samsung S26 Ultra", price: 1299, image: "AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADrbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAETAAAHUgAAAChpaW5mAAAAAAABAAAAGmluZmUCAAAAAAEAAGF2MDFDb2xvcgAAAABqaXBycAAAAEtpcGNvAAAAFGlzcGUAAAAAAAAAwQAAANwAAAAQcGl4aQAAAAADCAgIAAAADGF2MUOBAAwAAAAAE2NvbHJuY2x4AAIAAgAGgAAAABdpcG1hAAAAAAAAAAEAAQQBAoMEAAAHWm1kYXQSAAoKGB3wNtggQEDQgDLBDhIAAooooUC0gap", category: "Phones" },

  { id: 4, name: "Apple Watch Series 9", price: 399, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS19dHmcLz27bwIorN6pW-PlI7XgLdhEpBJDogxiHPzR2R3mbrWEyYMookNn87DZ4GGnPnIN7v3i_z2ruLkaLofi7syQQyS81etID3yf2NOYNnyodLfFSmCezQ-u3rGEYAAyZbb1yA", category: "Watches" },

];



function App() {
  // Global state for shopping cart
  const [cart, setCart] = useState([]);

  // --- Cart Management Functions ---

  // Add a selected product to the cart array
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart! 🛒`);
  };

  // Remove a specific item from the cart using its index
  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  // Clear all items from the cart after user confirmation
  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCart([]);
    }
  };

  // Calculate the total price of items currently in the cart
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  // --- Authentication Logic ---

  // Handle the login form submission and connect to backend
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      // Send a POST request to our Node.js server
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      if (response.data.success) {
        alert("Welcome back! Login Successful 🎉");
      }
    } catch (error) {
      alert("Invalid Email or Password! ❌");
      console.error("Authentication Error:", error);
    }
  };

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar cartCount={cart.length} />
        
        <main className="content">
          <Routes>
            
            {/* Home Route: Displays Hero Section */}
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
            
            {/* Products Route: Maps through productsData to display cards */}
            <Route path="/products" element={
              <div className="products-page">
                <h1 className="page-title">Premium Collection</h1>
                <div className="products-grid">
                  {productsData.map((product) => (
                    <div key={product.id} className="product-card">
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="product-info">
                        <span className="category-tag">{product.category}</span>
                        <h3>{product.name}</h3>
                        <p className="price">${product.price}</p>
                        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            } />

            {/* Login Route: Handles user authentication */}
            <Route path="/login" element={
              <div className="login-wrapper">
                <div className="login-card">
                  <h2>Welcome Back! 👋</h2>
                  <p>Please enter your details to login</p>
                  <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                      <label>Email Address</label>
                      <input type="email" placeholder="name@company.com" required />
                    </div>
                    <div className="input-group">
                      <label>Password</label>
                      <input type="password" placeholder="••••••••" required />
                    </div>
                    <button type="submit" className="login-button">Login to Account</button>
                  </form>
                </div>
              </div>
            } />

            {/* Cart Route: Displays items in the cart or an empty state message */}
            <Route path="/cart" element={
              <div className="cart-page">
                <div className="cart-header">
                  <h1 className="page-title">Your Shopping Cart 🛒</h1>
                  {cart.length > 0 && (
                    <button className="clear-cart-btn" onClick={clearCart}>Clear All</button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="page-placeholder">
                    <p>Your cart is currently empty.</p>
                    <Link to="/products" className="go-shopping-btn">Go Shopping</Link>
                  </div>
                ) : (
                  <div className="cart-container">
                    <div className="cart-items-list">
                      {cart.map((item, index) => (
                        <div key={index} className="cart-item-card">
                          <img src={item.image} alt={item.name} className="cart-item-img" />
                          <div className="cart-item-info">
                            <h3>{item.name}</h3>
                            <p className="cart-item-category">{item.category}</p>
                            <p className="cart-item-price">${item.price}</p>
                          </div>
                          <button className="remove-item-btn" onClick={() => removeFromCart(index)}>
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    {/* Cart Summary: Displays totals and checkout button */}
                    <div className="cart-summary-card">
                      <h2>Order Summary</h2>
                      <div className="summary-details">
                        <div className="summary-row">
                          <span>Items ({cart.length}):</span>
                          <span>${totalPrice}</span>
                        </div>
                        <div className="summary-row total">
                          <span>Total:</span>
                          <span>${totalPrice}</span>
                        </div>
                      </div>
                      <button className="checkout-btn">Proceed to Checkout</button>
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