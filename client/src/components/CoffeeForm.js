import React, { useState } from "react";
import Form from "react-bootstrap/form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import items from "../data.json";

const CoffeeForm = ({ itemName, onCancel }) => {
  const [selected, setSelected] = useState("Full Cream");
  const [extraInfo, setExtraInfo] = useState("");

  const MilkTypes = items["milk types"].map((type, index) => {
    return (
      <Form.Check
        onChange={(e) => setSelected(e.currentTarget.value)}
        checked={selected === type.name}
        inline
        key={index}
        label={type.name}
        value={type.name}
        name={`milk-type-${itemName.replace(/\s+/g, "")}`}
        type="radio"
      />
    );
  });

  const onCancelClick = () => {
    setSelected("Full Cream");
    onCancel();
  };

  return (
    <Form>
      <h2>Milk Type:</h2>
      <div className="mb-3">{MilkTypes}</div>
      <h2>Additional Comments:</h2>
      <Form.Control
        onChange={(e) => setExtraInfo(e.target.value)}
        as="textarea"
        rows={6}
        value={extraInfo}
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
    </Form>
  );
};

export default CoffeeForm;
