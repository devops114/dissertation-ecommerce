


const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');        // ✅ ADD THIS LINE
const orderRoutes = require('./routes/orders');      // ✅ ADD THIS LINE

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);                   // ✅ ADD THIS LINE
app.use('/api/orders', orderRoutes);                 // ✅ ADD THIS LINE

// Health check endpoint (important for DevOps monitoring)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Ecommerce API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Ecommerce API Server Running',
    version: '2.0.0',                               // ✅ UPDATE VERSION
    endpoints: {
      products: '/api/products',
      users: '/api/users',                          // ✅ ADD THIS
      orders: '/api/orders',                        // ✅ ADD THIS
      health: '/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🛍️ Ecommerce backend running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
