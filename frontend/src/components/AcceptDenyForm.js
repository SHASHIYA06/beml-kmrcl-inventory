import React, { useState } from 'react';

const AcceptDenyForm = ({ onRequestUpdate }) => {
  const [formData, setFormData] = useState({
    status: '',
    healthySerials: '',
    faultySerials: '',
    reason: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRequestUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Status:
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="accepted">Accepted</option>
          <option value="denied">Denied</option>
        </select>
      </label>
      <label>
        Healthy Serials:
        <input
          type="text"
          name="healthySerials"
          value={formData.healthySerials}
          onChange={handleChange}
        />
      </label>
      <label>
        Faulty Serials:
        <input
          type="text"
          name="faultySerials"
          value={formData.faultySerials}
          onChange={handleChange}
        />
      </label>
      <label>
        Reason:
        <input
          type="text"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Request</button>
    </form>
  );
};

export default AcceptDenyForm;
