import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import { calculateCartItemPrice } from "../../Functions/calculateCartItemPrice";

const CartItemFood = ({ data, index }) => {
  const [shoppingCart, setShoppingCart] = useContext(ShoppingCartContext);

  const [display, setDisplay] = useState({
    added: "none",
    removed: "none",
    info: "none",
  });

  const onRemButtonClick = () => {
    const newCart = shoppingCart.filter((item, i) => i !== index);
    setShoppingCart(newCart);
  };

  //dont show sections if they are not in cart object
  useEffect(() => {
    const added = data.added.length > 0 ? "block" : "none";
    const removed = data.removed.length > 0 ? "block" : "none";
    const info = data.information !== "" ? "block" : "none";
    setDisplay({
      added: added,
      removed: removed,
      info: info,
    });
  }, [data.added.length, data.removed.length, data.information]);

  

  return (
    <div className="cart-flex">
      <div className="img-wrapper">
        <div>
          <img alt={data.item_name} className="cart-img" src={data.img_path} />
        </div>
      </div>
      <div className="cart-wrapper-price">
        <p>
          ${data.item_price.toFixed(2)} | {data.item_name}
        </p>
      </div>
      <div style={{ display: display.added }} className="cart-wrapper-add">
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
      <div style={{ display: display.removed }} className="cart-wrapper-remove">
        <p>
          -{" "}
          {data.removed.map((item, index) => {
            return <span key={index}>{item.ingredient}</span>;
          })}
        </p>
      </div>
      <div style={{ display: display.info }} className="cart-wrapper-comments">
        <p>
          <em>{data.information}</em>
        </p>
      </div>
      <div>
        <p>
          <strong>Total Item Price: ${calculateCartItemPrice(data)}</strong>
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
