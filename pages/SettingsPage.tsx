import React, { useState } from 'react';

interface SettingsPageProps {}

interface PlatformSettings {
  platformName: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  currency: string;
  language: string;
  timezone: string;
}

interface BookingSettings {
  advanceBookingDays: number;
  minStayNights: number;
  maxStayNights: number;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  autoConfirmBookings: boolean;
  requireDeposit: boolean;
  depositPercentage: number;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  newBookingAlert: boolean;
  cancellationAlert: boolean;
  paymentAlert: boolean;
  reviewAlert: boolean;
}

const SettingsPage: React.FC<SettingsPageProps> = () => {
  const [activeTab, setActiveTab] = useState<'platform' | 'booking' | 'notifications' | 'payment'>('platform');
  
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>({
    platformName: 'Discovery Homes',
    description: 'Curated Comforts for Your Journey',
    contactEmail: 'info@discoveryhomes.com',
    contactPhone: '+86 400-123-4567',
    address: '北京市朝阳区建国门外大街1号',
    currency: 'CNY',
    language: 'zh-CN',
    timezone: 'Asia/Shanghai'
  });

  const [bookingSettings, setBookingSettings] = useState<BookingSettings>({
    advanceBookingDays: 365,
    minStayNights: 1,
    maxStayNights: 30,
    checkInTime: '15:00',
    checkOutTime: '11:00',
    cancellationPolicy: 'flexible',
    autoConfirmBookings: true,
    requireDeposit: true,
    depositPercentage: 30
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    newBookingAlert: true,
    cancellationAlert: true,
    paymentAlert: true,
    reviewAlert: true
  });

  const handleSaveSettings = () => {
    // 这里应该调用API保存设置
    console.log('保存设置:', { platformSettings, bookingSettings, notificationSettings });
    alert('设置已保存！');
  };

  const tabs = [
    { id: 'platform', name: '平台设置', icon: '🏢' },
    { id: 'booking', name: '预订设置', icon: '📅' },
    { id: 'notifications', name: '通知设置', icon: '🔔' },
    { id: 'payment', name: '支付设置', icon: '💳' }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">系统设置</h1>
        <p className="text-gray-600">管理平台的各项配置和参数</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 侧边栏导航 */}
        <div className="lg:w-1/4">
          <nav className="bg-white rounded-lg shadow-md p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-admin-green text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-3 text-lg">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* 设置内容 */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-md">
            {/* 平台设置 */}
            {activeTab === 'platform' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">平台基本信息</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      平台名称
                    </label>
                    <input
                      type="text"
                      value={platformSettings.platformName}
                      onChange={(e) => setPlatformSettings({...platformSettings, platformName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      平台描述
                    </label>
                    <input
                      type="text"
                      value={platformSettings.description}
                      onChange={(e) => setPlatformSettings({...platformSettings, description: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      联系邮箱
                    </label>
                    <input
                      type="email"
                      value={platformSettings.contactEmail}
                      onChange={(e) => setPlatformSettings({...platformSettings, contactEmail: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      联系电话
                    </label>
                    <input
                      type="tel"
                      value={platformSettings.contactPhone}
                      onChange={(e) => setPlatformSettings({...platformSettings, contactPhone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      公司地址
                    </label>
                    <input
                      type="text"
                      value={platformSettings.address}
                      onChange={(e) => setPlatformSettings({...platformSettings, address: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      货币
                    </label>
                    <select
                      value={platformSettings.currency}
                      onChange={(e) => setPlatformSettings({...platformSettings, currency: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
                    >
                      <option value="CNY">人民币 (CNY)</option>
                      <option value="USD">美元 (USD)</option>
                      <option value="EUR">欧元 (EUR)</option>
                      <option value="JPY">日元 (JPY)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      时区
                    </label>
                    <select
                      value={platformSettings.timezone}
                      onChange={(e) => setPlatformSettings({...platformSettings, timezone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
                    >
                      <option value="Asia/Shanghai">北京时间 (UTC+8)</option>
                      <option value="America/New_York">纽约时间 (UTC-5)</option>
                      <option value="Europe/London">伦敦时间 (UTC+0)</option>
                      <option value="Asia/Tokyo">东京时间 (UTC+9)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 预订设置 */}
            {activeTab === 'booking' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">预订规则设置</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      提前预订天数
                    </label>
                    <input
                      type="number"
                      value={bookingSettings.advanceBookingDays}
                      onChange={(e) => setBookingSettings({...bookingSettings, advanceBookingDays: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      最少入住天数
                    </label>
                    <input
                      type="number"
                      value={bookingSettings.minStayNights}
                      onChange={(e) => setBookingSettings({...bookingSettings, minStayNights: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      最多入住天数
                    </label>
                    <input
                      type="number"
                      value={bookingSettings.maxStayNights}
                      onChange={(e) => setBookingSettings({...bookingSettings, maxStayNights: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      入住时间
                    </label>
                    <input
                      type="time"
                      value={bookingSettings.checkInTime}
                      onChange={(e) => setBookingSettings({...bookingSettings, checkInTime: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      退房时间
                    </label>
                    <input
                      type="time"
                      value={bookingSettings.checkOutTime}
                      onChange={(e) => setBookingSettings({...bookingSettings, checkOutTime: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      取消政策
                    </label>
                    <select
                      value={bookingSettings.cancellationPolicy}
                      onChange={(e) => setBookingSettings({...bookingSettings, cancellationPolicy: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
                    >
                      <option value="flexible">灵活取消</option>
                      <option value="moderate">中等取消</option>
                      <option value="strict">严格取消</option>
                      <option value="super_strict">超严格取消</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="auto-confirm"
                          type="checkbox"
                          checked={bookingSettings.autoConfirmBookings}
                          onChange={(e) => setBookingSettings({...bookingSettings, autoConfirmBookings: e.target.checked})}
                          className="h-4 w-4 text-admin-green focus:ring-admin-green border-gray-300 rounded"
                        />
                        <label htmlFor="auto-confirm" className="ml-2 block text-sm text-gray-700">
                          自动确认预订
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="require-deposit"
                          type="checkbox"
                          checked={bookingSettings.requireDeposit}
                          onChange={(e) => setBookingSettings({...bookingSettings, requireDeposit: e.target.checked})}
                          className="h-4 w-4 text-admin-green focus:ring-admin-green border-gray-300 rounded"
                        />
                        <label htmlFor="require-deposit" className="ml-2 block text-sm text-gray-700">
                          需要预付定金
                        </label>
                      </div>

                      {bookingSettings.requireDeposit && (
                        <div className="ml-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            定金比例 (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={bookingSettings.depositPercentage}
                            onChange={(e) => setBookingSettings({...bookingSettings, depositPercentage: parseInt(e.target.value)})}
                            className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 通知设置 */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">通知偏好设置</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">通知方式</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="email-notifications"
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                          className="h-4 w-4 text-admin-green focus:ring-admin-green border-gray-300 rounded"
                        />
                        <label htmlFor="email-notifications" className="ml-3 text-sm text-gray-700">
                          邮件通知
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="sms-notifications"
                          type="checkbox"
                          checked={notificationSettings.smsNotifications}
                          onChange={(e) => setNotificationSettings({...notificationSettings, smsNotifications: e.target.checked})}
                          className="h-4 w-4 text-admin-green focus:ring-admin-green border-gray-300 rounded"
                        />
                        <label htmlFor="sms-notifications" className="ml-3 text-sm text-gray-700">
                          短信通知
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">通知类型</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="new-booking-alert"
                          type="checkbox"
                          checked={notificationSettings.newBookingAlert}
                          onChange={(e) => setNotificationSettings({...notificationSettings, newBookingAlert: e.target.checked})}
                          className="h-4 w-4 text-admin-green focus:ring-admin-green border-gray-300 rounded"
                        />
                        <label htmlFor="new-booking-alert" className="ml-3 text-sm text-gray-700">
                          新预订提醒
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="cancellation-alert"
                          type="checkbox"
                          checked={notificationSettings.cancellationAlert}
                          onChange={(e) => setNotificationSettings({...notificationSettings, cancellationAlert: e.target.checked})}
                          className="h-4 w-4 text-admin-green focus:ring-admin-green border-gray-300 rounded"
                        />
                        <label htmlFor="cancellation-alert" className="ml-3 text-sm text-gray-700">
                          取消预订提醒
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="payment-alert"
                          type="checkbox"
                          checked={notificationSettings.paymentAlert}
                          onChange={(e) => setNotificationSettings({...notificationSettings, paymentAlert: e.target.checked})}
                          className="h-4 w-4 text-admin-green focus:ring-admin-green border-gray-300 rounded"
                        />
                        <label htmlFor="payment-alert" className="ml-3 text-sm text-gray-700">
                          支付提醒
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="review-alert"
                          type="checkbox"
                          checked={notificationSettings.reviewAlert}
                          onChange={(e) => setNotificationSettings({...notificationSettings, reviewAlert: e.target.checked})}
                          className="h-4 w-4 text-admin-green focus:ring-admin-green border-gray-300 rounded"
                        />
                        <label htmlFor="review-alert" className="ml-3 text-sm text-gray-700">
                          新评价提醒
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 支付设置 */}
            {activeTab === 'payment' && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">支付配置</h2>
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">
                          支付功能开发中
                        </h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>支付网关集成功能正在开发中，包括微信支付、支付宝、银行卡等支付方式。</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-700">支付方式</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg opacity-50">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center mr-3">
                              <span className="text-white text-xs font-bold">微</span>
                            </div>
                            <span className="text-gray-700">微信支付</span>
                          </div>
                          <span className="text-sm text-gray-500">即将开放</span>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg opacity-50">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center mr-3">
                              <span className="text-white text-xs font-bold">支</span>
                            </div>
                            <span className="text-gray-700">支付宝</span>
                          </div>
                          <span className="text-sm text-gray-500">即将开放</span>
                        </div>

                        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg opacity-50">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center mr-3">
                              <span className="text-white text-xs font-bold">银</span>
                            </div>
                            <span className="text-gray-700">银行卡</span>
                          </div>
                          <span className="text-sm text-gray-500">即将开放</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-700">费率设置</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            平台服务费 (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="20"
                            defaultValue="3"
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            支付手续费 (%)
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="5"
                            defaultValue="0.6"
                            disabled
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 保存按钮 */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleSaveSettings}
                className="px-6 py-2 bg-admin-green text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                保存设置
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;