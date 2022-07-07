import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

const CartItemDrink = ({ data, remove, index }) => {
  const [displayInfo, setDisplayInfo] = useState("none");

  useEffect(() => {
    if (data.information !== undefined) {
      setDisplayInfo("block");
    }
  }, [data.information]);

  const onRemButtonClick = () => {
    remove(index);
  };

  const renderedItem = () => {
    if (data.hasOwnProperty("MilkType")) {
      return <div>Milk Type: {data.MilkType}</div>;
    } else if (data.hasOwnProperty("quantity")) {
      return <div>Quantity: {data.quantity}</div>;
    } else {
      return "";
    }
  };

  return (
    <div className="cart-flex">
      <div className="img-wrapper">
        <div>
          <img alt={data.item} className="cart-img" src={data.imageSrc} />
        </div>
      </div>
      <div className="cart-wrapper-price">
        <p>
          ${data.price} | {data.item}
        </p>
      </div>
      {renderedItem()}
      <div style={{ display: displayInfo }} className="cart-wrapper-comments">
        <p>
          <em>{data.information}</em>
        </p>
      </div>
      <div>
        <p>
          <strong>Total Item Price: ${data.totalPrice}</strong>
        </p>
      </div>
      <div className="cart-button-container">
        <div className="cart-button-wrapper">
          <div className="cart-remove-button-container">
            <Button
              onClick={() => onRemButtonClick()}
              className="me-3"
              variant="danger"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemDrink;
