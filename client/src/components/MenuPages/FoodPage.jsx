import React, { useContext } from "react";
import ItemsList from "../ItemsList";
import FoodDrinkNav from "../FoodDrinkNav";
import Footer from "../Footer";
import { ShoppingCartContext } from "../../Context/ShoppingCartContext";

const FoodPage = ( { items } ) => {
  const [shoppingCart, ] = useContext(ShoppingCartContext)

  //get all the category names for food
  const getCategories = () => {
    const categories = new Set(items[0].items
                              .filter((item) => item.type === 'food')
                              .map((item) => item.category));
    return categories;
  }                         

  const renderedCategories = () => {
      const categories = getCategories();
      
      let renderedElements = [];
      categories.forEach((element, index) => {
        const categoryItems = items[0].items.filter((el) => el.category === element);
        renderedElements.push(<ItemsList key={index} headerTitle={element.toUpperCase()} items={categoryItems} ingredients={items[1].ingredients}/>)
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
          <FoodDrinkNav active="food"/>
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

export default FoodPage;