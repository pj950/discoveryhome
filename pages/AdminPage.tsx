
import React, { useState, useEffect, useRef } from 'react';
import { type Property } from '../types';
import { ALL_AMENITIES } from '../constants';

// --- Helper & Icon Components ---

const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;

// --- Main Admin Page Components ---

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
  const galleryInputRef = useRef<HTMLInputElement>(null);

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

  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && editingProperty) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          setEditingProperty(prev => {
            if (!prev) return null;
            const newGallery = [...(prev.gallery || []), base64String];
            return {
              ...prev,
              imageUrl: prev.imageUrl || base64String,
              gallery: newGallery,
            };
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    if (editingProperty) {
      const newGallery = [...(editingProperty.gallery || [])];
      const removedImage = newGallery.splice(index, 1)[0];
      
      setEditingProperty(prev => {
        if (!prev) return null;
        // If we removed the main image, set a new one
        let newImageUrl = prev.imageUrl;
        if (prev.imageUrl === removedImage) {
          newImageUrl = newGallery[0] || '';
        }
        return {
          ...prev,
          imageUrl: newImageUrl,
          gallery: newGallery,
        };
      });
    }
  };

  const handleSetMainImage = (image: string) => {
    if (editingProperty) {
      setEditingProperty(prev => {
        if (!prev) return null;
        return {
          ...prev,
          imageUrl: image,
        };
      });
    }
  };
  
  return (
    <div className="p-8">
            {/* Properties List */}
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
                      <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                      <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="p-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
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

            {/* Edit Property Form */}
            {(editingProperty) && (
              <div>
                <h2 className="text-3xl font-bold mb-4">{isAdding ? 'Add New Property' : 'Edit Property List'}</h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left side: Gallery and amenities */}
                    <div className="lg:col-span-1 space-y-6">
                      <div>
                        <h3 className="font-bold mb-2">Photo Gallery</h3>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {editingProperty.gallery?.map((img, i) => (
                              <div key={i} className="relative group">
                                <img 
                                  src={img} 
                                  className={`rounded-md object-cover aspect-square cursor-pointer ${editingProperty.imageUrl === img ? 'ring-2 ring-admin-green' : ''}`} 
                                  alt={`gallery ${i}`}
                                  onClick={() => handleSetMainImage(img)}
                                />
                                <button
                                  onClick={() => handleRemoveImage(i)}
                                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <CloseIcon />
                                </button>
                                {editingProperty.imageUrl === img && (
                                  <div className="absolute bottom-1 left-1 bg-admin-green text-white text-xs px-2 py-1 rounded">Main</div>
                                )}
                              </div>
                            ))}
                        </div>
                        <div className="space-y-2">
                          <input
                            type="file"
                            ref={galleryInputRef}
                            onChange={handleGalleryUpload}
                            className="hidden"
                            accept="image/png, image/jpeg, image/webp"
                            multiple
                          />
                          <button 
                            onClick={() => galleryInputRef.current?.click()} 
                            className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Upload Gallery Photos
                          </button>
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
                        <label className="block text-sm font-medium text-gray-700">Price per Night</label>
                        <input type="number" name="price" value={editingProperty.price} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-admin-green focus:border-admin-green"/>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input type="text" name="location" value={editingProperty.location || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-admin-green focus:border-admin-green"/>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select 
                            name="status" 
                            value={('status' in editingProperty) ? editingProperty.status : 'Active'} 
                            onChange={(e) => {
                              if ('id' in editingProperty) {
                                setEditingProperty({ 
                                  ...editingProperty, 
                                  status: e.target.value as Property['status'] 
                                });
                              }
                            }}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-admin-green focus:border-admin-green"
                            disabled={!('id' in editingProperty)}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Responded">Responded</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Main Photo</label>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                            accept="image/png, image/jpeg, image/webp"
                          />
                          <button onClick={() => fileInputRef.current?.click()} className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Upload Main Photo</button>
                        </div>
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
    </div>
  );
};

export default AdminPage;
