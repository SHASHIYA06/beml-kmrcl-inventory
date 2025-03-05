import React, { useState, useEffect } from 'react';
import InventoryTable from './components/InventoryTable';
import RequestForm from './components/RequestForm';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SearchBar from './components/SearchBar';
import AddItemForm from './components/AddItemForm';
import RequestList from './components/RequestList';
import AcceptDenyForm from './components/AcceptDenyForm';
import ChartComponent from './components/ChartComponent';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="App">
      {user ? (
        <>
          <h1>BEML KMRCL Store Inventory</h1>
          <button onClick={handleLogout}>Logout</button>
          <Dashboard user={user} />
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
