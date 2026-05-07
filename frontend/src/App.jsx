import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import axios from 'axios'; 
import Navbar from './components/Navbar';
import './App.css';

// --- NEW: Product Detail Component ---
function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="loader">Loading product details...</div>;

  return (
    <div className="product-detail-page">
      <div className="detail-container">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-info">
          <span className="category-tag">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-description">
            Experience the latest in innovation with the {product.name}. 
            Perfectly crafted for style and performance.
          </p>
          <p className="detail-price">${product.price}</p>
          <button className="add-to-cart-btn big" onClick={() => addToCart(product)}>
            Add to Shopping Cart
          </button>
          <Link to="/products" className="back-link">← Back to Products</Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load Products and User Session
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    getProducts();

    const savedUser = localStorage.getItem('userEmail');
    if (savedUser) setUser(savedUser);
  }, []);

  // Fetch cart from server once user is logged in
  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/cart/${user}`);
          setCart(res.data);
        } catch (err) {
          console.error("Error loading cart from server");
        }
      };
      fetchCart();
    }
  }, [user]);

  // Sync cart with backend helper function
  const syncCartWithServer = async (updatedCart) => {
    if (user) {
      try {
        await axios.post('http://localhost:5000/api/cart/update', {
          email: user,
          cartItems: updatedCart
        });
      } catch (err) {
        console.error("Sync error:", err);
      }
    }
  };

  // --- Cart Actions ---
  const addToCart = async (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    await syncCartWithServer(updatedCart);
    alert(`${product.name} added to cart! 🛒`);
  };

  const removeFromCart = async (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    await syncCartWithServer(updatedCart);
  };

  const clearCart = async () => {
    if (window.confirm("Empty your shopping cart?")) {
      setCart([]);
      await syncCartWithServer([]);
    }
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
    setCart([]); // Clear local cart view on logout
    alert("Logged out.");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...new Set(products.map(p => p.category))];

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
                
                <div className="filter-section">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="category-buttons">
                    {categories.map(cat => (
                      <button 
                        key={cat} 
                        className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="products-grid">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div key={product.id} className="product-card">
                        <Link to={`/product/${product.id}`} className="product-link">
                          <div className="product-image">
                            <img src={product.image} alt={product.name} />
                          </div>
                        </Link>
                        <div className="product-info">
                          <span className="category-tag">{product.category}</span>
                          <h3>{product.name}</h3>
                          <p className="price">${product.price}</p>
                          <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-results">No products found matching your search. 🔍</p>
                  )}
                </div>
              </div>
            } />

            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />

            <Route path="/login" element={
              <div className="login-wrapper">
                <div className="login-card">
                  <h2>Login 👋</h2>
                  <form className="login-form" onSubmit={handleLogin}>
                    <input type="email" placeholder="admin@3bood.com" required />
                    <input type="password" placeholder="123" required />
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