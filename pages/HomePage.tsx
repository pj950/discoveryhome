
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { type Property } from '../types';

interface HomePageProps {
  properties: Property[];
}

const HomePage: React.FC<HomePageProps> = ({ properties }) => {
  // Split properties into columns for the masonry layout
  const numColumns = 3;
  const columns: Property[][] = Array.from({ length: numColumns }, () => []);
  properties.forEach((property, i) => {
    columns[i % numColumns].push(property);
  });

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
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
