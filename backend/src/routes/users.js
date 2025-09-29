

const express = require('express');
const User = require('../models/User');
const router = express.Router();

// GET /api/users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.getAll();
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
});

// POST /api/users - Create new user
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    if (!email || !name) {
      return res.status(400).json({
        success: false,
        error: 'Email and name are required'
      });
    }

    const newUser = await User.create({ email, name });
    res.status(201).json({
      success: true,
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create user'
    });
  }
});

module.exports = router;
