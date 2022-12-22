import React, { useState, forwardRef, useImperativeHandle } from "react";
import Form from "react-bootstrap/Form";
import items from "../../data.json";

const CoffeeForm = forwardRef(({ itemName }, ref) => {
  const [milkType, setMilkType] = useState("Full Cream");

  useImperativeHandle(ref, () => ({
    //reset milk type to default
    triggerSubmit() {
      setMilkType("Full Cream");
      return { MilkType: milkType };
    },

    //reset milk type to default after cancelling
    cancel() {
      setMilkType("Full Cream");
    },
  }));

  const MilkTypes = items["milk types"].map((type, index) => {
    return (
      <Form.Check
        onChange={(e) => setMilkType(e.currentTarget.value)}
        checked={milkType === type.name}
        inline
        key={index}
        label={type.name}
        value={type.name}
        name={`milk-type-${itemName.replace(/\s+/g, "")}`}
        type="radio"
      />
    );
  });

  return (
    <div>
      <h2>Milk Type:</h2>
      <div className="mb-3">{MilkTypes}</div>
    </div>
  );
});

export default CoffeeForm;
