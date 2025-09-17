import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { type Property, type Booking, type DashboardStats } from '../types';
import { MOCK_BOOKINGS } from '../constants';

interface DashboardPageProps {
  properties: Property[];
}

const COLORS = ['#48BB78', '#4299E1', '#ED8936', '#9F7AEA', '#38B2AC', '#ECC94B'];

const DashboardPage: React.FC<DashboardPageProps> = ({ properties }) => {
  // 计算统计数据
  const calculateStats = (): DashboardStats => {
    const totalProperties = properties.length;
    const totalBookings = MOCK_BOOKINGS.length;
    const totalRevenue = MOCK_BOOKINGS.reduce((sum, booking) => sum + booking.totalAmount, 0);
    const averageBookingValue = totalBookings > 0 ? totalRevenue / totalBookings : 0;

    // 按月统计
    const monthlyData: { [key: string]: { bookings: number; revenue: number; properties: Set<string> } } = {};
    
    MOCK_BOOKINGS.forEach(booking => {
      const month = booking.bookingDate.substring(0, 7); // YYYY-MM
      const property = properties.find(p => p.id === booking.propertyId);
      
      if (!monthlyData[month]) {
        monthlyData[month] = { bookings: 0, revenue: 0, properties: new Set() };
      }
      
      monthlyData[month].bookings += 1;
      monthlyData[month].revenue += booking.totalAmount;
      if (property) {
        monthlyData[month].properties.add(property.name);
      }
    });

    const monthlyStats = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      bookings: data.bookings,
      revenue: data.revenue,
      properties: Array.from(data.properties)
    })).sort((a, b) => a.month.localeCompare(b.month));

    return {
      totalProperties,
      totalBookings,
      totalRevenue,
      averageBookingValue,
      monthlyStats
    };
  };

  const stats = calculateStats();

  // 房型预订统计
  const propertyBookingStats = properties.map(property => {
    const bookings = MOCK_BOOKINGS.filter(b => b.propertyId === property.id);
    const revenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
    return {
      name: property.name,
      bookings: bookings.length,
      revenue,
      price: property.price
    };
  }).sort((a, b) => b.bookings - a.bookings);

  // 月度趋势数据
  const monthlyTrendData = stats.monthlyStats.map(stat => ({
    month: stat.month.substring(5), // MM
    bookings: stat.bookings,
    revenue: stat.revenue / 1000 // 转换为千元
  }));

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">数据统计仪表盘</h1>
        <p className="text-gray-600">民宿预订数据总览与分析</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">总房型数</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalProperties}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">总预订数</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalBookings}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">总收入</p>
              <p className="text-3xl font-bold text-gray-800">¥{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">平均订单价值</p>
              <p className="text-3xl font-bold text-gray-800">¥{Math.round(stats.averageBookingValue).toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 月度预订趋势 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">月度预订趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
              />
              <Line type="monotone" dataKey="bookings" stroke="#48BB78" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 月度收入趋势 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">月度收入趋势 (千元)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
                formatter={(value) => [`¥${(value as number * 1000).toLocaleString()}`, '收入']}
              />
              <Bar dataKey="revenue" fill="#4299E1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 房型统计 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 房型预订排行 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">房型预订排行</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={propertyBookingStats} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={100} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
              />
              <Bar dataKey="bookings" fill="#48BB78" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 房型收入分布 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">房型收入分布</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={propertyBookingStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name.substring(0, 8)}... ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="revenue"
              >
                {propertyBookingStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`¥${(value as number).toLocaleString()}`, '收入']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 详细统计表格 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">房型详细统计</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">房型名称</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">单价</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">预订次数</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">总收入</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">平均入住率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {propertyBookingStats.map((property, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{property.name}</td>
                  <td className="p-4 text-gray-600">¥{property.price}</td>
                  <td className="p-4 text-gray-600">{property.bookings}次</td>
                  <td className="p-4 text-gray-600">¥{property.revenue.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${Math.min((property.bookings / Math.max(...propertyBookingStats.map(p => p.bookings))) * 100, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {Math.round((property.bookings / Math.max(...propertyBookingStats.map(p => p.bookings))) * 100)}%
                      </span>
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

export default DashboardPage;