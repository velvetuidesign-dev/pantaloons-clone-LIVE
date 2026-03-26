'use client';

import { useState } from 'react';

export default function CheckoutModal({ 
  cartTotal, 
  itemCount, 
  onClose, 
  onSuccess 
}: { 
  cartTotal: number, 
  itemCount: number, 
  onClose: () => void, 
  onSuccess: () => void 
}) {
  // 0 = Form, 1 = Processing, 2 = Success
  const [step, setStep] = useState(0);

  const handleMockPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(1); // Trigger the Processing Skeleton

    // Simulate network delay for 2.5 seconds, then show Success
    setTimeout(() => {
      setStep(2);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      {/* Dark Glassmorphism Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={step === 0 ? onClose : undefined} // Only allow closing if still on the form
      />

      {/* The Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col transform transition-all">
        
        {/* === STEP 0: MINIMALIST CHECKOUT FORM === */}
        {step === 0 && (
          <div className="flex flex-col md:flex-row h-full">
            {/* Left Side: The Form */}
            <div className="flex-1 p-8 sm:p-12">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Checkout</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>

              <form onSubmit={handleMockPayment} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                  <input required type="email" placeholder="you@example.com" className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-orange-600 transition-colors text-gray-900 font-medium bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Card Details (Mock)</label>
                  <input required type="text" placeholder="1234 5678 9101 1121" maxLength={16} className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-orange-600 transition-colors text-gray-900 font-medium tracking-widest bg-transparent" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Expiry</label>
                    <input required type="text" placeholder="MM/YY" maxLength={5} className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-orange-600 transition-colors text-gray-900 font-medium bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">CVC</label>
                    <input required type="text" placeholder="123" maxLength={3} className="w-full border-b-2 border-gray-200 py-2 focus:outline-none focus:border-orange-600 transition-colors text-gray-900 font-medium bg-transparent" />
                  </div>
                </div>
                
                <button type="submit" className="w-full bg-gray-900 text-white font-extrabold py-5 rounded-xl mt-8 hover:bg-orange-600 transition-colors shadow-lg uppercase tracking-widest">
                  Pay ₹ {cartTotal.toLocaleString('en-IN')}
                </button>
              </form>
            </div>

            {/* Right Side: Order Summary */}
            <div className="w-full md:w-1/3 bg-gray-50 p-8 sm:p-12 border-l border-gray-100 flex flex-col justify-center">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Order Summary</h3>
              <div className="flex justify-between items-center mb-4 text-gray-700">
                <span>Items ({itemCount})</span>
                <span className="font-bold">₹ {cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center mb-6 text-gray-700">
                <span>Shipping</span>
                <span className="font-bold text-green-600">Free</span>
              </div>
              <div className="pt-6 border-t border-gray-200 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-extrabold text-gray-900">₹ {cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

        {/* === STEP 1: PROCESSING SKELETON === */}
        {step === 1 && (
          <div className="p-20 flex flex-col items-center justify-center min-h-[400px]">
            {/* Spinning Loader */}
            <div className="w-16 h-16 border-4 border-gray-100 border-t-orange-600 rounded-full animate-spin mb-10"></div>
            
            {/* Pulsing Text Skeletons */}
            <h3 className="text-2xl font-extrabold text-gray-900 mb-6 tracking-tight animate-pulse">Processing Payment securely...</h3>
            <div className="w-64 h-4 bg-gray-200 rounded-full animate-pulse mb-3"></div>
            <div className="w-48 h-4 bg-gray-100 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* === STEP 2: SUCCESS SCREEN === */}
        {step === 2 && (
          <div className="p-20 flex flex-col items-center justify-center min-h-[400px] text-center bg-green-50">
            {/* Animated Green Checkmark Box */}
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)] animate-[bounce_1s_ease-in-out_1]">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight uppercase">Successfully Ordered!</h2>
            <p className="text-green-800 font-medium mb-10 text-lg">Your mock payment was approved. We are packing your gear.</p>
            
            <button 
              onClick={onSuccess} // This triggers the cart clearing!
              className="bg-gray-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-green-600 transition-colors shadow-xl uppercase tracking-widest"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
}