
import React, { useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { type Property } from '../types';

interface HomePageProps {
  properties: Property[];
}

const HomePage: React.FC<HomePageProps> = ({ properties }) => {
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const closeModal = () => setActiveProperty(null);

  // Split properties into columns for the masonry layout
  const numColumns = 3;
  const columns: Property[][] = useMemo(() => {
    const result: Property[][] = Array.from({ length: numColumns }, () => []);
    properties.forEach((property, i) => {
      result[i % numColumns].push(property);
    });
    return result;
  }, [properties]);

  return (
    <div className="min-h-screen bg-brand-gray text-stone-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <main className="py-10">
          <div className="bg-white rounded-3xl shadow-sm p-8 sm:p-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-10 tracking-tight">
              Explore Our Unique Stays
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {columns.map((column, colIndex) => (
                <div key={colIndex} className="grid gap-8">
                  {column.map((property) => (
                    <PropertyCard key={property.id} property={property} onClick={setActiveProperty} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
      {/* Details Modal */}
      {activeProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl max-w-3xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-4 space-y-3">
                <h2 className="text-2xl font-bold text-stone-800">{activeProperty.name}</h2>
                <p className="text-stone-500">{activeProperty.location}</p>
                <p className="text-stone-700">{activeProperty.roomType} · ¥{activeProperty.price} / night</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeProperty.amenities.map(a => (
                    <span key={a} className="px-2 py-1 text-xs rounded-full bg-stone-100 text-stone-700">{a}</span>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <img src={activeProperty.imageUrl} alt={activeProperty.name} className="w-full h-64 object-cover rounded-lg" />
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {activeProperty.gallery.slice(0,4).map((img, i) => (
                    <img key={i} src={img} alt={`thumb-${i}`} className="w-full h-16 object-cover rounded" />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border-t border-stone-200">
              <div className="text-stone-700 text-sm">Address: {activeProperty.address}</div>
              <button onClick={closeModal} className="px-4 py-2 rounded-lg bg-stone-800 text-white hover:bg-stone-700">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
