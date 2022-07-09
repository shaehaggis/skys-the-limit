import React, { useState, forwardRef, useImperativeHandle } from "react";
import Form from "react-bootstrap/Form";
import items from "../data.json";

//removes unneccessary properties from object
const filterObject = (object) => {
  let filteredObject = object.filter((item) => item.checked);
  filteredObject.forEach((object) => {
    delete object["checked"];
  });

  return filteredObject;
};

const FoodForm = forwardRef(
  ({ itemName, category, formData, setFormData }, ref) => {
    const findIndex = () => {
      return items.food[category].findIndex(
        (element) => element.name === itemName
      );
    };

    const initialiseState = (task) => {
      let ingredients =
        task === "add"
          ? items.ingredients
          : items.food[category][findIndex()].ingredients;
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

    const [localData, setLocalData] = useState({
      added: initialiseState("add"),
      removed: initialiseState("remove"),
      information: "",
    });

    useImperativeHandle(ref, () => ({
      triggerSubmit() {
        setLocalData({
          added: initialiseState("add"),
          removed: initialiseState("remove"),
          information: "",
        });
        return {
          added: filterObject(localData.added),
          removed: filterObject(localData.removed),
        };
      },
      cancel() {
        setLocalData({
          added: initialiseState("add"),
          removed: initialiseState("remove"),
          information: "",
        });
      },
    }));

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
    const AddIngredients = getIngredients(
      items.ingredients,
      localData.added,
      "add"
    );
    const RemoveIngredients = getIngredients(
      items.food[category][findIndex()].ingredients,
      localData.removed,
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
        setLocalData({ ...localData, added: newState });
      } else {
        setLocalData({ ...localData, removed: newState });
      }
    };

    return (
      <div>
        <h2>Add Ingredients:</h2>
        <div className="mb-3">{AddIngredients}</div>
        <h2>Remove Ingredients</h2>
        <div className="mb-3">{RemoveIngredients}</div>
      </div>
    );
  }
);

export default FoodForm;
