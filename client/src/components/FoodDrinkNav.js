import React, { useState } from "react";
import { Link } from 'react-router-dom';
 
const FoodDrinkNav = ({ changeDisplayed }) => {
  const [active, setActive] = useState("food-button");
  const [foodColor, setFoodColor] = useState({
    bgColor: "black",
    color: "white",
  });
  const [drinkColor, setDrinkColor] = useState({
    bgColor: "white",
    color: "grey",
  });

  const onButtonClick = (e) => {
    if (e.target.className !== active) {
      if (foodColor.bgColor === "white") {
        setFoodColor({
          bgColor: "black",
          color: "white",
        });
        setDrinkColor({
          bgColor: "white",
          color: "grey",
        });
      } else {
        setFoodColor({
          bgColor: "white",
          color: "grey",
        });
        setDrinkColor({
          bgColor: "black",
          color: "white",
        });
      }

      setActive(e.target.clasName);
      changeDisplayed();
    }
  };
  return (
    <div className="category-nav">
      <Link to="/food">
        {/* <button
        className="food-button"
        style={{ backgroundColor: foodColor.bgColor, color: foodColor.color }}
        onClick={(e) => onButtonClick(e)}
        > */}
        Food
        {/* </button> */}
      </Link>
      <Link to="/drink">
        {/* <button
          className="drink-button"
          style={{ backgroundColor: drinkColor.bgColor, color: drinkColor.color }}
          onClick={(e) => onButtonClick(e)}
        > */}
          Drink
        {/* </button> */}
      </Link>
    </div>
  );
};

export default FoodDrinkNav;
