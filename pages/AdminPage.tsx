
import React, { useState, useEffect, useRef } from 'react';
import { type Property } from '../types';
import MonthlySubscriptionsChart from '../components/MonthlySubscriptionsChart';
import { ALL_AMENITIES } from '../constants';

// --- Helper & Icon Components ---

const LeafIcon: React.FC<{className?: string}> = ({className}) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 14.24V19.95C16.16 19.44 18.5 16.94 18.95 13.8C16.95 14.18 14.65 14.47 13 14.24ZM11 4.05C11.96 5.67 12.31 7.89 11.75 9.8C10.74 9.4 8.5 8.92 7.05 7.05C8.06 5.56 9.45 4.5 11 4.05ZM6.05 8.05C7.92 9.5 10.15 10.22 11.25 10.76C10.69 12.67 10.96 15.05 12 16.43C9.95 15.86 7.5 14.18 5.05 12C5.56 10.55 5.56 9.06 6.05 8.05ZM12 11.53C14.28 12.03 16.57 12.24 18.29 11.95C17.93 8.35 15.65 5.35 12.43 4.25C13.82 6.05 13.97 8.95 12 11.53Z" fill="currentColor"/>
  </svg>
);

const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;
const PropertyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;
const MessageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>;
const ReportIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm2 4a1 1 0 100 2h4a1 1 0 100-2H8zm0 3a1 1 0 000 2h4a1 1 0 100-2H8zm0 3a1 1 0 100 2h2a1 1 0 100-2H8z" clipRule="evenodd" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;

// --- Main Admin Page Components ---

const Sidebar = () => (
  <aside className="w-64 bg-admin-dark text-gray-200 flex flex-col">
    <div className="p-6 flex items-center space-x-3 border-b border-gray-700">
      <LeafIcon className="text-white" />
      <div>
        <h1 className="text-lg font-bold text-white">Discovery Homes</h1>
        <p className="text-xs text-gray-400">Curated Comforts for Your Journey</p>
      </div>
    </div>
    <nav className="flex-1 px-4 py-6 space-y-2">
      <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"><DashboardIcon /> Dashboard</a>
      <a href="#" className="flex items-center px-4 py-2 bg-admin-green-light text-admin-green rounded-md"><PropertyIcon /> Properties</a>
      <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"><MessageIcon /> Messages</a>
      <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"><ReportIcon /> Reports</a>
      <a href="#" className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"><SettingsIcon /> Settings</a>
    </nav>
  </aside>
);

const EmptyProperty: Omit<Property, 'id'> = {
  name: '',
  price: 0,
  imageUrl: '',
  location: '',
  date: new Date().toISOString().split('T')[0],
  status: 'Active',
  gallery: [],
  address: '',
  amenities: [],
  roomType: '',
  subscriptionsByMonth: {}
};


interface AdminPageProps {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id' | 'date' | 'status'>) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: number) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ properties, addProperty, updateProperty, deleteProperty }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [editingProperty, setEditingProperty] = useState<Property | Omit<Property, 'id' | 'date' | 'status'> | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'properties' | 'reports'>('properties');

