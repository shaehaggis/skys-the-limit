import React, { useState, forwardRef, useImperativeHandle } from "react";
import Form from "react-bootstrap/Form";

const milk_types = ["Full Cream", "Soy", "Lite", "Almond", "Oat", "Rice"];

const CoffeeForm = forwardRef(({ itemInfo }, ref) => {
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

  const MilkTypes = milk_types.map((type, index) => {
    return (
      <Form.Check
        onChange={(e) => setMilkType(e.currentTarget.value)}
        checked={milkType === type}
        inline
        key={index}
        label={type}
        value={type}
        name={`milk-type-${itemInfo.item_name.replace(/\s+/g, "")}`}
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
