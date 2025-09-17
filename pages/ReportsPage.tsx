import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { type Property, type Booking } from '../types';
import { MOCK_BOOKINGS } from '../constants';

interface ReportsPageProps {
  properties: Property[];
}

const ReportsPage: React.FC<ReportsPageProps> = ({ properties }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedProperty, setSelectedProperty] = useState<number | 'all'>('all');

  // 过滤数据
  const getFilteredData = () => {
    const now = new Date();
    const timeRanges = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '1y': 365
    };
    
    const daysBack = timeRanges[selectedTimeRange];
    const cutoffDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
    
    let filteredBookings = MOCK_BOOKINGS.filter(booking => 
      new Date(booking.bookingDate) >= cutoffDate
    );

    if (selectedProperty !== 'all') {
      filteredBookings = filteredBookings.filter(booking => 
        booking.propertyId === selectedProperty
      );
    }

    return filteredBookings;
  };

  const filteredBookings = getFilteredData();

  // 按日期统计
  const getDailyStats = () => {
    const dailyData: { [key: string]: { bookings: number; revenue: number } } = {};
    
    filteredBookings.forEach(booking => {
      const date = booking.bookingDate;
      if (!dailyData[date]) {
        dailyData[date] = { bookings: 0, revenue: 0 };
      }
      dailyData[date].bookings += 1;
      dailyData[date].revenue += booking.totalAmount;
    });

    return Object.entries(dailyData)
      .map(([date, data]) => ({
        date,
        bookings: data.bookings,
        revenue: data.revenue
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  // 状态统计
  const getStatusStats = () => {
    const statusCount = filteredBookings.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(statusCount).map(([status, count]) => ({
      status: status === 'confirmed' ? '已确认' : status === 'pending' ? '待确认' : '已取消',
      count,
      percentage: ((count / filteredBookings.length) * 100).toFixed(1)
    }));
  };

  // 客户统计
  const getGuestStats = () => {
    const guestBookings = filteredBookings.reduce((acc, booking) => {
      acc[booking.guestName] = (acc[booking.guestName] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(guestBookings)
      .map(([guest, count]) => ({ guest, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // 取前10名
  };

  const dailyStats = getDailyStats();
  const statusStats = getStatusStats();
  const guestStats = getGuestStats();

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">数据报告</h1>
          <p className="text-gray-600">详细的预订数据分析与报告</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-4">
          {/* 时间范围选择 */}
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
          >
            <option value="7d">最近7天</option>
            <option value="30d">最近30天</option>
            <option value="90d">最近90天</option>
            <option value="1y">最近1年</option>
          </select>

          {/* 房型选择 */}
          <select
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
          >
            <option value="all">所有房型</option>
            {properties.map(property => (
              <option key={property.id} value={property.id}>{property.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-2">总预订数</h3>
          <p className="text-3xl font-bold text-gray-800">{filteredBookings.length}</p>
          <p className="text-sm text-green-600 mt-1">
            +{Math.round(Math.random() * 20 + 5)}% 较上期
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-2">总收入</h3>
          <p className="text-3xl font-bold text-gray-800">
            ¥{filteredBookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}
          </p>
          <p className="text-sm text-green-600 mt-1">
            +{Math.round(Math.random() * 15 + 8)}% 较上期
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-2">平均订单价值</h3>
          <p className="text-3xl font-bold text-gray-800">
            ¥{filteredBookings.length > 0 ? Math.round(filteredBookings.reduce((sum, b) => sum + b.totalAmount, 0) / filteredBookings.length).toLocaleString() : 0}
          </p>
          <p className="text-sm text-blue-600 mt-1">
            +{Math.round(Math.random() * 10 + 2)}% 较上期
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-600 mb-2">确认率</h3>
          <p className="text-3xl font-bold text-gray-800">
            {filteredBookings.length > 0 ? 
              Math.round((filteredBookings.filter(b => b.status === 'confirmed').length / filteredBookings.length) * 100) : 0}%
          </p>
          <p className="text-sm text-green-600 mt-1">
            +{Math.round(Math.random() * 5 + 1)}% 较上期
          </p>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 预订趋势 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">预订趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => value.substring(5)} // 只显示月-日
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
                labelFormatter={(value) => `日期: ${value}`}
              />
              <Line 
                type="monotone" 
                dataKey="bookings" 
                stroke="#48BB78" 
                strokeWidth={2}
                dot={{ r: 4 }}
                name="预订数"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 收入趋势 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">收入趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => value.substring(5)} // 只显示月-日
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
                labelFormatter={(value) => `日期: ${value}`}
                formatter={(value) => [`¥${(value as number).toLocaleString()}`, '收入']}
              />
              <Bar dataKey="revenue" fill="#4299E1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 详细统计 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 预订状态统计 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">预订状态分布</h3>
          <div className="space-y-4">
            {statusStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-3 ${
                    stat.status === '已确认' ? 'bg-green-500' : 
                    stat.status === '待确认' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="font-medium text-gray-700">{stat.status}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-800">{stat.count}</span>
                  <span className="text-sm text-gray-500 ml-2">({stat.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 热门客户 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">热门客户 (预订次数)</h3>
          <div className="space-y-3">
            {guestStats.map((guest, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-gray-600">
                      {guest.guest.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-gray-700">{guest.guest}</span>
                </div>
                <span className="font-bold text-admin-green">{guest.count}次</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 预订明细表格 */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">预订明细</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">预订ID</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">客户姓名</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">房型</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">入住日期</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">退房日期</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">金额</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">状态</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600">预订时间</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking) => {
                const property = properties.find(p => p.id === booking.propertyId);
                return (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="p-4 text-gray-600">#{booking.id}</td>
                    <td className="p-4 font-medium text-gray-800">{booking.guestName}</td>
                    <td className="p-4 text-gray-600">{property?.name || '未知房型'}</td>
                    <td className="p-4 text-gray-600">{booking.checkIn}</td>
                    <td className="p-4 text-gray-600">{booking.checkOut}</td>
                    <td className="p-4 font-medium text-gray-800">¥{booking.totalAmount.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status === 'confirmed' ? '已确认' : 
                         booking.status === 'pending' ? '待确认' : '已取消'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{booking.bookingDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;