import React, { useState } from "react";
import QuantityCounter from "./QuantityCounter";
import MenuForm from "./MenuForm";

const MenuItem = ({ itemName, imageSrc, price, category, newCartItem }) => {
  const [quantity, setQuantity] = useState(0);
  const [activeForm, setActiveForm] = useState("none");

  const updateQuantity = (value) => {
    if (value === "+" && quantity < 9) {
      setQuantity(quantity + 1);
    } else if (value === "-" && quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const onButtonClick = () => {
    if (quantity > 0) {
      setActiveForm("block");
    }
  };

  const onCancel = () => {
    setActiveForm("none");
  };

  const computeForm = (formData) => {
    let cartItem = Object.assign(
      { item: itemName, price: price, totalPrice: price, imageSrc: imageSrc },
      formData
    );
    if (formData.hasOwnProperty("added")) {
      let sum = parseFloat(price);
      formData.added.forEach(({ price }) => {
        sum += parseFloat(price);
      });
      formData.removed.forEach(({ price }) => {
        sum -= parseFloat(price);
      });

      cartItem.totalPrice = sum.toFixed(2);
    }
    newCartItem(cartItem);
  };

  return (
    <section className="menu-item">
      <section className="flex-container">
        <div className="image-container">
          <img alt={itemName} src={imageSrc} />
        </div>
        <div className="item-info-container">
          <div className="price-container">
            <div className="price" style={{ fontWeight: 800 }}>
              ${price}
            </div>
          </div>
        </div>
        <div className="final-section">
          <div className="item-name-container">
            <div className="item-name">{itemName}</div>
          </div>
          <QuantityCounter
            updateQuantity={updateQuantity}
            quantity={quantity}
          />
          <div className="button-container">
            <button className="add-to-cart-button" onClick={onButtonClick}>
              Add
            </button>
          </div>
        </div>
      </section>
      <section style={{ display: activeForm }}>
        <MenuForm
          quantity={quantity}
          category={category}
          item={itemName}
          onCancel={onCancel}
          computeForm={computeForm}
        />
      </section>
    </section>
  );
};

export default MenuItem;
