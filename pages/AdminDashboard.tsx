import React, { useState } from 'react';
import AdminPage from './AdminPage';
import BookingsPage from './BookingsPage';
import StatsPage from './StatsPage';
import { type Property, type Booking } from '../types';

// Icons
const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;
const PropertyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;
const BookingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>;
const StatsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>;
const LeafIcon: React.FC<{className?: string}> = ({className}) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 14.24V19.95C16.16 19.44 18.5 16.94 18.95 13.8C16.95 14.18 14.65 14.47 13 14.24ZM11 4.05C11.96 5.67 12.31 7.89 11.75 9.8C10.74 9.4 8.5 8.92 7.05 7.05C8.06 5.56 9.45 4.5 11 4.05ZM6.05 8.05C7.92 9.5 10.15 10.22 11.25 10.76C10.69 12.67 10.96 15.05 12 16.43C9.95 15.86 7.5 14.18 5.05 12C5.56 10.55 5.56 9.06 6.05 8.05ZM12 11.53C14.28 12.03 16.57 12.24 18.29 11.95C17.93 8.35 15.65 5.35 12.43 4.25C13.82 6.05 13.97 8.95 12 11.53Z" fill="currentColor"/>
  </svg>
);

interface AdminDashboardProps {
  properties: Property[];
  bookings: Booking[];
  addProperty: (property: Omit<Property, 'id' | 'date' | 'status'>) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: number) => void;
  updateBooking: (booking: Booking) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  properties, 
  bookings,
  addProperty, 
  updateProperty, 
  deleteProperty,
  updateBooking 
}) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'properties':
        return (
          <AdminPage 
            properties={properties} 
            addProperty={addProperty}
            updateProperty={updateProperty}
            deleteProperty={deleteProperty}
          />
        );
      case 'bookings':
        return (
          <BookingsPage 
            bookings={bookings}
            properties={properties}
            updateBooking={updateBooking}
          />
        );
      case 'stats':
        return (
          <StatsPage 
            bookings={bookings}
            properties={properties}
          />
        );
      case 'dashboard':
      default:
        return <DashboardOverview properties={properties} bookings={bookings} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-admin-body font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-admin-dark text-gray-200 flex flex-col">
        <div className="p-6 flex items-center space-x-3 border-b border-gray-700">
          <LeafIcon className="text-white" />
          <div>
            <h1 className="text-lg font-bold text-white">Discovery Homes</h1>
            <p className="text-xs text-gray-400">Admin Dashboard</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              activeTab === 'dashboard' ? 'bg-admin-green-light text-admin-green' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <DashboardIcon /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('properties')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              activeTab === 'properties' ? 'bg-admin-green-light text-admin-green' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <PropertyIcon /> Properties
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              activeTab === 'bookings' ? 'bg-admin-green-light text-admin-green' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <BookingIcon /> Bookings
          </button>
          <button 
            onClick={() => setActiveTab('stats')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              activeTab === 'stats' ? 'bg-admin-green-light text-admin-green' : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <StatsIcon /> Statistics
          </button>
          <button 
            className="w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors"
          >
            <SettingsIcon /> Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Welcome, Admin</span>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>

        <footer className="text-center p-4 text-sm text-gray-500 border-t border-gray-200">
          © 2024 Discovery Homes | Contact Us: info@discoveryhomes.com
        </footer>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview: React.FC<{ properties: Property[]; bookings: Booking[] }> = ({ properties, bookings }) => {
  const activeProperties = properties.filter(p => p.status === 'Active').length;
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
  const totalRevenue = bookings
    .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
    .reduce((sum, b) => sum + b.totalAmount, 0);
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Properties</h3>
              <p className="text-3xl font-bold text-gray-900">{properties.length}</p>
              <p className="text-sm text-green-600 mt-1">{activeProperties} active</p>
            </div>
            <PropertyIcon />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Bookings</h3>
              <p className="text-3xl font-bold text-gray-900">{bookings.length}</p>
              <p className="text-sm text-yellow-600 mt-1">{pendingBookings} pending</p>
            </div>
            <BookingIcon />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
              <p className="text-3xl font-bold text-gray-900">¥{totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">This month</p>
            </div>
            <StatsIcon />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Occupancy Rate</h3>
              <p className="text-3xl font-bold text-gray-900">
                {bookings.length > 0 
                  ? ((bookings.filter(b => b.status === 'Confirmed' || b.status === 'Completed').length / bookings.length) * 100).toFixed(1)
                  : 0}%
              </p>
              <p className="text-sm text-blue-600 mt-1">Average</p>
            </div>
            <DashboardIcon />
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Check-in</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.guestName}</div>
                      <div className="text-sm text-gray-500">{booking.guestEmail}</div>
                    </div>
                  </td>
                  <td className="p-3 text-sm">{booking.propertyName}</td>
                  <td className="p-3 text-sm">{new Date(booking.checkIn).toLocaleDateString()}</td>
                  <td className="p-3 text-sm font-medium">¥{booking.totalAmount.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;