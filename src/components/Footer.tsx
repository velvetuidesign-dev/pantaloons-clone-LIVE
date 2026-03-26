'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  
  // This checks if we are on the main homepage!
  const isHome = pathname === '/';

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8 mt-auto font-sans">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* HUGE SEO SECTION - ONLY SHOWS ON HOMEPAGE */}
        {isHome && (
          <div className="mb-12 space-y-10 animate-in fade-in duration-700">
            <div>
              <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 inline-block pb-1 mb-4">Pantaloons Popular Categories</h3>
              <p className="text-sm text-gray-600 leading-loose">
                Men Ethnic Wear | Men Bottom Wear | Men Top Wear | Men Activewear | Men Innerwear | Women Western Wear | Women Ethnic Wear | Women Sports & Active Wear | Kids Wear - Boys | Kids Wear - Girls | Men Footwear | Women Footwear | Footwear - Boys | Footwear - Girls | Men Belts | Men Bags | Men Sunglasses | Women Accessories | Boys Accessories | Home Decor | Living Scapes | Bedroom | Bathroom | Dining | Fragrance | Brands | New Arrivals | Accessories
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 inline-block pb-1 mb-4">Pantaloons Popular State And Cities</h3>
              <p className="text-sm text-gray-600 leading-loose">
                Pantaloons Store In Gujarat | Pantaloons Store In Ahmedabad | Pantaloons Store In Anand | Pantaloons Store In Ankleshwar | Pantaloons Store In Bharuch | Pantaloons Store In Bhavnagar | Pantaloons Store In Bhuj | Pantaloons Store In Gandhinagar | Pantaloons Store In Rajkot | Pantaloons Store In Surat | Pantaloons Store In Vadodara | Pantaloons Store In Vapi
              </p>
            </div>
          </div>
        )}

        {/* COMPACT SECTION - SHOWS ON EVERY PAGE */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-900 inline-block pb-1 mb-4">About Pantaloons</h3>
          <p className="text-sm text-gray-600 mb-8 max-w-4xl leading-relaxed">
            Pantaloons is a playground where we enjoy the privilege of serving our customers to enable their fashion journey. We bring you the latest trends, premium quality fabrics, and an unmatched shopping experience.
          </p>
        </div>

        {/* Bottom Navigation Links */}
        <div className="border-t border-b border-gray-200 py-4 flex flex-wrap justify-center md:justify-center gap-4 md:gap-8 text-sm text-gray-700 font-medium mb-6">
          <Link href="/enquiry" className="hover:text-teal-600 transition-colors">Payment Options</Link>
          <Link href="/enquiry" className="hover:text-teal-600 transition-colors">Investor Relations</Link>
          <Link href="/enquiry" className="hover:text-teal-600 transition-colors">Customer Support</Link>
          <Link href="/enquiry" className="hover:text-teal-600 transition-colors">Returns and Exchange Policy</Link>
          <Link href="/enquiry" className="hover:text-teal-600 transition-colors">Shipping Policy</Link>
          <Link href="/" className="hover:text-teal-600 transition-colors">Store Locator</Link>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 flex flex-col items-center gap-1">
          <p>Powered by <span className="text-teal-600 font-bold">Pantaloons</span></p>
          <p>© 2026 Pantaloons. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}