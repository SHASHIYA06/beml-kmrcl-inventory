import React, { useState } from 'react';

const RequestForm = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    requiredQuantity: '',
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
    const response = await fetch('/api/requests', {
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
        Required Quantity:
        <input
          type="number"
          name="requiredQuantity"
          value={formData.requiredQuantity}
          onChange={handleChange}
        />
      </label>
      <label>
        Train Set Number:
        <input
          type="text"
          name="trainSetNumber"
          value={formData.trainSetNumber}
          onChange={handleChange}
        />
      </label>
      <label>
        Car Number:
        <input
          type="text"
          name="carNumber"
          value={formData.carNumber}
          onChange={handleChange}
        />
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
      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestForm;
