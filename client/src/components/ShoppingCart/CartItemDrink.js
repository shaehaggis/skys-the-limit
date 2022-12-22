import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";


const CartItemDrink = ({ data, index }) => {
  const [displayInfo, setDisplayInfo] = useState("none");
  const [shoppingCart, setShoppingCart] = useContext(ShoppingCartContext);

  //only display comments/info if it exists in the data
  useEffect(() => {
    if (data.information !== "" || data.information !== undefined) {
      setDisplayInfo("block");
    }
  }, [data.information]);

  //remove item from cart
  const onRemButtonClick = () => {
    const newCart = shoppingCart.filter((item, i) => i !== index);
    setShoppingCart(newCart);
  };

  //display either milk type or quantity if it is coffee/soft drink
  const renderedItem = () => {
    
    //only coffee has milktype
    if (data.hasOwnProperty("MilkType")) {
      return <div>Milk Type: {data.MilkType}</div>;
    } 
    
    //only soft drinks display a quantity
    else if (data.hasOwnProperty("quantity")) {
      return <div>Quantity: {data.quantity}</div>;
    } 
    
    else {
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
          ${data.price} | {data.itemName}
        </p>
      </div>
      {renderedItem}
      <div style={{ display: displayInfo }} className="cart-wrapper-comments">
        <p>
          <em>{data.information}</em>
        </p>
      </div>
      <div>
        <p>
          <strong>Total Item Price: ${data.price}</strong>
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
