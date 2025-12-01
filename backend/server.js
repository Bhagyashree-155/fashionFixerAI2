const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());

// Database Connection
connectDB();

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/prompts', require('./routes/promptRoutes'));
app.use('/api/v1/shop', require('./routes/shopRoutes'));
app.use('/api/v1/order', require('./routes/orderRoutes'));
app.use('/api/v1/withdraw', require('./routes/withdrawRoutes'));
app.use('/api/v1/payment', require('./routes/paymentRoutes'));
app.use('/api/v1/recommendations', require('./routes/recommendationRoutes'));

app.get('/', (req, res) => {
    res.send('FashionFixerAI API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
