const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock user for validation
const adminUser = {
    email: "admin@3bood.com",
    password: "123"
};

// Login API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt: ${email}`);

    if (email === adminUser.email && password === adminUser.password) {
        res.status(200).json({ success: true, message: "Welcome Abood!" });
    } else {
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});