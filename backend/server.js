const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow React to connect
app.use(express.json()); // To parse JSON bodies

// Mock User Data for Login
const adminUser = {
    email: "admin@3bood.com",
    password: "123"
};

// Login API Endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt for: ${email}`);

    if (email === adminUser.email && password === adminUser.password) {
        res.status(200).json({ 
            success: true, 
            message: "Login Successful! Welcome back Abood." 
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: "Invalid email or password." 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Backend Server is running on port ${PORT}`);
});