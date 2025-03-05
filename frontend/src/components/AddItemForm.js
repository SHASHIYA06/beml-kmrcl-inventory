import React, { useState } from 'react';

const AddItemForm = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    trainSetNumber: '',
    carNumber: '',
    ncrNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input
          type="text"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />
      </label>
      <label>
        Train Set Number:
        <select
          name="trainSetNumber"
          value={formData.trainSetNumber}
          onChange={handleChange}
        >
          <option value="TS01">TS01</option>
          <option value="TS02">TS02</option>
          {/* Add more options as needed */}
        </select>
      </label>
      <label>
        Car Number:
        <select
          name="carNumber"
          value={formData.carNumber}
          onChange={handleChange}
        >
          <option value="DMC1">DMC1</option>
          <option value="TC1">TC1</option>
          <option value="MC1">MC1</option>
          <option value="MC2">MC2</option>
          <option value="TC2">TC2</option>
          <option value="DMC2">DMC2</option>
        </select>
      </label>
      <label>
        NCR Number:
        <input
          type="text"
          name="ncrNumber"
          value={formData.ncrNumber}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
