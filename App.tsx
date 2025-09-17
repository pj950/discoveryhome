
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import { type Property } from './types';
import { MOCK_PROPERTIES } from './constants';

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);

  const addProperty = (property: Omit<Property, 'id' | 'date' | 'status'>) => {
    const newProperty: Property = {
      ...property,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'Active',
    };
    setProperties(prev => [newProperty, ...prev]);
  };

  const updateProperty = (updatedProperty: Property) => {
    setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));
  };

  const deleteProperty = (id: number) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage properties={properties} />} />
        <Route 
          path="/admin" 
          element={
            <AdminPage 
              properties={properties} 
              addProperty={addProperty}
              updateProperty={updateProperty}
              deleteProperty={deleteProperty}
            />
          } 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;