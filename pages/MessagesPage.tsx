import React, { useState } from 'react';
import { type Property } from '../types';

interface Message {
  id: number;
  guestName: string;
  avatar: string;
  subject: string;
  preview: string;
  content: string;
  timestamp: string;
  status: 'unread' | 'read' | 'replied';
  propertyId?: number;
  type: 'inquiry' | 'booking' | 'complaint' | 'compliment';
}

interface MessagesPageProps {
  properties: Property[];
}

const MOCK_MESSAGES: Message[] = [
  {
    id: 1,
    guestName: '张三',
    avatar: 'Z',
    subject: '关于Forest View Suite的预订咨询',
    preview: '您好，我想了解一下这个房型的具体设施...',
    content: '您好，我想了解一下Forest View Suite的具体设施，是否包含厨房设备？另外想确认一下停车位的情况，我们一家四口出行，需要确保有足够的空间。期待您的回复。',
    timestamp: '2024-09-17 10:30',
    status: 'unread',
    propertyId: 1,
    type: 'inquiry'
  },
  {
    id: 2,
    guestName: '李四',
    avatar: 'L',
    subject: '预订确认 - Urban Loft Retreat',
    preview: '感谢您的预订确认，我有几个问题想要咨询...',
    content: '感谢您的预订确认，我有几个问题想要咨询：1. 入住时间是否可以提前到下午2点？2. 是否提供接机服务？3. 附近有什么推荐的餐厅吗？谢谢！',
    timestamp: '2024-09-17 09:15',
    status: 'read',
    propertyId: 3,
    type: 'booking'
  },
  {
    id: 3,
    guestName: '王五',
    avatar: 'W',
    subject: '投诉 - 房间清洁问题',
    preview: '我对昨天入住的房间清洁状况不太满意...',
    content: '我对昨天入住的Boho Green Oasis房间清洁状况不太满意，浴室有头发残留，床单似乎没有更换。希望能够得到妥善处理，谢谢。',
    timestamp: '2024-09-16 20:45',
    status: 'replied',
    propertyId: 2,
    type: 'complaint'
  },
  {
    id: 4,
    guestName: '赵六',
    avatar: 'Z',
    subject: '非常满意的入住体验',
    preview: '刚刚从Mountain Cabin Charm退房，想要表达感谢...',
    content: '刚刚从Mountain Cabin Charm退房，想要表达感谢。房间非常温馨，设施齐全，特别是热水浴缸让人印象深刻。房东也很贴心，提供了很多当地旅游建议。下次还会选择这里！',
    timestamp: '2024-09-16 14:20',
    status: 'read',
    propertyId: 4,
    type: 'compliment'
  },
  {
    id: 5,
    guestName: '陈七',
    avatar: 'C',
    subject: '取消预订申请',
    preview: '由于行程变更，需要取消原定的预订...',
    content: '由于行程变更，需要取消原定的Ocean Breeze Studio预订（预订号：#5）。请问取消政策是怎样的？是否可以退款？如有手续费，请告知具体金额。谢谢配合。',
    timestamp: '2024-09-16 11:30',
    status: 'unread',
    propertyId: 5,
    type: 'booking'
  },
  {
    id: 6,
    guestName: '刘八',
    avatar: 'L',
    subject: '设施使用咨询',
    preview: '请问Sunny Garden Apt的厨房设备使用说明...',
    content: '请问Sunny Garden Apt的厨房设备使用说明在哪里？另外洗衣机的使用方法能否详细说明一下？还有就是垃圾分类的要求是什么？谢谢！',
    timestamp: '2024-09-15 16:45',
    status: 'read',
    propertyId: 6,
    type: 'inquiry'
  }
];

