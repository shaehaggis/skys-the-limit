import React from "react";
import CoffeeForm from "./CoffeeForm";
import FoodForm from "./FoodForm";

const MenuForm = ({ item, quantity, category, onCancel, computeForm }) => {
  const formType = () => {
    if (category === "BBQ" || category === "Burgers") {
      return (
        <FoodForm
          itemName={item}
          category={category}
          onCancel={onCancel}
          computeForm={computeForm}
          quantity={quantity}
        />
      );
    } else if (category === "Coffee") {
      return (
        <CoffeeForm
          quantity={quantity}
          itemName={item}
          onCancel={onCancel}
          computeForm={computeForm}
        />
      );
    } else {
      return [];
    }
  };

  return <div>{formType()}</div>;
};

export default MenuForm;
