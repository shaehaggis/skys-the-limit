import React, { useState } from "react";
import QuantityCounter from "./QuantityCounter";
import MenuForm from "./MenuForm";

const MenuItem = ({ itemInfo, newCartItem }) => {
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
    if (itemInfo.category === "Soft Drinks") {
      newCartItem({ ...itemInfo, totalPrice: itemInfo.price * quantity });
    }

    if (quantity > 0) {
      setActiveForm("block");
    }
  };

  const findNewTotal = (formData, sum) => {
    formData.added.forEach(({ price }) => {
      sum += parseFloat(price);
    });
    formData.removed.forEach(({ price }) => {
      sum -= parseFloat(price);
    });

    return sum;
  };

  const computeTotal = (formData) => {
    let cartItem = Object.assign(
      { ...itemInfo, totalPrice: itemInfo.price },
      formData
    );
    if (formData.hasOwnProperty("added")) {
      let sum = findNewTotal(formData, parseFloat(itemInfo.price));
      cartItem.totalPrice = sum.toFixed(2);
    }

    newCartItem(cartItem);
  };

  return (
    <section className="menu-item">
      <section className="flex-container">
        <div className="image-container">
          <img alt={itemInfo.itemName} src={itemInfo.imageSrc} />
        </div>
        <div className="item-info-container">
          <div className="price-container">
            <div className="price" style={{ fontWeight: 800 }}>
              ${itemInfo.price}
            </div>
          </div>
        </div>
        <div className="final-section">
          <div className="item-name-container">
            <div className="item-name">{itemInfo.itemName}</div>
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
          itemInfo={itemInfo}
          onCancel={() => setActiveForm("none")}
          computeTotal={computeTotal}
        />
      </section>
    </section>
  );
};

export default MenuItem;
