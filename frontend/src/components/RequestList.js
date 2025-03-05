import React, { useState, useEffect } from 'react';
import AcceptDenyForm from './AcceptDenyForm';

const RequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const response = await fetch('/api/requests');
    const data = await response.json();
    setRequests(data);
  };

  const handleUpdateRequest = async (id, formData) => {
    const response = await fetch(`/api/requests/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    fetchRequests();
  };

  return (
    <div>
      <h2>Request List</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Required Quantity</th>
            <th>Train Set Number</th>
            <th>Car Number</th>
            <th>NCR Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request[0]}</td>
              <td>{request[1]}</td>
              <td>{request[2]}</td>
              <td>{request[3]}</td>
              <td>{request[4]}</td>
              <td>{request[5]}</td>
              <td>
                <AcceptDenyForm
                  onRequestUpdate={(formData) => handleUpdateRequest(index + 1, formData)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestList;
