import "./styles.css";
import items from "./data.json";
import React, { useState, useEffect } from "react";
import ItemsList from "./components/ItemsList";
import FoodDrinkNav from "./components/FoodDrinkNav";
import Footer from "./components/Footer";
import ShoppingCart from "./components/ShoppingCart";

const App = () => {
  const [display, setDisplay] = useState({
    food: "block",
    drink: "none",
    footer: "none",
    cart: "none",
    menu: "block",
  });
  const [shoppingCart, setShoppingCart] = useState([]);
  const [cartInfo, setCartInfo] = useState({
    totalPrice: 0.0,
    totalQuantity: 0,
  });

  useEffect(() => {
    if (cartInfo.totalQuantity > 0 && display.cart !== "block") {
      setDisplay((display) => {
        return { ...display, footer: "block" };
      });
    } else {
      setDisplay((display) => {
        return { ...display, footer: "none" };
      });
    }
  }, [cartInfo.totalQuantity, display.cart]);

  const newCartItem = (formData) => {
    const itemPrice = cartInfo.totalPrice + parseFloat(formData.totalPrice);
    setShoppingCart((current) => [...current, formData]);
    const newQuantity = formData.hasOwnProperty("quantity")
      ? cartInfo.totalQuantity + formData.quantity
      : cartInfo.totalQuantity + 1;

    setCartInfo({
      ...cartInfo,
      totalPrice: itemPrice,
      totalQuantity: newQuantity,
    });
  };

  const removeCartItem = (index) => {
    const price = shoppingCart[index].totalPrice;
    const quantity = shoppingCart[index].hasOwnProperty("quantity")
      ? shoppingCart[index].quantity
      : 1;
    if (cartInfo.totalQuantity - quantity === 0) {
      setDisplay({ ...display, cart: "none", menu: "block" });
    }
    setShoppingCart(shoppingCart.filter((item, i) => i !== index));
    setCartInfo({
      ...cartInfo,
      totalPrice: cartInfo.totalPrice - price,
      totalQuantity: cartInfo.totalQuantity - quantity,
    });
  };

  const changeDisplayed = () => {
    if (display.food === "block") {
      setDisplay({ ...display, food: "none", drink: "block" });
    } else {
      setDisplay({ ...display, food: "block", drink: "none" });
    }
  };

  const toggleCart = () => {
    if (display.cart === "none") {
      setDisplay({
        ...display,
        cart: "block",
        menu: "none",
        footer: "none",
      });
    } else {
      setDisplay({
        ...display,
        cart: "none",
        menu: "block",
        footer: "block",
      });
    }
  };

  return (
    <main>
      {/* Logo */}
      <h1>My app</h1>
      <div style={{ display: display.menu }}>
        <section>
          <ItemsList
            items={items.MostPopularitems}
            headerTitle="Most Popular"
            newCartItem={newCartItem}
          />
        </section>
        <FoodDrinkNav changeDisplayed={changeDisplayed} />
        <section style={{ display: display["food"] }}>
          <ItemsList
            items={items.food.BBQ}
            headerTitle="BBQ"
            newCartItem={newCartItem}
          />
          <ItemsList
            items={items.food.Burgers}
            headerTitle="Burgers"
            newCartItem={newCartItem}
          />
        </section>
        <section style={{ display: display["drink"] }}>
          <ItemsList
            items={items.drink.Coffee}
            headerTitle="Coffee"
            newCartItem={newCartItem}
          />
          <ItemsList
            items={items.drink.SoftDrink}
            headerTitle="Soft Drinks"
            newCartItem={newCartItem}
          />
        </section>
      </div>
      <div style={{ display: display.footer }}>
        <Footer
          price={cartInfo.totalPrice.toFixed(2)}
          quantity={cartInfo.totalQuantity}
          toggleCart={toggleCart}
        />
      </div>
      <div style={{ display: display.cart }}>
        <ShoppingCart
          price={cartInfo.totalPrice.toFixed(2)}
          shoppingCart={shoppingCart}
          toggleCart={toggleCart}
          remove={removeCartItem}
        />
      </div>
    </main>
  );
};

export default App;
