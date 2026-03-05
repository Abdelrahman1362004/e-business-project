const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// إجبار السيرفر على قراءة الملف من المسار الحالي
dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());
app.use(cors());

// السطر ده هيعرفنا المشكلة فين بالضبط
console.log("Checking URI:", process.env.MONGO_URI);

const dbURI = process.env.MONGO_URI;

if (!dbURI) {
    console.error("❌ Error: MONGO_URI is not defined in .env file!");
} else {
    mongoose.connect(dbURI)
        .then(() => console.log('✅ Connected to MongoDB Atlas Successfully!'))
        .catch((err) => console.error('❌ MongoDB Connection Error:', err.message));
}

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));