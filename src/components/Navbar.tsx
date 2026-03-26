'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '../store/cartStore';

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const savedLocation = useCartStore((state) => state.savedLocation); // Ask the Brain!
  const pathname = usePathname();

  // SMART LINK: If we have their location, go straight to the store. If not, ask them.
  const productsLink = savedLocation 
    ? `/near-me/${savedLocation.state.toLowerCase()}/${savedLocation.city.toLowerCase()}` 
    : '/products';

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'PRODUCTS', path: productsLink }, // Uses the Smart Link
    { name: 'OFFERS', path: '/offers' },
    { name: 'REVIEWS', path: '/reviews' },
    { name: 'ARTICLES', path: '/articles' },
    { name: 'GALLERY', path: '/gallery' },
    { name: 'ENQUIRY', path: '/enquiry' },
  ];

  // ... (KEEP THE REST OF YOUR NAVBAR CODE EXACTLY THE SAME BELOW THIS) ...

  // Logic to figure out which tab should have the Teal Underline
  const isActive = (path: string, name: string) => {
    if (name === 'PRODUCTS' && pathname.includes('/near-me')) return true; // Keep Products highlighted in the store
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  return (
    // NOTE: z-40 is lower than the cart's z-[100], fixing the overlap bug!
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm font-sans">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between h-20">
        
        {/* Navigation Links */}
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

        {/* Right: Social Icons & FIXED Global Cart Pill */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden lg:flex items-center gap-3 mr-2">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-teal-600 transition">f</div>
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-teal-600 transition">ig</div>
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-teal-600 transition">X</div>
          </div>

          <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-teal-600 transition-colors shadow-md relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span className="font-bold text-sm tracking-wide">
              {cart.length > 0 ? `${cart.length} Item${cart.length > 1 ? 's' : ''}` : 'Cart'}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}