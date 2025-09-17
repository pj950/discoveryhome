import React, { useState } from 'react';
import { type Booking, type Property } from '../types';

interface BookingsPageProps {
  bookings: Booking[];
  properties: Property[];
  updateBooking: (booking: Booking) => void;
}

const BookingsPage: React.FC<BookingsPageProps> = ({ bookings, properties, updateBooking }) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === 'All' || booking.status === filterStatus;
    const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (bookingId: number, newStatus: Booking['status']) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      updateBooking({ ...booking, status: newStatus });
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Bookings Management</h2>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by guest name, property, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-transparent"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Guest</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Check-in</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Check-out</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Guests</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="p-3 text-sm">#{booking.id}</td>
                  <td className="p-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.guestName}</div>
                      <div className="text-sm text-gray-500">{booking.guestEmail}</div>
                    </div>
                  </td>
                  <td className="p-3 text-sm">{booking.propertyName}</td>
                  <td className="p-3 text-sm">{new Date(booking.checkIn).toLocaleDateString()}</td>
                  <td className="p-3 text-sm">{new Date(booking.checkOut).toLocaleDateString()}</td>
                  <td className="p-3 text-sm">{booking.guests}</td>
                  <td className="p-3 text-sm font-medium">¥{booking.totalAmount}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      {booking.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'Confirmed')}
                            className="text-xs px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(booking.id, 'Cancelled')}
                            className="text-xs px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {booking.status === 'Confirmed' && (
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'Completed')}
                          className="text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Complete
                        </button>
                      )}
                    </div>
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

export default BookingsPage;