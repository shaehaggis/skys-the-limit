import "./styles.css";
import items from "./data.json";
import React, { useState, useEffect } from "react";
import ItemsList from "./components/ItemsList";
import FoodDrinkNav from "./components/FoodDrinkNav";
import Footer from "./components/Footer";
import ShoppingCart from "./components/ShoppingCart";

const App = () => {
  const [displayed, setDisplayed] = useState({
    food: "block",
    drink: "none",
  });

  const [shoppingCart, setShoppingCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [displayFooter, setDisplayFooter] = useState("none");
  const [displayCart, setDisplayCart] = useState("none");
  const [displayMenu, setDisplayMenu] = useState("block");

  useEffect(() => {
    if (totalQuantity > 0) {
      setDisplayFooter("block");
    } else {
      setDisplayFooter("none");
    }
  }, [totalQuantity]);

  const newCartItem = (formData) => {
    console.log(formData);
    setShoppingCart((current) => [...current, formData]);
    setTotalPrice(parseFloat(totalPrice) + parseFloat(formData.totalPrice));
    setTotalQuantity(totalQuantity + 1);
  };

  const changeDisplayed = () => {
    if (displayed.food === "block") {
      setDisplayed({ food: "none", drink: "block" });
    } else {
      setDisplayed({ food: "block", drink: "none" });
    }
  };

  const toggleCart = () => {
    if (displayCart === "none") {
      setDisplayCart("block");
      setDisplayMenu("none");
      setDisplayFooter("none");
    } else {
      setDisplayCart("none");
      setDisplayMenu("block");
      setDisplayFooter("block");
    }
  };

  return (
    <main>
      {/* Logo */}
      <h1>My app</h1>
      <div style={{ display: displayMenu }}>
        <section>
          <ItemsList
            items={items.MostPopularitems}
            headerTitle="Most Popular"
            newCartItem={newCartItem}
          />
        </section>
        <FoodDrinkNav changeDisplayed={changeDisplayed} />
        <section style={{ display: displayed["food"] }}>
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
        <section style={{ display: displayed["drink"] }}>
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
      <div style={{ display: displayFooter }}>
        <Footer
          price={totalPrice.toFixed(2)}
          quantity={totalQuantity}
          toggleCart={toggleCart}
        />
      </div>
      <div style={{ display: displayCart }}>
        <ShoppingCart shoppingCart={shoppingCart} toggleCart={toggleCart} />
      </div>
    </main>
  );
};

export default App;
