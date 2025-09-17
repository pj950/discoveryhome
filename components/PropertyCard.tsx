
import React, { useState } from 'react';
import { type Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="break-inside-avoid">
        <div 
          className="bg-white rounded-2xl shadow-sm overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out cursor-pointer"
          onClick={() => setShowDetails(true)}
        >
          <img src={property.imageUrl} alt={property.name} className="w-full h-auto object-cover" />
          <div className="p-5">
            <h3 className="font-bold text-lg text-stone-800">{property.name}</h3>
            <p className="text-stone-500 mt-1">¥{property.price} / night</p>
            <p className="text-stone-400 text-sm mt-2">{property.location}</p>
            {property.amenities && property.amenities.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {property.amenities.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full">
                    {amenity}
                  </span>
                ))}
                {property.amenities.length > 3 && (
                  <span className="text-xs text-stone-500">+{property.amenities.length - 3} more</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 详情弹窗 */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowDetails(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <button
                onClick={() => setShowDetails(false)}
                className="absolute top-4 right-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 图片轮播 */}
              <div className="relative h-96 overflow-hidden rounded-t-2xl">
                <img 
                  src={property.imageUrl} 
                  alt={property.name} 
                  className="w-full h-full object-cover"
                />
                {property.gallery && property.gallery.length > 1 && (
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    1 / {property.gallery.length} 张照片
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* 左侧：基本信息 */}
                  <div className="lg:col-span-2">
                    <h1 className="text-3xl font-bold text-stone-800 mb-2">{property.name}</h1>
                    <p className="text-stone-600 mb-4">{property.address || property.location}</p>
                    
                    <div className="flex items-center mb-6">
                      <span className="text-3xl font-bold text-stone-800">¥{property.price}</span>
                      <span className="text-stone-500 ml-2">/ 晚</span>
                    </div>

                    {/* 设施 */}
                    {property.amenities && property.amenities.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-stone-800 mb-3">房间设施</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {property.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center text-stone-600">
                              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {amenity}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 图片画廊 */}
                    {property.gallery && property.gallery.length > 1 && (
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-stone-800 mb-3">更多照片</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {property.gallery.slice(1, 7).map((img, index) => (
                            <img 
                              key={index} 
                              src={img} 
                              alt={`${property.name} ${index + 2}`} 
                              className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            />
                          ))}
                          {property.gallery.length > 7 && (
                            <div className="w-full h-24 bg-stone-100 rounded-lg flex items-center justify-center text-stone-500">
                              +{property.gallery.length - 7} 张照片
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 右侧：预订卡片 */}
                  <div className="lg:col-span-1">
                    <div className="bg-stone-50 rounded-2xl p-6 sticky top-8">
                      <h3 className="text-lg font-semibold text-stone-800 mb-4">预订信息</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">入住日期</label>
                          <input 
                            type="date" 
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">退房日期</label>
                          <input 
                            type="date" 
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-stone-700 mb-2">客人数量</label>
                          <select className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                            <option>1 位客人</option>
                            <option>2 位客人</option>
                            <option>3 位客人</option>
                            <option>4 位客人</option>
                          </select>
                        </div>

                        <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                          立即预订
                        </button>

                        <div className="text-center text-sm text-stone-500">
                          暂不收费，稍后确认预订
                        </div>
                      </div>

                      <div className="border-t border-stone-200 mt-6 pt-4">
                        <div className="flex justify-between text-sm text-stone-600 mb-2">
                          <span>¥{property.price} × 1 晚</span>
                          <span>¥{property.price}</span>
                        </div>
                        <div className="flex justify-between text-sm text-stone-600 mb-2">
                          <span>服务费</span>
                          <span>¥{Math.round(property.price * 0.1)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-stone-800 border-t border-stone-200 pt-2">
                          <span>总计</span>
                          <span>¥{property.price + Math.round(property.price * 0.1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyCard;
