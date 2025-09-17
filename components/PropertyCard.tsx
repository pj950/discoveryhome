
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { type Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };
  
  return (
    <div className="break-inside-avoid">
        <div 
            className="bg-white rounded-2xl shadow-sm overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out cursor-pointer"
            onClick={handleClick}
        >
            <img src={property.imageUrl} alt={property.name} className="w-full h-auto object-cover" />
            <div className="p-5">
                <h3 className="font-bold text-lg text-stone-800">{property.name}</h3>
                <p className="text-stone-500 mt-1">¥{property.price} / night</p>
            </div>
        </div>
    </div>
  );
};

export default PropertyCard;
