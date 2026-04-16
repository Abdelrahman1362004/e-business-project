import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

const productsData = [
  { id: 1, name: "iPhone 15 Pro", price: 999, image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=500", category: "Phones" },
  { id: 2, name: "MacBook Air M2", price: 1199, image: "https://images.unsplash.com/photo-1611186871348-b1ec696e52c9?q=80&w=500", category: "Laptops" },
  { id: 3, name: "Samsung S24 Ultra", price: 1299, image: "https://images.unsplash.com/photo-1707231456201-70529d899564?q=80&w=500", category: "Phones" },
  { id: 4, name: "Apple Watch Series 9", price: 399, image: "https://images.unsplash.com/photo-1546868871-70ca48370731?q=80&w=500", category: "Watches" },
];

function App() {
  const [cart, setCart] = useState([]);

  // 1. Add to Cart
  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart! 🛒`);
  };

  // 2. Remove specific item (New)
  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
  };

  // 3. Clear all items (New)
  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCart([]);
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <Router>
      <div className="app-wrapper">
        <Navbar cartCount={cart.length} />
        
        <main className="content">
          <Routes>
            
            {/* Home Page */}
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
            
            {/* Products Page */}
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

            {/* Login Page */}
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
                    <button type="submit" className="login-button">Login to Account</button>
                  </form>
                </div>
              </div>
            } />

            {/* Updated Cart Page */}
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
                    <Link to="/products" style={{color: '#0072ff'}}>Go Shopping</Link>
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
                          <button 
                            className="remove-item-btn" 
                            onClick={() => removeFromCart(index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    
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