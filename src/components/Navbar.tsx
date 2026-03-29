'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore'; // NEW: Imported the Auth Brain!

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const savedLocation = useCartStore((state) => state.savedLocation);
  const pathname = usePathname();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // NEW: Grab the user data and the modal trigger
  const { user, logout, openAuthModal } = useAuthStore();

  // NEW: The 4-Minute Ghost Timer
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        openAuthModal();
      }, 4 * 60 * 1000); // Pops up after 4 minutes

      return () => clearTimeout(timer);
    }
  }, [user, openAuthModal]);

  const productsLink = savedLocation 
    ? `/near-me/${savedLocation.state.toLowerCase()}/${savedLocation.city.toLowerCase()}` 
    : '/products';

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'PRODUCTS', path: productsLink },
    { name: 'OFFERS', path: '/offers' },
    { name: 'REVIEWS', path: '/reviews' },
    { name: 'ARTICLES', path: '/articles' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'ENQUIRY', path: '/enquiry' },
  ];

  const isActive = (path: string, name: string) => {
    if (name === 'PRODUCTS' && pathname.includes('/near-me')) return true;
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm font-sans">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between h-20">
        
        {/* MOBILE HAMBURGER BUTTON */}
        <button 
          className="md:hidden p-2 text-gray-900 focus:outline-none hover:text-teal-600 transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>
            ) : (
              <><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></>
            )}
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 overflow-x-auto">
          {navLinks.map((link) => {
            const active = isActive(link.path, link.name);
            return (
              <Link 
                key={link.name} 
                href={link.path} 
                className={`text-sm font-bold tracking-wide transition-all ${
                  active ? 'text-teal-600 border-b-2 border-teal-600 pb-1' : 'text-gray-900 hover:text-teal-600'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Social Icons, Auth, & Cart */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden lg:flex items-center gap-3 mr-2">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-teal-600 transition">f</div>
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-teal-600 transition">ig</div>
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-teal-600 transition">X</div>
          </div>

          {/* NEW: AUTHENTICATION UI */}
          {user ? (
            <div className="flex items-center gap-3 mr-2">
              <span className="hidden sm:inline text-sm font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                Hi, {user.name.split(' ')[0]}!
              </span>
              <button onClick={logout} className="text-sm text-red-500 font-bold hover:underline">Logout</button>
            </div>
          ) : (
            <button onClick={openAuthModal} className="text-sm font-extrabold text-gray-900 hover:text-teal-600 transition-colors uppercase tracking-widest mr-2">
              Log In
            </button>
          )}

          <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-teal-600 transition-colors shadow-md relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span className="font-bold text-sm tracking-wide">
              {cart.length > 0 ? `${cart.length} Item${cart.length > 1 ? 's' : ''}` : 'Cart'}
            </span>
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-2xl py-6 px-8 flex flex-col gap-6 animate-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => {
            const active = isActive(link.path, link.name);
            return (
              <Link 
                key={link.name} 
                href={link.path} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`text-lg font-extrabold tracking-widest uppercase transition-all ${
                  active ? 'text-teal-600' : 'text-gray-900 hover:text-teal-600'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}

    </header>
  );
}