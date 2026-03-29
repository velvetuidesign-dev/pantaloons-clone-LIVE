'use client';

import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore'; 

export default function CheckoutModal({ onClose, cartTotal, itemCount }: { onClose: () => void, cartTotal: number, itemCount: number }) {
  const { cart } = useCartStore();
  const { user, openAuthModal } = useAuthStore();
  
  const [isProcessingStripe, setIsProcessingStripe] = useState(false);
  const [isProcessingCOD, setIsProcessingCOD] = useState(false);
  // 1. STATE FOR THE BEAUTIFUL SUCCESS UI
  const [showSuccess, setShowSuccess] = useState(false);

  const handleStripeCheckout = async () => {
    if (!user) {
      onClose(); 
      openAuthModal(); 
      return; 
    }

    setIsProcessingStripe(true); 
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cart,
          totalAmount: cartTotal,
          customerName: user.name,
          customerEmail: user.email
        }),
      });
      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      setIsProcessingStripe(false);
      alert("Error connecting to Stripe.");
    }
  };

  const handleCODCheckout = async () => {
    if (!user) {
      onClose();
      openAuthModal();
      return; 
    }

    setIsProcessingCOD(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          cart, 
          totalAmount: cartTotal, 
          paymentMethod: 'COD',
          customerName: user.name,
          customerEmail: user.email 
        }),
      });

      if (response.ok) {
        // 2. INSTEAD OF AN ALERT, SHOW THE SUCCESS UI!
        setShowSuccess(true);
      } else {
        const errorData = await response.json();
        alert("Server Error: " + errorData.error);
        setIsProcessingCOD(false);
      }
    } catch (error) {
      console.error("COD Error:", error);
      alert("Something went wrong saving the order!");
      setIsProcessingCOD(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* THE SUCCESS UI OR THE CART UI */}
        {showSuccess ? (
          <div className="p-10 text-center flex flex-col items-center animate-in slide-in-from-bottom-4 duration-500">
            <div className="w-24 h-24 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">Confirmed!</h2>
            <p className="text-gray-500 font-medium mb-8 leading-relaxed">
              Thank you, {user?.name.split(' ')[0]}!<br/>Your order has been received and is currently being prepared for delivery.
            </p>
            <button 
              onClick={() => window.location.href = '/'} // Refreshes app to clear cart and start over
              className="w-full bg-gray-900 text-white font-extrabold py-4 rounded-xl shadow-lg hover:bg-teal-600 transition-colors uppercase tracking-widest"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-extrabold text-gray-900 uppercase tracking-tight">Order Summary</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-500 font-medium">Items ({itemCount})</span>
                <span className="font-bold text-gray-900">₹ {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-500 font-medium">Shipping</span>
                <span className="font-bold text-teal-600">FREE</span>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-extrabold text-gray-900">Total</span>
                <span className="text-2xl font-extrabold text-teal-600">₹ {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={handleStripeCheckout} 
                disabled={isProcessingStripe || isProcessingCOD}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow hover:bg-blue-700 transition-colors flex justify-center items-center gap-2"
              >
                {isProcessingStripe ? "Connecting..." : "💳 Pay Securely with Card"}
              </button>

              <button 
                onClick={handleCODCheckout} 
                disabled={isProcessingStripe || isProcessingCOD}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow hover:bg-gray-800 transition-colors flex justify-center items-center gap-2"
              >
                {isProcessingCOD ? "Saving Order..." : "📦 Cash on Delivery"}
              </button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}