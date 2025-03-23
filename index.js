const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = process.env.port ||4000;

// ✅ Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded images

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ✅ Routes
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);

// ✅ Test Route
app.get('/home', (req, res) => {
    res.send('<h1>Welcome to the Home Page</h1>');
});

// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
