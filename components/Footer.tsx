
import React from 'react';

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const TwitterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
);


const Footer: React.FC = () => {
  return (
    <footer className="py-8 mt-8 border-t border-stone-200">
      <div className="flex items-center justify-between text-stone-500">
        <div className="flex items-center space-x-6 text-sm">
          <a href="#" className="hover:text-stone-800 transition-colors">Privacy</a>
          <a href="#" className="hover:text-stone-800 transition-colors">Terms</a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-stone-800 transition-colors"><InstagramIcon /></a>
          <a href="#" className="hover:text-stone-800 transition-colors"><TwitterIcon /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
