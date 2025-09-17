
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const LeafIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-stone-800">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 14.24V19.95C16.16 19.44 18.5 16.94 18.95 13.8C16.95 14.18 14.65 14.47 13 14.24ZM11 4.05C11.96 5.67 12.31 7.89 11.75 9.8C10.74 9.4 8.5 8.92 7.05 7.05C8.06 5.56 9.45 4.5 11 4.05ZM6.05 8.05C7.92 9.5 10.15 10.22 11.25 10.76C10.69 12.67 10.96 15.05 12 16.43C9.95 15.86 7.5 14.18 5.05 12C5.56 10.55 5.56 9.06 6.05 8.05ZM12 11.53C14.28 12.03 16.57 12.24 18.29 11.95C17.93 8.35 15.65 5.35 12.43 4.25C13.82 6.05 13.97 8.95 12 11.53Z" fill="currentColor"/>
  </svg>
);


const Header: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <header className="py-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <LeafIcon />
          <div>
            <h1 className="text-xl font-bold text-stone-800">Discovery Homes</h1>
            <p className="text-sm text-stone-500">Curated Comforts for Your Journey</p>
          </div>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-stone-600 hover:text-stone-900 transition-colors">Homes</Link>
          <a href="#" className="text-stone-600 hover:text-stone-900 transition-colors">About Us</a>
          <a href="#" className="text-stone-600 hover:text-stone-900 transition-colors">Contact</a>
        </nav>
        <div>
          {isAdminPage ? (
             <Link to="/" className="text-sm font-medium bg-stone-100 text-stone-700 px-4 py-2 rounded-lg hover:bg-stone-200 transition-colors">View Site</Link>
          ) : (
            <Link to="/admin" className="text-sm font-medium bg-stone-100 text-stone-700 px-4 py-2 rounded-lg hover:bg-stone-200 transition-colors">Admin Panel</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
