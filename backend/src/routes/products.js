

const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    console.log('📦 Fetching all products...');
    const products = await Product.getAll();
    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products'
    });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product'
    });
  }
});

// POST /api/products - Create new product
router.post('/', async (req, res) => {
  try {
    const { name, price, description, stock } = req.body;
    
    // Basic validation
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        error: 'Product name and price are required'
      });
    }

    const newProduct = await Product.create({ name, price, description, stock });
    res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    console.error('❌ Error creating product:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create product'
    });
  }
});

module.exports = router;
