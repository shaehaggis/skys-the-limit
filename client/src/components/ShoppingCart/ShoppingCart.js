import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import CartItemFood from "./CartItemFood";
import CartItemDrink from "./CartItemDrink";
import Button from "react-bootstrap/Button";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";
import { Link, useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [shoppingCart, ] = useContext(ShoppingCartContext);

  const renderedShoppingCart = shoppingCart.map((item, index) => {
    if (item.category === "BBQ" || item.category === "Burgers") {
      return (
        <CartItemFood key={index} data={item} index={index} />
      );
    } else {
      return (
        <CartItemDrink key={index} data={item} index={index} />
      );
    }
  });

  //calculate total cart price
  const calculateCartPrice = () => {
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

  if (shoppingCart.length === 0){
    return <div>No Items in your Cart!</div>
  }

  return (
    <section>
        <button onClick={() => navigate(-1)} className="cart-back-button">
          <span>
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          <span>Back to Menu</span>
        </button>
      {renderedShoppingCart}
      <div className="total-price-container">Total Price: ${calculateCartPrice()}</div>
      <div className="purchase-button-container">
        <Link to="/payment">
          <Button className="me-3" variant="dark">
            Confirm Payment
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ShoppingCart;