  useEffect(() => {
    if (selectedProperty) {
      setEditingProperty(selectedProperty);
      setIsAdding(false);
    } else {
      setEditingProperty(null);
    }
  }, [selectedProperty]);
  
  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
  };
  
  const handleAddNew = () => {
      setSelectedProperty(null);
      setEditingProperty(EmptyProperty);
      setIsAdding(true);
  }

  const handleCancel = () => {
    setEditingProperty(null);
    setSelectedProperty(null);
    setIsAdding(false);
  }

  const handleSave = () => {
    if (editingProperty) {
      if ('id' in editingProperty) {
        updateProperty(editingProperty as Property);
      } else {
        addProperty(editingProperty as Omit<Property, 'id' | 'date' | 'status'>);
      }
      handleCancel();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editingProperty) {
      setEditingProperty({ ...editingProperty, [e.target.name]: e.target.value });
    }
  };

  const handleAmenityChange = (amenity: string) => {
    if(editingProperty){
        const currentAmenities = editingProperty.amenities || [];
        const newAmenities = currentAmenities.includes(amenity)
            ? currentAmenities.filter(a => a !== amenity)
            : [...currentAmenities, amenity];
        setEditingProperty({ ...editingProperty, amenities: newAmenities });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProperty) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setEditingProperty(prev => {
          if (!prev) return null;
          const newGallery = [...(prev.gallery || []), base64String];
          return {
            ...prev,
            // If this is the first image, also set it as the main imageUrl
            imageUrl: prev.imageUrl || base64String,
            gallery: newGallery,
          };
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const setCoverImage = (img: string) => {
    if (editingProperty) {
      setEditingProperty({ ...editingProperty, imageUrl: img });
    }
  };
  
  return (
    <div className="flex min-h-screen bg-admin-body font-sans text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm p-4 border-b border-gray-200">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                      <LeafIcon className="text-gray-500" />
                      <div>
                        <h1 className="text-lg font-bold text-gray-800">Discovery Homes</h1>
                        <p className="text-xs text-gray-500">Curated Comforts for Your Journey</p>
                      </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className={`px-3 py-1.5 rounded-md text-sm ${activeTab==='dashboard' ? 'bg-admin-green text-white' : 'bg-gray-100 text-gray-700'}`} onClick={()=>setActiveTab('dashboard')}>Dashboard</button>
                    <button className={`px-3 py-1.5 rounded-md text-sm ${activeTab==='properties' ? 'bg-admin-green text-white' : 'bg-gray-100 text-gray-700'}`} onClick={()=>setActiveTab('properties')}>Properties</button>
                    <button className={`px-3 py-1.5 rounded-md text-sm ${activeTab==='reports' ? 'bg-admin-green text-white' : 'bg-gray-100 text-gray-700'}`} onClick={()=>setActiveTab('reports')}>Reports</button>
                  </div>
              </div>
          </header>

          <main className="flex-1 p-8 overflow-y-auto">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold">Dashboard</h2>
                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(() => {
                    const totalSubs = properties.reduce((sum, p) => {
                      const monthlyCounts = Object.values(p.subscriptionsByMonth || {}) as number[];
                      const propertyTotal = monthlyCounts.reduce((a, b) => a + b, 0);
                      return sum + propertyTotal;
                    }, 0);
                    const totalProps = properties.length;
                    const avgPrice = Math.round(properties.reduce((sum, p) => sum + p.price, 0) / Math.max(1, totalProps));
                    return (
                      <>
                        <div className="bg-white rounded-lg shadow p-4"><div className="text-sm text-gray-500">Total Subscriptions</div><div className="text-2xl font-bold">{totalSubs}</div></div>
                        <div className="bg-white rounded-lg shadow p-4"><div className="text-sm text-gray-500">Total Properties</div><div className="text-2xl font-bold">{totalProps}</div></div>
                        <div className="bg-white rounded-lg shadow p-4"><div className="text-sm text-gray-500">Avg. Price / Night</div><div className="text-2xl font-bold">¥{avgPrice}</div></div>
                      </>
                    );
                  })()}
                </div>
                {/* Monthly subscriptions aggregate */}
                {(() => {
                  const monthToCount: Record<string, number> = {};
                  properties.forEach(p => {
                    Object.entries(p.subscriptionsByMonth || {}).forEach(([m, c]) => {
                      const count = c as number;
                      monthToCount[m] = (monthToCount[m] || 0) + count;
                    });
                  });
                  const months = Object.keys(monthToCount).sort();
                  const data = months.map(m => ({ month: m, count: monthToCount[m] }));
                  return (
                    <div className="bg-white rounded-lg shadow p-6">
                      <MonthlySubscriptionsChart data={data} />
                    </div>
                  );
                })()}
              </div>
            )}
            {activeTab === 'properties' && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">Properties</h2>
                <button onClick={handleAddNew} className="px-4 py-2 bg-admin-green text-white rounded-lg font-semibold hover:bg-green-600 transition-colors">+ Add New Property</button>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Thumbnail</th>
                      <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                      <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Room Type</th>
                      <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {properties.map(prop => (
                      <tr key={prop.id} className={`hover:bg-gray-50 ${selectedProperty?.id === prop.id ? 'bg-green-50' : ''}`} onClick={() => handleSelectProperty(prop)}>
                        <td className="p-3">
                          <div className="flex -space-x-4">
                            {prop.gallery.slice(0, 3).map((img, i) => <img key={i} className="w-10 h-10 rounded-full border-2 border-white object-cover" src={img} alt={`${prop.name} gallery image ${i+1}`} />)}
                          </div>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                            <div className="font-bold">{prop.name}</div>
                            <div className="text-sm text-gray-500">¥{prop.price} / night</div>
                        </td>
                        <td className="p-3 text-sm text-gray-600">{prop.location}</td>
                        <td className="p-3 text-sm text-gray-600">{prop.date}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${prop.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{prop.status}</span>
                        </td>
                        <td className="p-3 text-sm text-gray-600">{prop.roomType}</td>
                        <td className="p-3">
                            <div className="flex space-x-2">
                                <button onClick={(e) => { e.stopPropagation(); deleteProperty(prop.id); if(selectedProperty?.id === prop.id) handleCancel();}} className="text-gray-400 hover:text-red-600"><DeleteIcon /></button>
                                <button onClick={(e) => { e.stopPropagation(); handleSelectProperty(prop);}} className="text-gray-400 hover:text-blue-600"><EditIcon /></button>
                            </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}

            {/* Edit Property Form */}
            {(activeTab === 'properties' && editingProperty) && (
              <div>
                <h2 className="text-3xl font-bold mb-4">{isAdding ? 'Add New Property' : 'Edit Property List'}</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left side: Gallery and amenities */}
                    <div className="lg:col-span-1 space-y-6">
                      <div>
                        <h3 className="font-bold mb-2">Photo Gallery</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {editingProperty.gallery?.map((img, i) => (
                              <button type="button" key={i} onClick={() => setCoverImage(img)} className={`relative rounded-md overflow-hidden border ${editingProperty.imageUrl === img ? 'border-admin-green ring-2 ring-admin-green' : 'border-transparent'}`}>
                                <img src={img} className="object-cover aspect-square w-full h-full" alt={`gallery ${i}`}/>
                                {editingProperty.imageUrl === img && (
                                  <span className="absolute bottom-1 left-1 bg-admin-green text-white text-xs px-2 py-0.5 rounded">Cover</span>
                                )}
                              </button>
                            ))}
                        </div>
                      </div>
                       <div>
                         <h3 className="font-bold mb-2">Amenities</h3>
                         <div className="grid grid-cols-2 gap-2">
                           {ALL_AMENITIES.map(amenity => (
                             <label key={amenity} className="flex items-center space-x-2 text-sm">
                               <input type="checkbox" className="rounded text-admin-green focus:ring-admin-green" checked={editingProperty.amenities?.includes(amenity)} onChange={() => handleAmenityChange(amenity)} />
                               <span>{amenity}</span>
                             </label>
                           ))}
                         </div>
                       </div>
                    </div>
                    {/* Right side: Form fields */}
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Property Name</label>
                        <input type="text" name="name" value={editingProperty.name} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-admin-green focus:border-admin-green"/>
                      </div>
                       <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" name="address" value={editingProperty.address} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-admin-green focus:border-admin-green"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Room Type</label>
                        <input type="text" name="roomType" value={(editingProperty as any).roomType || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-admin-green focus:border-admin-green"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Price per Night</label>
                        <input type="number" name="price" value={editingProperty.price} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-admin-green focus:border-admin-green"/>
                      </div>
                      <div>
                         <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                            accept="image/png, image/jpeg, image/webp"
                         />
                         <button onClick={() => fileInputRef.current?.click()} className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Upload Photos</button>
                      </div>
                      <div className="flex justify-end space-x-3 pt-4">
                        <button onClick={handleCancel} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Cancel</button>
                        <button onClick={handleSave} className="px-6 py-2 bg-admin-green text-white rounded-lg font-semibold hover:bg-green-600 transition-colors">Save Changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Reports</h2>
                {(() => {
                  const monthSet = new Set<string>();
                  properties.forEach(p => Object.keys(p.subscriptionsByMonth || {}).forEach(m => monthSet.add(m)));
                  const months = Array.from(monthSet).sort();
                  return (
                    <div className="bg-white rounded-lg shadow overflow-auto">
                      <table className="min-w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                            <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Room Type</th>
                            {months.map(m => (
                              <th key={m} className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{m}</th>
                            ))}
                            <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {properties.map(p => {
                        const total = (Object.values(p.subscriptionsByMonth || {}) as number[]).reduce((a,b)=>a+b,0);
                            return (
                              <tr key={p.id}>
                                <td className="p-3 whitespace-nowrap">
                                  <div className="font-semibold">{p.name}</div>
                                  <div className="text-sm text-gray-500">{p.location}</div>
                                </td>
                                <td className="p-3 text-sm text-gray-600">{p.roomType}</td>
                                {months.map(m => (
                                  <td key={m} className="p-3 text-sm text-gray-600">{p.subscriptionsByMonth?.[m] ?? 0}</td>
                                ))}
                                <td className="p-3 text-sm text-gray-600 font-medium">{total}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
              </div>
            )}
            {activeTab === 'properties' && (
              <button className="w-full text-center mt-8 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">+ Load More Homes</button>
            )}
          </main>
          <footer className="text-center p-4 text-sm text-gray-500 border-t border-gray-200">
            © 2024 Discovery Homes | Contact Us: info@discoveryhomes.com
          </footer>
      </div>
    </div>
  );
};

export default AdminPage;
