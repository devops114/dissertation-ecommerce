

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data.data);
      setError('');
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError('Failed to load products. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🛍️ Simple Ecommerce Store</h1>
        <p>Dissertation Project - DevOps Comparison</p>
      </header>

      <ShoppingCart 
        cartItems={cart} 
        onRemoveItem={removeFromCart}
        totalPrice={getTotalPrice()}
      />

      <main className="main-content">
        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <ProductList products={products} onAddToCart={addToCart} />
        )}
      </main>

      <footer className="App-footer">
        <p>DevOps Dissertation - AWS vs Azure Comparison</p>
      </footer>
    </div>
  );
}

export default App;
