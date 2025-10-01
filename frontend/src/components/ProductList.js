

import React from 'react';
import './ProductList.css';

const ProductList = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="product-list">
        <h2>Products</h2>
        <p>No products available.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h2>Available Products ({products.length})</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <p className="description">{product.description}</p>
            <p className="stock">In stock: {product.stock}</p>
            <button 
              onClick={() => onAddToCart(product)}
              className="add-to-cart-btn"
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