const MessagesPage: React.FC<MessagesPageProps> = ({ properties }) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'inquiry' | 'booking' | 'complaint' | 'compliment'>('all');
  const [replyText, setReplyText] = useState('');

  const filteredMessages = MOCK_MESSAGES.filter(message => {
    if (filter !== 'all' && message.status !== filter) return false;
    if (typeFilter !== 'all' && message.type !== typeFilter) return false;
    return true;
  });

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'inquiry': return 'bg-blue-100 text-blue-800';
      case 'booking': return 'bg-green-100 text-green-800';
      case 'complaint': return 'bg-red-100 text-red-800';
      case 'compliment': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMessageTypeName = (type: string) => {
    switch (type) {
      case 'inquiry': return '咨询';
      case 'booking': return '预订';
      case 'complaint': return '投诉';
      case 'compliment': return '好评';
      default: return '其他';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'bg-red-500';
      case 'read': return 'bg-yellow-500';
      case 'replied': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusName = (status: string) => {
    switch (status) {
      case 'unread': return '未读';
      case 'read': return '已读';
      case 'replied': return '已回复';
      default: return '未知';
    }
  };

  const handleSendReply = () => {
    if (replyText.trim() && selectedMessage) {
      // 这里应该调用API发送回复
      console.log('发送回复:', replyText);
      setReplyText('');
      // 更新消息状态为已回复
      selectedMessage.status = 'replied';
    }
  };

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)]">
        {/* 消息列表 */}
        <div className="lg:w-1/3 bg-white rounded-lg shadow-md flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">客户消息</h2>
            
            {/* 筛选器 */}
            <div className="space-y-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-admin-green focus:border-admin-green"
              >
                <option value="all">所有状态</option>
                <option value="unread">未读</option>
                <option value="read">已读</option>
                <option value="replied">已回复</option>
              </select>
              
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-admin-green focus:border-admin-green"
              >
                <option value="all">所有类型</option>
                <option value="inquiry">咨询</option>
                <option value="booking">预订</option>
                <option value="complaint">投诉</option>
                <option value="compliment">好评</option>
              </select>
            </div>
          </div>

          {/* 消息列表 */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((message) => {
              const property = properties.find(p => p.id === message.propertyId);
              return (
                <div
                  key={message.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedMessage?.id === message.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-admin-green rounded-full flex items-center justify-center text-white font-semibold">
                        {message.avatar}
                      </div>
                      <div className={`absolute -top-1 -right-1 w-4 h-4 ${getStatusColor(message.status)} rounded-full border-2 border-white`}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-800 truncate">{message.guestName}</h3>
                        <span className="text-xs text-gray-500">{message.timestamp.substring(5)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMessageTypeColor(message.type)}`}>
                          {getMessageTypeName(message.type)}
                        </span>
                        {property && (
                          <span className="text-xs text-gray-500 truncate">
                            {property.name}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm font-medium text-gray-800 mb-1 truncate">{message.subject}</p>
                      <p className="text-sm text-gray-600 truncate">{message.preview}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 消息详情 */}
        <div className="lg:w-2/3 bg-white rounded-lg shadow-md flex flex-col">
          {selectedMessage ? (
            <>
              {/* 消息头部 */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-admin-green rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {selectedMessage.avatar}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{selectedMessage.guestName}</h2>
                      <p className="text-sm text-gray-600">{selectedMessage.timestamp}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getMessageTypeColor(selectedMessage.type)}`}>
                      {getMessageTypeName(selectedMessage.type)}
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      selectedMessage.status === 'unread' ? 'bg-red-100 text-red-800' :
                      selectedMessage.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {getStatusName(selectedMessage.status)}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800">{selectedMessage.subject}</h3>
                {selectedMessage.propertyId && (
                  <p className="text-sm text-gray-600 mt-1">
                    相关房型: {properties.find(p => p.id === selectedMessage.propertyId)?.name}
                  </p>
                )}
              </div>

              {/* 消息内容 */}
              <div className="flex-1 p-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-gray-800 leading-relaxed">{selectedMessage.content}</p>
                </div>

                {/* 快速回复模板 */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">快速回复模板:</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setReplyText('感谢您的咨询，我们会尽快为您详细解答。')}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                    >
                      感谢咨询
                    </button>
                    <button
                      onClick={() => setReplyText('您的预订已确认，我们期待您的到来。')}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                    >
                      预订确认
                    </button>
                    <button
                      onClick={() => setReplyText('对于给您带来的不便，我们深表歉意，将立即处理此问题。')}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                    >
                      道歉处理
                    </button>
                    <button
                      onClick={() => setReplyText('非常感谢您的好评，我们会继续努力提供优质服务。')}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
                    >
                      感谢好评
                    </button>
                  </div>
                </div>
              </div>

              {/* 回复区域 */}
              <div className="p-6 border-t border-gray-200">
                <div className="space-y-4">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="输入回复内容..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-admin-green focus:border-admin-green resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </button>
                      <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setReplyText('')}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                      >
                        清空
                      </button>
                      <button
                        onClick={handleSendReply}
                        disabled={!replyText.trim()}
                        className="px-6 py-2 bg-admin-green text-white rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        发送回复
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-500 mb-2">选择一条消息</h3>
                <p className="text-gray-400">点击左侧消息列表查看详情</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;