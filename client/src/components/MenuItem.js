import React, { useContext, useState } from "react";
import { ShoppingCartContext } from "../Context/ShoppingCartContext";
import QuantityCounter from "./QuantityCounter";
import MenuForm from "./Forms/MenuForm";

const MenuItem = ({ itemInfo, ingredients }) => {
  
  //quantity of item user wants to purchase. updates triggered by <QuantityCounter/>
  const [quantity, setQuantity] = useState(0);

  //determines whether the item form is shown
  const [activeForm, setActiveForm] = useState("none");

  const [, setShoppingCart] = useContext(ShoppingCartContext);

  //updateQuantity() called by <QuantityCounter/> component when + or - is clicked
  const updateQuantity = (value) => {
    if (value === "+" && quantity < 9) {
      setQuantity((quantity) => quantity + 1);
    } else if (value === "-" && quantity > 0) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  const onAddButtonClick = () => {
    //add straight to cart if soft drink, because there is no form
    if (itemInfo.category === "Soft Drinks") {
      
      let drinks = [];
      for (let i = 0; i < quantity; i++){
        drinks.push(itemInfo);
      }

      setShoppingCart(prev => ([...prev, ...drinks]));
      return;
    }

    //otherwise display form
    if (quantity > 0) {
      setActiveForm("block");
    }
  };

  const addToCart = (formData) => {

    //add item data, along with the form data, to shopping cart
    let cartItem = Object.assign(
      { ...itemInfo },
      formData
    );

    setShoppingCart(prev => ([...prev, cartItem]));
  };

  return (
    <section className="menu-item">
      <section className="flex-container">
        <div className="image-container">
          <img alt={itemInfo.item_name} src={itemInfo.img_path} />
        </div>
        <div className="item-info-container">
          <div className="price-container">
            <div className="price" style={{ fontWeight: 800 }}>
              ${itemInfo.item_price.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="final-section">
          <div className="item-name-container">
            <div className="item-name">{itemInfo.item_name}</div>
          </div>
          <QuantityCounter
            updateQuantity={updateQuantity}
            quantity={quantity}
          />
          <div className="button-container">
            <button className="add-to-cart-button" onClick={onAddButtonClick}>
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
          addToCart={addToCart}
          ingredients={ingredients}
        />
      </section>
    </section>
  );
};

export default MenuItem;
