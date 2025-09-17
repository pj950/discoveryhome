
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import PropertyDetailPage from './pages/PropertyDetailPage';
import { type Property, type Booking } from './types';
import { MOCK_PROPERTIES, MOCK_BOOKINGS } from './constants';

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);

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

  const updateBooking = (updatedBooking: Booking) => {
    setBookings(prev => prev.map(b => b.id === updatedBooking.id ? updatedBooking : b));
  };

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage properties={properties} />} />
        <Route path="/property/:id" element={<PropertyDetailPage properties={properties} />} />
        <Route 
          path="/admin" 
          element={
            <AdminDashboard 
              properties={properties}
              bookings={bookings}
              addProperty={addProperty}
              updateProperty={updateProperty}
              deleteProperty={deleteProperty}
              updateBooking={updateBooking}
            />
          } 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;