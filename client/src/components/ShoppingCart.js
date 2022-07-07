import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import CartItemFood from "./CartItemFood";
import CartItemDrink from "./CartItemDrink";
import Button from "react-bootstrap/Button";

const ShoppingCart = ({ shoppingCart, price, toggleCart, remove }) => {
  const renderedShoppingCart = shoppingCart.map((item, index) => {
    if (item.category === "BBQ" || item.category === "Burgers") {
      return (
        <CartItemFood key={index} data={item} remove={remove} index={index} />
      );
    } else {
      return (
        <CartItemDrink key={index} data={item} remove={remove} index={index} />
      );
    }
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
      <div className="total-price-container">Total Price: ${price}</div>
      <div className="purchase-button-container">
        <Button className="me-3" variant="dark">
          Confirm Payment
        </Button>
      </div>
    </section>
  );
};

export default ShoppingCart;
