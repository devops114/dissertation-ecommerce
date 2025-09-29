


const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// GET /api/orders - Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.getAll();
    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orders'
    });
  }
});

// POST /api/orders - Create new order
router.post('/', async (req, res) => {
  try {
    const { user_id, items, total } = req.body;
    
    if (!user_id || !items || !total) {
      return res.status(400).json({
        success: false,
        error: 'User ID, items, and total are required'
      });
    }

    const newOrder = await Order.create({ user_id, items, total });
    res.status(201).json({
      success: true,
      data: newOrder,
      message: 'Order created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create order'
    });
  }
});

// PUT /api/orders/:id/status - Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.updateStatus(req.params.id, status);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order,
      message: 'Order status updated'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update order status'
    });
  }
});

module.exports = router;
