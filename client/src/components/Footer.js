import React from "react";

const Footer = ({ price, quantity, toggleCart }) => {
  return (
    <footer>
      <div className="running-container">
        <div className="running-quantity">Total: {quantity} items</div>
        <div className="running-price">${price}</div>
      </div>
      <button onClick={toggleCart} className="view-cart-button">
        View Cart
      </button>
    </footer>
  );
};

export default Footer;
