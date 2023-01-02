// import items from "../../data.json";
import React, { useContext } from "react";
import ItemsList from "../ItemsList";
import FoodDrinkNav from "../FoodDrinkNav";
import Footer from "../Footer";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";

const DrinksPage = ({ items }) => {

  const [shoppingCart, ] = useContext(ShoppingCartContext)

  const getCategories = () => {
    const categories = new Set(items[0].items
                              .filter((item) => item.type === 'drink')
                              .map((item) => item.category));
    return categories;
  }                         

  const renderedCategories = () => {
      const categories = getCategories();
      
      let renderedElements = [];
      categories.forEach((element, index) => {
        console.log(items[0]);
        const categoryItems = items[0].items.filter((el) => el.category === element);
        renderedElements.push(<ItemsList key={index} headerTitle={element.toUpperCase()} items={categoryItems} />)
      });
      
      return renderedElements;
  }

  return (items.length === 0) ? <>Loading...</> :

  (
    <main>
      {/* Logo */}
      <h1>My app</h1>
        <div>
          <section>
            <ItemsList
              items={items[2].mostPopular}
              headerTitle="Most Popular"
              ingredients={items[1].ingredients}
            />
          </section>
          <FoodDrinkNav active="drink"/>
          <section>
            {renderedCategories()}
          </section>
        </div>
        <div style={{ display: shoppingCart.length > 0 ? "block" : "none" }}>
          <Footer/>
        </div>
    </main>
  );
};

export default DrinksPage;