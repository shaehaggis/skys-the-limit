import React, { useState, useRef } from "react";
import CoffeeForm from "./CoffeeForm";
import FoodForm from "./FoodForm";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const MenuForm = ({ itemInfo, quantity, onCancel, addToCart }) => {
  
  //refs to trigger form submission
  const foodRef = useRef(null);
  const coffeeRef = useRef(null);

  //the item number being processed
  //starts at item #1 and resets once item #quantity has been confirmed
  const [currentStep, setCurrentStep] = useState(1);
  
  //any additional comments user wants to make about their order
  const [extraInfo, setExtraInfo] = useState("");

  //which form to render for the item?
  const formType = () => {
    if (itemInfo.category === "BBQ" || itemInfo.category === "Burgers") {
      return (
        <FoodForm
          itemName={itemInfo.itemName}
          category={itemInfo.category}
          ref={foodRef}
        />
      );
    } else if (itemInfo.category === "Coffee") {
      return <CoffeeForm itemName={itemInfo.itemName} ref={coffeeRef} />;
    } else {
      return "";
    }
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    //obtain milk type selected by user (forward ref in <CoffeeForm />)
    let formData =
      foodRef.current !== null
        ? foodRef.current.triggerSubmit()
        : coffeeRef.current.triggerSubmit();

    // add extra info, if any to the formData
    formData = { ...formData, information: extraInfo };

    //reset extra info in form
    setExtraInfo("");

    addToCart(formData);

    //continue to show form if there are more items to process
    if (currentStep !== quantity) {
      setCurrentStep(currentStep + 1);
    } else {
      exitForm();
    }
  };

  //when cancel button is clicked
  const exitForm = () => {
    setCurrentStep(1);

    //resets formData to default
    if (foodRef.current !== null) {
      foodRef.current.cancel();
    }

    //reset formData to default
    if (coffeeRef.current !== null) {
      coffeeRef.current.cancel();
    }

    //hides form
    onCancel();
  };

  return (
    <div>
      <Form onSubmit={onFormSubmit}>
        <h3>Please fill in the form below for each item added</h3>
        <h3>
          Current Item: {currentStep}/{quantity}
        </h3>
        {formType()}
        <h2>Additional Comments:</h2>
        <Form.Control
          onChange={(e) => setExtraInfo(e.target.value)}
          as="textarea"
          rows={6}
          value={extraInfo}
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
    </div>
  );
};

export default MenuForm;
