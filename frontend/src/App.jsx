import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      {/* الـ Navbar هيفضل ثابت فوق في كل الصفحات */}
      <Navbar />

      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Routes>
          {/* هنا بنحدد إيه اللي يظهر لما نفتح كل رابط */}
          <Route path="/" element={
            <div>
              <h1>مرحباً بك في متجر عبود 🛒</h1>
              <p>أفضل المنتجات بأفضل الأسعار</p>
            </div>
          } />
          
          <Route path="/products" element={<h1>قائمة المنتجات 📦</h1>} />
          <Route path="/cart" element={<h1>سلة المشتريات 🛒</h1>} />
          <Route path="/login" element={<h1>تسجيل الدخول 🔑</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;