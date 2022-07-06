import React from "react";
import MenuItem from "./MenuItem";

const ItemsList = ({ headerTitle, items, newCartItem }) => {
  const renderedItems = items.map((item) => {
    return (
      <MenuItem
        key={item.id}
        itemName={item.name}
        imageSrc={item.imageSrc}
        price={item.price}
        category={headerTitle}
        newCartItem={newCartItem}
      />
    );
  });
  return (
    <section className="container">
      <h2>{headerTitle}</h2>
      {renderedItems}
    </section>
  );
};

export default ItemsList;