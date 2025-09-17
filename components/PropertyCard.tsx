
import React from 'react';
import { type Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onClick?: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <div className="break-inside-avoid">
        <button onClick={() => onClick?.(property)} className="w-full text-left bg-white rounded-2xl shadow-sm overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-stone-300">
            <img src={property.imageUrl} alt={property.name} className="w-full h-auto object-cover" />
            <div className="p-5">
                <h3 className="font-bold text-lg text-stone-800">{property.name}</h3>
                <p className="text-stone-500 mt-1">¥{property.price} / night · {property.roomType}</p>
            </div>
        </button>
    </div>
  );
};

export default PropertyCard;
