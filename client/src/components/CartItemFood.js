import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const CartItemFood = ({ data, remove, index }) => {
  const [displayAdded, setDisplayAdded] = useState("none");
  const [displayRemoved, setDisplayRemoved] = useState("none");
  const [displayInfo, setDisplayInfo] = useState("none");

  const onRemButtonClick = () => {
    remove(index);
  };

  useEffect(() => {
    if (data.added.length > 0) {
      setDisplayAdded("block");
    }
    if (data.removed.length > 0) {
      setDisplayRemoved("block");
    }

    if (data.information !== "") {
      setDisplayInfo("block");
    }
  }, [data.added.length, data.removed.length, data.information]);

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
      <div style={{ display: displayAdded }} className="cart-wrapper-add">
        <p>
          +{" "}
          {data.added.map((item, index) => {
            if (index !== data.added.length - 1) {
              return <span key={index}>{item.ingredient},&nbsp;</span>;
            } else {
              return <span key={index}>{item.ingredient}</span>;
            }
          })}
        </p>
      </div>
      <div style={{ display: displayRemoved }} className="cart-wrapper-remove">
        <p>
          -{" "}
          {data.removed.map((item, index) => {
            return <span key={index}>{item.ingredient}</span>;
          })}
        </p>
      </div>
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

export default CartItemFood;
