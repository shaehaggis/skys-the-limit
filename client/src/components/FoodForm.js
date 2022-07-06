import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import items from "../data.json";

//removes unneccessary properties from object
const filterObject = (object) => {
  let filteredObject = object.filter((item) => item.checked);
  filteredObject.forEach((object) => {
    delete object["checked"];
  });

  return filteredObject;
};

const FoodForm = ({ itemName, category, quantity, onCancel, computeForm }) => {
  const findIndex = () => {
    return items.food[`${category}`].findIndex(
      (element) => element.name === itemName
    );
  };

  //initialise checkbox state for ingredients
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

  const [currentStep, setCurrentStep] = useState(1);
  const [added, setAdded] = useState(initialiseState("add"));
  const [removed, setRemoved] = useState(initialiseState("remove"));
  const [extraInfo, setExtraInfo] = useState("");

  //get ingredients for add and remove
  const getIngredients = (arr, stateArr, task) => {
    const ingredients = arr.map(({ ingredient, price }, i) => {
      return (
        <Form.Check
          inline
          onChange={() => handleCheckBox(i, stateArr, task)}
          checked={stateArr[i].checked}
          key={i}
          type="checkbox"
          value={ingredient}
          label={`${ingredient} $${price}`}
          name={`${task}-ingredients-${itemName.replace(/\s+/g, "")}`}
        />
      );
    });

    return ingredients;
  };

  //get ingredients for add and remove
  const AddIngredients = getIngredients(items.ingredients, added, "add");
  const RemoveIngredients = getIngredients(
    items.food[`${category}`][findIndex()].ingredients,
    removed,
    "remove"
  );

  //controls checkbox state
  const handleCheckBox = (position, arr, task) => {
    const newState = arr.map((item, index) => {
      if (index === position) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    if (task === "add") {
      setAdded(newState);
    } else {
      setRemoved(newState);
    }
  };

  //when cancel button is clicked
  const exitForm = () => {
    setAdded(initialiseState("add"));
    setRemoved(initialiseState("remove"));
    setExtraInfo("");
    setCurrentStep(1);
    onCancel();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      added: filterObject(added),
      removed: filterObject(removed),
      information: extraInfo,
    };
    computeForm(formData);

    if (currentStep !== quantity) {
      setCurrentStep(currentStep + 1);
      setAdded(initialiseState("add"));
      setRemoved(initialiseState("remove"));
      setExtraInfo("");
    } else {
      exitForm();
    }
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <h2>Add Ingredients:</h2>
      <div className="mb-3">{AddIngredients}</div>
      <h2>Remove Ingredients</h2>
      <div className="mb-3">{RemoveIngredients}</div>
      <h2>Additional Comments:</h2>
      <Form.Control
        onChange={(e) => setExtraInfo(e.target.value)}
        as="textarea"
        rows={6}
      />
      <ButtonGroup>
        <Button onClick={() => exitForm()} className="me-3" variant="danger">
          Cancel
        </Button>
        <Button className="me-3" type="submit" variant="dark">
          Confirm
        </Button>
      </ButtonGroup>
    </Form>
  );
};

export default FoodForm;
