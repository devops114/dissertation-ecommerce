
const express = require('express');
const router = express.Router();

// Simple mock authentication for demo purposes
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock authentication (in real app, use database)
  if (email === 'admin@example.com' && password === 'password') {
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: 1,
        email: 'admin@example.com',
        name: 'Admin User'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }
});

router.post('/register', (req, res) => {
  // Mock registration
  res.json({
    success: true,
    message: 'Registration successful (mock)',
    user: {
      id: Date.now(),
      email: req.body.email,
      name: req.body.name
    }
  });
});

module.exports = router;
