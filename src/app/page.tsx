'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  // State for the Location Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      router.push(`/near-me/${selectedState.toLowerCase()}/${selectedCity.toLowerCase()}`);
    } else {
      alert("Please select both a state and a city!");
    }
  };

  return (
    <main className="font-sans min-h-screen bg-white">
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[70vh] md:h-[85vh] bg-gray-900 flex items-center justify-center">
        {/* Beautiful Background Image */}
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80" 
          alt="Fashion Collection" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <h2 className="text-teal-400 font-extrabold tracking-widest uppercase text-sm md:text-lg mb-4">
            New Arrival Collection
          </h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
            Define Your <span className="text-teal-400">Signature</span> Style.
          </h1>
          <p className="text-gray-200 text-lg md:text-2xl font-medium mb-10 max-w-2xl mx-auto drop-shadow-md">
            Discover the latest trends in men's, women's, and kids' fashion at a premium Pantaloons store near you.
          </p>
          
          {/* This button triggers the modal instead of routing! */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-600 text-white px-10 py-5 rounded-full font-extrabold text-lg md:text-xl hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-[0_0_40px_rgba(13,148,136,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] uppercase tracking-widest transform hover:-translate-y-1"
          >
            Shop The Collection
          </button>
        </div>
      </div>

      {/* --- ABOUT STORE SECTION --- */}
      <div className="py-20 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 uppercase tracking-tight">
          The Pantaloons Experience
        </h3>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed mb-16">
          We believe that fashion is a language, and your wardrobe is your voice. From everyday essentials to stunning ethnic wear, our curated collections are designed to make you look and feel extraordinary. Step into our world and discover quality fabrics, flawless fits, and styles that speak to you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>
            </div>
            <h4 className="font-bold text-xl text-gray-900 mb-2">Premium Quality</h4>
            <p className="text-gray-500">Carefully sourced fabrics designed for all-day comfort and long-lasting wear.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h4 className="font-bold text-xl text-gray-900 mb-2">Latest Trends</h4>
            <p className="text-gray-500">Our catalog is updated weekly to ensure you are always ahead of the fashion curve.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <h4 className="font-bold text-xl text-gray-900 mb-2">Nationwide Access</h4>
            <p className="text-gray-500">With hundreds of stores across the country, your next great outfit is just around the corner.</p>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* LOCATION PROMPT MODAL (From your matrix!) */}
      {/* ========================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Dark Blurred Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)} // Clicking outside closes it
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            
            <div className="bg-orange-600 p-8 text-center relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight mb-2">Select Location</h2>
              <p className="text-orange-100 font-medium">To show you the correct inventory, please select your nearest city.</p>
            </div>

            <div className="p-8 md:p-10">
              <form onSubmit={handleSearch} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-extrabold text-gray-800 uppercase text-xs tracking-wide">1. State</label>
                    <select
                      className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:border-teal-500 font-medium cursor-pointer"
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                    >
                      <option value="">-- Choose State --</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-extrabold text-gray-800 uppercase text-xs tracking-wide">2. City</label>
                    <select
                      className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:border-teal-500 font-medium cursor-pointer"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option value="">-- Choose City --</option>
                      <option value="Vapi">Vapi</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Bengaluru">Bengaluru</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gray-900 text-white font-extrabold text-lg py-5 rounded-xl hover:bg-teal-600 transition-colors shadow-lg mt-4 uppercase tracking-widest"
                >
                  Confirm Location
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}