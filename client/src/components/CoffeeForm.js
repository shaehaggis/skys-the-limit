import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import items from "../data.json";

const CoffeeForm = ({ itemName, onCancel, quantity, computeForm }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    selected: "Full Cream",
    information: "",
  });

  const MilkTypes = items["milk types"].map((type, index) => {
    return (
      <Form.Check
        onChange={(e) =>
          setFormData({ ...formData, selected: e.currentTarget.value })
        }
        checked={formData.selected === type.name}
        inline
        key={index}
        label={type.name}
        value={type.name}
        name={`milk-type-${itemName.replace(/\s+/g, "")}`}
        type="radio"
      />
    );
  });

  const exitForm = () => {
    setFormData({
      selected: "Full Cream",
      information: "",
    });
    setCurrentStep(1);
    onCancel();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    computeForm(formData);

    if (currentStep !== quantity) {
      setCurrentStep(currentStep + 1);
      setFormData({
        selected: "Full Cream",
        information: "",
      });
    } else {
      exitForm();
    }
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <h2>Milk Type:</h2>
      <div className="mb-3">{MilkTypes}</div>
      <h2>Additional Comments:</h2>
      <Form.Control
        onChange={(e) =>
          setFormData({ ...formData, information: e.target.value })
        }
        as="textarea"
        rows={6}
        value={formData.information}
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

export default CoffeeForm;
