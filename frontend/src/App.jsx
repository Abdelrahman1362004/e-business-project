import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Routes>
          <Route path="/" element={
            <div>
              <h1>Welcome to 3bood Store 🛍️</h1>
              <p>Find the best products here!</p>
            </div>
          } />
          <Route path="/products" element={<h1>Our Products List 📦</h1>} />
          <Route path="/cart" element={<h1>Your Shopping Cart 🛒</h1>} />
          <Route path="/login" element={<h1>Login to your Account 🔑</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;