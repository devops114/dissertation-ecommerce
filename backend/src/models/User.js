

const { query } = require('../config/database');

class User {
  static async getAll() {
    try {
      const result = await query('SELECT * FROM users');
      return result.rows;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const result = await query('SELECT * FROM users WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  static async create(userData) {
    const { email, name } = userData;
    try {
      const result = await query(
        'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
        [email, name]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }
}

module.exports = User;
