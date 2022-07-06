import React, { useState } from "react";
import Form from "react-bootstrap/form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import items from "../data.json";

const FoodForm = ({ itemName, category, onCancel }) => {
  const findIndex = () => {
    return items.food[`${category}`].findIndex(
      (element) => element.name === itemName
    );
  };

  const initialiseState = (task) => {
    let ingredients =
      task === "add"
        ? items.ingredients
        : items.food[`${category}`][findIndex()].ingredients;
    let size = ingredients.length;
    let a = new Array(size);
    for (let i = 0; i < size; i++) {
      a[i] = {
        ingredient: `${ingredients[i].ingredient}`,
        price: `${ingredients[i].price}`,
        checked: false,
      };
    }

    return a;
  };

  const [added, setAdded] = useState(initialiseState("add"));
  const [removed, setRemoved] = useState(initialiseState("remove"));
  const [extraInfo, setExtraInfo] = useState("");

  const handleAdd = (position) => {
    const newState = added.map((item, index) => {
      if (index === position) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    setAdded(newState);
  };

  const handleRemove = (position) => {
    const newState = removed.map((item, index) => {
      if (index === position) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    setRemoved(newState);
  };

  const onCancelClick = () => {
    setAdded(initialiseState("add"));
    setRemoved(initialiseState("remove"));
    setExtraInfo("");
    onCancel();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log(added);
    console.log(removed);
  };

  const AllIngredients = items.ingredients.map(({ ingredient, price }, i) => {
    return (
      <Form.Check
        inline
        onChange={() => handleAdd(i)}
        checked={added[i].checked}
        key={i}
        type="checkbox"
        value={ingredient}
        label={`${ingredient} $${price}`}
        name={`add-ingredients-${itemName.replace(/\s+/g, "")}`}
      />
    );
  });

  const MyIngredients = items.food[`${category}`][findIndex()].ingredients.map(
    (item, i) => {
      return (
        <Form.Check
          inline
          onChange={() => handleRemove(i)}
          checked={removed[i].checked}
          key={i}
          type="checkbox"
          value={item.ingredient}
          label={`${item.ingredient} $${item.price}`}
          name={`remove-ingredients-${itemName.replace(/\s+/g, "")}`}
        />
      );
    }
  );

  return (
    <Form onSubmit={onFormSubmit}>
      <h2>Add Ingredients:</h2>
      <div className="mb-3">{AllIngredients}</div>
      <h2>Remove Ingredients</h2>
      <div className="mb-3">{MyIngredients}</div>
      <h2>Additional Comments:</h2>
      <Form.Control
        onChange={(e) => setExtraInfo(e.target.value)}
        as="textarea"
        rows={6}
      />
      <ButtonGroup>
        <Button
          onClick={() => onCancelClick()}
          className="me-3"
          variant="danger"
        >
          Cancel
        </Button>
        <Button className="me-3" type="submit" variant="dark">
          Confirm
        </Button>
      </ButtonGroup>
      <div>{extraInfo}</div>
    </Form>
  );
};

export default FoodForm;
