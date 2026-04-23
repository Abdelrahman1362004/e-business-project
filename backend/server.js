const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. Database Mock: Products List
const products = [
  { id: 1, name: "iPhone 17 Pro", price: 999, image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=500", category: "Phones" },
  { id: 2, name: "MacBook Air M2", price: 1199, image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTy0eOnXXVWjJ9R8la4Mlp1ASsEiRTSlHVtsyRoOi0CtRHNhfArdgGnmT34AEWqQyBGDTUjp4EPvdpzcMLl-SOlV7pYwZ7blWxZ7JPnVcKFqUmPlYsNHGKa91VuvSQ_DMRSI0YTE1anmbI", category: "Laptops" },
  { id: 3, name: "Samsung S26 Ultra", price: 1299, image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=500", category: "Phones" },
  { id: 4, name: "Apple Watch Series 9", price: 399, image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS19dHmcLz27bwIorN6pW-PlI7XgLdhEpBJDogxiHPzR2R3mbrWEyYMookNn87DZ4GGnPnIN7v3i_z2ruLkaLofi7syQQyS81etID3yf2NOYNnyodLfFSmCezQ-u3rGEYAAyZbb1yA", category: "Watches" },
];

// 2. Database Mock: Admin User
const adminUser = {
    email: "admin@3bood.com",
    password: "123"
};

// --- API Endpoints ---

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Login Request
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (email === adminUser.email && password === adminUser.password) {
        res.status(200).json({ success: true, message: "Authorized" });
    } else {
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
});

app.listen(PORT, () => {
    console.log(`Backend Server is running on http://localhost:${PORT}`);
});