'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../../store/cartStore';

export default function ProductsPage() {
  const router = useRouter();
  const setLocation = useCartStore((state) => state.setLocation); // Connect to Brain
  
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // NEW: Animation State

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      setIsProcessing(true); // Start animation
      setLocation(selectedState, selectedCity); // Save to Brain!
      
      // Lightning fast 500ms delay to feel premium
      setTimeout(() => {
        router.push(`/near-me/${selectedState.toLowerCase()}/${selectedCity.toLowerCase()}`);
      }, 500);
    } else {
      alert("Please select both a state and a city!");
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500">
        
        <div className="bg-teal-600 p-8 text-center">
          <h2 className="text-3xl font-extrabold text-white uppercase tracking-tight mb-2">Shop Our Products</h2>
          <p className="text-teal-100 font-medium">Please select your nearest city to view local inventory.</p>
        </div>

        <div className="p-8 md:p-10">
          <form onSubmit={handleSearch} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="font-extrabold text-gray-800 uppercase text-xs tracking-wide">1. State</label>
                <select className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:border-teal-500 font-medium" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                  <option value="">-- Choose State --</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-extrabold text-gray-800 uppercase text-xs tracking-wide">2. City</label>
                <select className="w-full p-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-900 focus:outline-none focus:border-teal-500 font-medium" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                  <option value="">-- Choose City --</option>
                  <option value="Vapi">Vapi</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-gray-900 text-white font-extrabold text-lg py-5 rounded-xl hover:bg-teal-600 transition-colors shadow-lg mt-4 uppercase tracking-widest flex items-center justify-center gap-3"
            >
              {/* NEW: Spinner that only shows when processing */}
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Locating Store...
                </>
              ) : (
                "View Local Inventory"
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}