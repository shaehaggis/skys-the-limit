import items from "../../data.json";
import React, { useContext } from "react";
import ItemsList from "../ItemsList";
import FoodDrinkNav from "../FoodDrinkNav";
import Footer from "../Footer";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";

const DrinksPage = () => {

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
          <FoodDrinkNav active="drink"/>
          <section>
            <ItemsList
              items={items.drink.Coffee}
              headerTitle="Coffee"
            />
            <ItemsList
              items={items.drink.SoftDrink}
              headerTitle="Soft Drinks"
            />
          </section>
        </div>
        <div style={{ display: shoppingCart.length > 0 ? "block" : "none" }}>
          <Footer/>
        </div>
    </main>
  );
};

export default DrinksPage;