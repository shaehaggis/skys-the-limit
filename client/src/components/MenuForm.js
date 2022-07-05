import React from "react";
import CoffeeForm from "./CoffeeForm";
import FoodForm from "./FoodForm";

const MenuForm = ({ item, quantity, category, onCancel }) => {
  const formType = () => {
    if (category === "BBQ" || category === "Burgers") {
      return (
        <FoodForm itemName={item} category={category} onCancel={onCancel} />
      );
    } else if (category === "Coffee") {
      return <CoffeeForm itemName={item} onCancel={onCancel} />;
    } else {
      return [];
    }
  };

  return <div>{formType()}</div>;
};

export default MenuForm;
