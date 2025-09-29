

const { query } = require('../config/database');

class Product {
  // Get all products
  static async getAll() {
    try {
      const result = await query('SELECT * FROM products ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  // Get product by ID
  static async getById(id) {
    try {
      const result = await query('SELECT * FROM products WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  // Create new product
  static async create(productData) {
    const { name, price, description, stock = 0 } = productData;
    try {
      const result = await query(
        'INSERT INTO products (name, price, description, stock) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, price, description, stock]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  // Update product stock (for inventory management)
  static async updateStock(id, newStock) {
    try {
      const result = await query(
        'UPDATE products SET stock = $1 WHERE id = $2 RETURNING *',
        [newStock, id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }
}

module.exports = Product;
