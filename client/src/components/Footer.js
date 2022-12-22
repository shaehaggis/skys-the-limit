import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";

const Footer = () => {
  const [shoppingCart, ] = useContext(ShoppingCartContext);

  const calculatePrice = () => {
    console.log(shoppingCart);
    let price = 0;
    shoppingCart.forEach(element => {

      //add each added ingredient to price
      if (element.hasOwnProperty("added")){
        element.added.forEach(ingredient => {
          price += parseFloat(ingredient.price);
        })
      }

      //subtract each removed ingredient from price
      if (element.hasOwnProperty("removed")){
        element.removed.forEach(ingredient => {
          price -= parseFloat(ingredient.price);
        })
      }

      price += parseFloat(element.price);
    });

    return price.toFixed(2);
  }

  return (
    <footer>
      <div className="running-container">
          <div className="running-quantity">Total: {shoppingCart.length} items</div>
          <div className="running-price">${calculatePrice()}</div>
      </div>
      <Link to="/cart" style={{ width: '35%' }}>
        <button className="view-cart-button">
          View Cart
        </button>
      </Link>
    </footer>
  );
};

export default Footer;
