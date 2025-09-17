import React, { useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { type Booking, type Property } from '../types';

interface StatsPageProps {
  bookings: Booking[];
  properties: Property[];
}

const StatsPage: React.FC<StatsPageProps> = ({ bookings, properties }) => {
  // Calculate monthly booking statistics
  const monthlyStats = useMemo(() => {
    const stats: { [key: string]: { bookings: number; revenue: number } } = {};
    
    bookings.forEach(booking => {
      const date = new Date(booking.checkIn);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!stats[monthKey]) {
        stats[monthKey] = { bookings: 0, revenue: 0 };
      }
      
      stats[monthKey].bookings += 1;
      stats[monthKey].revenue += booking.totalAmount;
    });
    
    return Object.entries(stats)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12) // Last 12 months
      .map(([month, data]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        bookings: data.bookings,
        revenue: data.revenue
      }));
  }, [bookings]);

  // Calculate property booking statistics
  const propertyStats = useMemo(() => {
    const stats: { [key: number]: { name: string; bookings: number; revenue: number } } = {};
    
    properties.forEach(property => {
      stats[property.id] = { name: property.name, bookings: 0, revenue: 0 };
    });
    
    bookings.forEach(booking => {
      if (stats[booking.propertyId]) {
        stats[booking.propertyId].bookings += 1;
        stats[booking.propertyId].revenue += booking.totalAmount;
      }
    });
    
    return Object.values(stats)
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 10); // Top 10 properties
  }, [bookings, properties]);

  // Calculate booking status distribution
  const statusDistribution = useMemo(() => {
    const distribution: { [key: string]: number } = {
      'Pending': 0,
      'Confirmed': 0,
      'Cancelled': 0,
      'Completed': 0
    };
    
    bookings.forEach(booking => {
      distribution[booking.status] = (distribution[booking.status] || 0) + 1;
    });
    
    return Object.entries(distribution).map(([status, count]) => ({
      name: status,
      value: count
    }));
  }, [bookings]);

  // Calculate key metrics
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const totalBookings = bookings.length;
  const averageBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;
  const occupancyRate = ((bookings.filter(b => b.status === 'Confirmed' || b.status === 'Completed').length / totalBookings) * 100) || 0;

  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Statistics & Analytics</h2>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">¥{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Bookings</h3>
          <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Average Booking Value</h3>
          <p className="text-2xl font-bold text-gray-900">¥{Math.round(averageBookingValue).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Occupancy Rate</h3>
          <p className="text-2xl font-bold text-gray-900">{occupancyRate.toFixed(1)}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Bookings Trend */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Booking Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bookings" stroke="#10b981" name="Bookings" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `¥${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Revenue (¥)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Properties by Bookings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Top Properties by Bookings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={propertyStats} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#10b981" name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Status Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Booking Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Property Performance Table */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Property Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Bookings</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg. Booking Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {propertyStats.map((property) => (
                <tr key={property.name} className="hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium">{property.name}</td>
                  <td className="p-3 text-sm">{property.bookings}</td>
                  <td className="p-3 text-sm">¥{property.revenue.toLocaleString()}</td>
                  <td className="p-3 text-sm">
                    ¥{property.bookings > 0 ? Math.round(property.revenue / property.bookings).toLocaleString() : 0}
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

export default StatsPage;