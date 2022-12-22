import items from "../../data.json";
import React, { useContext } from "react";
import ItemsList from "../ItemsList";
import FoodDrinkNav from "../FoodDrinkNav";
import Footer from "../Footer";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";

const FoodPage = () => {
  const [shoppingCart, ] = useContext(ShoppingCartContext)

  return (
    <main>
      {/* Logo */}
      <h1>My app</h1>
        <div>
          <section>
            <ItemsList
              items={items.MostPopularitems}
              headerTitle="Most Popular"
            />
          </section>
          <FoodDrinkNav active="food"/>
          <section>
            <ItemsList
              items={items.food.BBQ}
              headerTitle="BBQ"
              
            />
            <ItemsList
              items={items.food.Burgers}
              headerTitle="Burgers"
            />
          </section>
        </div>
        <div style={{ display: shoppingCart.length > 0 ? "block" : "none" }}>
          <Footer/>
        </div>
    </main>
  );
};

export default FoodPage;