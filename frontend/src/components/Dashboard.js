import React, { useState, useEffect } from 'react';
import InventoryTable from './InventoryTable';
import RequestForm from './RequestForm';
import SearchBar from './SearchBar';
import RequestList from './RequestList';
import ChartComponent from './ChartComponent';

const Dashboard = ({ user }) => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInventory, setFilteredInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const response = await fetch('/api/inventory');
    const data = await response.json();
    setInventory(data);
    setFilteredInventory(data);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = inventory.filter((item) =>
      item.some((field) => field.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredInventory(filtered);
  };

  return (
    <div>
      <h2>{user.role === 'employee' ? 'Employee Dashboard' : 'Store Person Dashboard'}</h2>
      <SearchBar onSearch={handleSearch} />
      <InventoryTable inventory={filteredInventory} />
      {user.role === 'employee' ? (
        <RequestForm onSubmit={async (formData) => {
          const response = await fetch('/api/requests', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          console.log(data);
        }} />
      ) : (
        <RequestList />
      )}
      <ChartComponent inventory={inventory} />
    </div>
  );
};

export default Dashboard;
