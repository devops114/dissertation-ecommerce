

import React, { useState } from 'react';
import './ShoppingCart.css';

const ShoppingCart = ({ cartItems, onRemoveItem, totalPrice }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="shopping-cart">
        <button 
          className="cart-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          🛒 Cart (0)
        </button>
        {isOpen && (
          <div className="cart-dropdown">
            <p>Your cart is empty</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="shopping-cart">
      <button 
        className="cart-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        🛒 Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
      </button>

      {isOpen && (
        <div className="cart-dropdown">
          <h3>Shopping Cart</h3>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">Qty: {item.quantity}</span>
              <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              <button 
                onClick={() => onRemoveItem(item.id)}
                className="remove-btn"
              >
                ❌
              </button>
            </div>
          ))}
          <div className="cart-total">
            <strong>Total: ${totalPrice}</strong>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
