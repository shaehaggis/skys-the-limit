import React from "react";
import MenuItem from "./MenuItem";

const ItemsList = ({ headerTitle, items, newCartItem }) => {
  const renderedItems = items.map((item, index) => {
    let category = headerTitle;
    if (headerTitle === "Most Popular") {
      category = item.name === "Flat White" ? "Coffee" : "BBQ";
    }

    const itemInfo = {
      itemName: item.name,
      imageSrc: item.imageSrc,
      price: item.price,
      category: category,
    };
    // return (
    //   <MenuItem
    //     key={item.id}
    //     itemName={item.name}
    //     imageSrc={item.imageSrc}
    //     price={item.price}
    //     category={category}
    //     newCartItem={newCartItem}
    //   />
    // );
    return (
      <MenuItem key={index} itemInfo={itemInfo} newCartItem={newCartItem} />
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
