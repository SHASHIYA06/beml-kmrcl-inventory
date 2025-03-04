import React from 'react';

const InventoryTable = ({ inventory }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Train Set Number</th>
          <th>Car Number</th>
          <th>NCR Number</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map((item, index) => (
          <tr key={index}>
            <td>{item[0]}</td>
            <td>{item[1]}</td>
            <td>{item[2]}</td>
            <td>{item[3]}</td>
            <td>{item[4]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
