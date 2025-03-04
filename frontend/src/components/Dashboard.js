import React, { useState, useEffect } from 'react';
import InventoryTable from './InventoryTable';
import RequestForm from './RequestForm';

const Dashboard = ({ user }) => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const response = await fetch('/api/inventory');
    const data = await response.json();
    setInventory(data);
  };

  return (
    <div>
      {user.role === 'employee' ? (
        <>
          <h2>Employee Dashboard</h2>
          <InventoryTable inventory={inventory} />
          <RequestForm />
        </>
      ) : (
        <>
          <h2>Store Person Dashboard</h2>
          <InventoryTable inventory={inventory} />
          {/* Add store person specific components here */}
        </>
      )}
    </div>
  );
};

export default Dashboard;
