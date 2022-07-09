import React, { useState, useRef } from "react";
import CoffeeForm from "./CoffeeForm";
import FoodForm from "./FoodForm";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const MenuForm = ({ itemInfo, quantity, onCancel, computeTotal }) => {
  const foodRef = useRef(null);
  const coffeeRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [extraInfo, setExtraInfo] = useState("");

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
    let formData =
      foodRef.current !== null
        ? foodRef.current.triggerSubmit()
        : coffeeRef.current.triggerSubmit();

    formData = { ...formData, information: extraInfo };
    setExtraInfo("");
    computeTotal(formData);

    if (currentStep !== quantity) {
      setCurrentStep(currentStep + 1);
    } else {
      exitForm();
    }
  };

  const exitForm = () => {
    setCurrentStep(1);
    if (foodRef.current !== null) {
      foodRef.current.cancel();
    }
    if (coffeeRef.current !== null) {
      coffeeRef.current.cancel();
    }
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
