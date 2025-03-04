import React, { useState, useEffect } from 'react';
import InventoryTable from './components/InventoryTable';
import RequestForm from './components/RequestForm';

function App() {
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
    <div className="App">
      <h1>BEML KMRCL Store Inventory</h1>
      <InventoryTable inventory={inventory} />
      <RequestForm />
    </div>
  );
}

export default App;
