const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');

// Load Environment Variables
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname))); // Serve HTML files statically

// API Routes
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Serve HTML Pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, 'shop.html'));
});

app.get('/order_form', (req, res) => {
    res.sendFile(path.join(__dirname, 'order_form.html'));
});

// Fallback for Undefined Routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An unexpected error occurred!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
