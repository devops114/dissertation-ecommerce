


const { query } = require('../src/config/database');

async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database...');

    // Create products table (you have this)
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        description TEXT,
        stock INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // ✅ ADD THESE NEW TABLES:
    
    // Users table
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Orders table
    await query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        items JSONB NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert sample data
    await query(`
      INSERT INTO products (name, price, description, stock) VALUES
      ('MacBook Pro 14"', 1999.99, 'Apple MacBook Pro with M3 chip', 15),
      ('iPhone 15 Pro', 999.99, 'Latest iPhone with titanium design', 30),
      ('AirPods Pro', 249.99, 'Wireless noise-cancelling earbuds', 50),
      ('iPad Air', 599.99, 'Powerful iPad for creative work', 25),
      ('Apple Watch Series 9', 399.99, 'Advanced health monitoring', 40)
      ON CONFLICT DO NOTHING;
    `);

    // ✅ ADD SAMPLE USER:
    await query(`
      INSERT INTO users (email, name) VALUES
      ('customer@example.com', 'John Customer')
      ON CONFLICT DO NOTHING;
    `);

    console.log('✅ Database initialized successfully!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
}

initializeDatabase();
