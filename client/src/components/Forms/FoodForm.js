import React, { useState, forwardRef, useImperativeHandle } from "react";
import Form from "react-bootstrap/Form";
import items from "../../data.json";
import { filterObject } from "../../Functions/filterObject";

const FoodForm = forwardRef(
  ({ itemName, category }, ref) => {
    
    //find the location of the item in the items array
    const findIndex = () => {
      return items.food[category].findIndex(
        (element) => element.name === itemName
      );
    };

    const initialiseState = (task) => {

      //if these are the ingredients to add to an item, then get a list of ingredients
      //if these are the ingredients to remove from an item, then lookup the ingredients of the item
      let ingredients =
        task === "add"
          ? items.ingredients
          : items.food[category][findIndex()].ingredients;
      
      //map each ingredient to an object
      let ingredientsObject = ingredients.map((element) => {
        return (
          {
            ingredient: `${element.ingredient}`,
            price: `${element.price}`,
            checked: false,
          }
        )
      })

      return ingredientsObject;
    };

    const [formData, setFormData] = useState({
      added: initialiseState("add"),
      removed: initialiseState("remove"),
    });

    useImperativeHandle(ref, () => ({
      //submit the form to add to shopping cart
      triggerSubmit() {
        setFormData
        ({
          added: initialiseState("add"),
          removed: initialiseState("remove"),
        });
        return {
          added: filterObject(formData.added),
          removed: filterObject(formData.removed),
        };
      },

      //reset form on cancel
      cancel() {
        setFormData({
          added: initialiseState("add"),
          removed: initialiseState("remove"),
        });
      },
    }));

    // DESCRIPTION
    // returns an array of React bootstrap checkboxes using the ingredients found in data.json
    // INPUTS
    // arr = list of ingredients with price and name
    // stateArr = the array of state that tracks whether each ingredient is checked or unchecked. This can either be formData.added or formData.removed - 2 different arrays of ingredients.
    // task = can be either "added" or "removed"
    // OUTPUTS
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

    
    // DESCRIPTION
    // Updates the form data to reflect a checking or unchecking of an ingredient.
    // INPUTS
    // position = index of checkbox in array of checkboxes
    // arr = the array that corresponds to the state of the checkboxes. Will be either formData.added or formData.removed
    // task = add the new checkbox state to either "added" or "removed"
    const handleCheckBox = (position, arr, task) => {

      //will set the ingredient at index 'position' to checked. else return the existing ingredient object (which may be checked or unchecked).
      const newState = arr.map((item, index) => {
        if (index === position) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });

      if (task === "add") {
        setFormData({ ...formData, added: newState });
      } else {
        setFormData({ ...formData, removed: newState });
      }
    };

    //get the array of checkboxes for ingredients to add to item
    const AddIngredients = getIngredients(
      items.ingredients,
      formData.added,
      "add"
    );

    //get the array of checkboxes for ingredients to remove from an item
    const RemoveIngredients = getIngredients(
      items.food[category][findIndex()].ingredients,
      formData.removed,
      "remove"
    );

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
