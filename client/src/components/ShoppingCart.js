import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const ShoppingCart = ({ shoppingCart, toggleCart }) => {
  useEffect(() => {
    console.log(shoppingCart);
  }, [shoppingCart]);

  const renderedShoppingCart = shoppingCart.map((item, index) => {
    return (
      <div key={index} className="cart-flex">
        <div className="img-wrapper">
          <div>
            <img alt={item.item} className="cart-img" src={item.imageSrc} />
          </div>
        </div>
        <div className="cart-wrapper-price">
          <p>
            ${item.price} | {item.item}
          </p>
        </div>
        <div className="cart-wrapper-add">
          <p>
            +{" "}
            {item.added.map((item, index) => {
              return <span key={index}>{item.ingredient},&nbsp;</span>;
            })}
          </p>
        </div>
        <div className="cart-wrapper-remove">
          <p>
            -{" "}
            {item.removed.map((item, index) => {
              return <span key={index}>{item.ingredient}</span>;
            })}
          </p>
        </div>
        <div className="cart-wrapper-comments">
          <p>
            <em>{item.information}</em>
          </p>
        </div>
        <div>
          <p>
            <strong>Total Item Price: ${item.totalPrice}</strong>
          </p>
        </div>
        <div className="cart-button-container">
          <div className="cart-button-wrapper">
            <div className="cart-remove-button-container">
              <button className="cart-remove-button">Remove</button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <section>
      <button className="cart-back-button" onClick={toggleCart}>
        <span>
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
        <span>Back to Menu</span>
      </button>
      {renderedShoppingCart}
      <div className="total-price-container"></div>
      <div className="purchase-button-container"></div>
    </section>
  );
};

export default ShoppingCart;
