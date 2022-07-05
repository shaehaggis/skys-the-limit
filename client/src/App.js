import "./styles.css";
import items from "./data.json";
import React from "react";
import ItemsList from "./components/ItemsList";

const App = () => {
  return (
    <main>
      {/* Logo */}
      <h1>My app</h1>
      <section>
        <ItemsList items={items.MostPopularitems} headerTitle="Most Popular" />
      </section>
      {/* Tabs */}
      <section>
        <ItemsList items={items.food.BBQ} headerTitle="BBQ" />
        <ItemsList items={items.food.Burgers} headerTitle="Burgers" />
      </section>
      <section>
        <ItemsList items={items.drink.Coffee} headerTitle="Coffee" />
        <ItemsList items={items.drink.SoftDrink} headerTitle="Soft Drinks" />
      </section>
      {/* Shopping Cart */}
    </main>
  );
};

export default App;
