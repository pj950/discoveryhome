import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { type Property } from '../types';

interface PropertyDetailPageProps {
  properties: Property[];
}

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ properties }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === Number(id));

  if (!property) {
    return (
      <div className="min-h-screen bg-brand-gray text-stone-800 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Header />
          <main className="py-10">
            <div className="bg-white rounded-3xl shadow-sm p-8 sm:p-12 text-center">
              <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
              <button 
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-brand-green text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-gray text-stone-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <main className="py-10">
          <div className="bg-white rounded-3xl shadow-sm p-8 sm:p-12">
            {/* Gallery Section */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="md:col-span-1">
                  <img 
                    src={property.imageUrl} 
                    alt={property.name} 
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {property.gallery.slice(1, 5).map((image, index) => (
                    <img 
                      key={index}
                      src={image} 
                      alt={`${property.name} view ${index + 2}`}
                      className="w-full h-44 object-cover rounded-xl"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold mb-4">{property.name}</h1>
                <p className="text-xl text-gray-600 mb-6">{property.address}</p>
                
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">About this place</h2>
                  <p className="text-gray-600 leading-relaxed">
                    Welcome to {property.name}, a beautiful property located in the heart of {property.location}. 
                    This stunning accommodation offers the perfect blend of comfort and style, making it an ideal 
                    choice for your next getaway. Whether you're here for business or leisure, you'll find everything 
                    you need for a memorable stay.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Card */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-2xl p-6 sticky top-8">
                  <div className="mb-6">
                    <p className="text-3xl font-bold">¥{property.price}</p>
                    <p className="text-gray-600">per night</p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                      <input 
                        type="date" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                      <input 
                        type="date" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-transparent">
                        <option>1 guest</option>
                        <option>2 guests</option>
                        <option>3 guests</option>
                        <option>4 guests</option>
                      </select>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-brand-green text-white font-semibold rounded-lg hover:bg-green-600 transition-colors">
                    Reserve
                  </button>
                  
                  <p className="text-center text-sm text-gray-600 mt-4">You won't be charged yet</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PropertyDetailPage;