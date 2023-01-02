import React from "react";
import { Link } from 'react-router-dom';
 
const FoodDrinkNav = ({ active }) => {
  return (
    <div className="category-nav">
      <Link to="/food" style={{ minWidth: '30%' }}>
        <button
        className="food-button"
        style={{ backgroundColor: active === "food" ? 'black' : 'white', color: active === "food" ? 'white' : 'lightgrey' }}
        >
          Food
        </button>
      </Link>
      <Link to="/drink" style={{ minWidth: '30%' }}>
        <button
          className="drink-button"
          style={{ backgroundColor: active === "food" ? 'white' : 'black', color: active === "food" ? 'lightgrey' : 'white' }}
        >
          Drink
        </button>
      </Link>
    </div>
  );
};

export default FoodDrinkNav;
