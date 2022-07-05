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

  const initialiseAdd = () => {
    let size = items.ingredients.length;
    const a = new Array(size);
    for (let i = 0; i < size; i++) {
      a[i] = {
        ingredient: `${items.ingredients[i].ingredient}`,
        price: `${items.ingredients[i].price}`,
        checked: false,
      };
    }

    return a;
  };

  const [added, setAdded] = useState(initialiseAdd());

  const [removed, setRemoved] = useState(() => {
    return new Array(
      items.food[`${category}`][findIndex()].ingredients.length
    ).fill(false);
  });

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
      return index === position ? !item : item;
    });

    setRemoved(newState);
  };

  const onCancelClick = () => {
    setAdded(new Array(items.ingredients.length).fill(false));
    setRemoved(
      new Array(items.food[`${category}`][findIndex()].ingredients.length).fill(
        false
      )
    );
    setExtraInfo("");
    onCancel();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log(added);
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
    (ingredient, i) => {
      return (
        <Form.Check
          inline
          onChange={() => handleRemove(i)}
          checked={removed[i]}
          key={i}
          type="checkbox"
          value={ingredient}
          label={ingredient}
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
      {/* <div>{added}</div> */}
      <div>{removed}</div>
      <div>{extraInfo}</div>
    </Form>
  );
};

export default FoodForm;
