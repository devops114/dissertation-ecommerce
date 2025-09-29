

const { query } = require('../config/database');

class Order {
  static async getAll() {
    try {
      const result = await query('SELECT * FROM orders ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const result = await query('SELECT * FROM orders WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async create(orderData) {
    const { user_id, items, total } = orderData;
    try {
      const result = await query(
        'INSERT INTO orders (user_id, items, total, status) VALUES ($1, $2, $3, $4) RETURNING *',
        [user_id, JSON.stringify(items), total, 'pending']
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async updateStatus(id, status) {
    try {
      const result = await query(
        'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }
}

module.exports = Order;
