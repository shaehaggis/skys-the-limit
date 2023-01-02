import React from "react";
import MenuItem from "./MenuItem";

const ItemsList = ({ headerTitle, items, ingredients }) => {
  const renderedItems = items.map((item, index) => {
    return <MenuItem key={index} itemInfo={item} ingredients={ingredients}/>;
  });
  
  return (
    <section className="container">
      <h2>{headerTitle}</h2>
      {renderedItems}
    </section>
  );
};

export default ItemsList;
