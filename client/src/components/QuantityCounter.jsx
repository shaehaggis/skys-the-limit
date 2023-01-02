import React from "react";

const QuantityCounter = ({ updateQuantity, quantity }) => {
  const onButtonClick = (value) => {
    updateQuantity(value);
  };

  return (
    <div className="quantity-counter">
      <button
        className="decrement"
        value="-"
        onClick={(e) => onButtonClick(e.target.value)}
        style={{ color: quantity === 0 ? "#c0c0c0" : "black" }}
      >
        -
      </button>
      <div className="quantity">{quantity}</div>
      <button
        className="increment"
        value="+"
        onClick={(e) => onButtonClick(e.target.value)}
        style={{ color: quantity === 9 ? "#c0c0c0" : "black" }}
      >
        +
      </button>
    </div>
  );
};

export default QuantityCounter;
