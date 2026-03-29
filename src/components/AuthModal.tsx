'use client';

import { useState } from 'react';
import { useAuthStore } from '../store/authStore';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // NEW: State for the password eye toggle!
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '', email: '', password: '', phone: '', address: ''
  });

  if (!isAuthModalOpen) return null; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 1. STRICT EMAIL & TYPO VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
    
    // NEW: The Gmail Typo Catcher!
    if (formData.email.endsWith('@gmail.co')) {
      setError("Typo detected: Did you mean @gmail.com?");
      setIsLoading(false);
      return;
    }

    if (!isLogin) {
      if (formData.phone.length < 8) {
        setError("Please enter a valid phone number.");
        setIsLoading(false);
        return;
      }
      if (formData.address.length < 10) {
        setError("Please enter your full delivery address.");
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: isLogin ? 'login' : 'signup',
          ...formData 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user); 
        alert(isLogin ? "Welcome back!" : "Account created successfully!");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Something went wrong connecting to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeAuthModal();
  };

  return (
    <div 
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in"
    >
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-4 font-bold text-sm tracking-widest uppercase transition-colors ${isLogin ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-400 hover:text-gray-900'}`}
          >
            Log In
          </button>
          <button 
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-4 font-bold text-sm tracking-widest uppercase transition-colors ${!isLogin ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-400 hover:text-gray-900'}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4">
          {error && <div className="bg-red-50 text-red-600 text-sm font-bold p-3 rounded-lg text-center">{error}</div>}

          {!isLogin && (
            <input required type="text" placeholder="Full Name" 
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          )}

          <input required type="email" placeholder="Email Address" 
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
          />
          
          {/* NEW: Password Field with Eye Icon Toggle */}
          <div className="relative">
            <input 
              required 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 pr-12"
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-600 transition-colors"
            >
              {showPassword ? (
                /* Eye Closed Icon */
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
              ) : (
                /* Eye Open Icon */
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              )}
            </button>
          </div>

          {!isLogin && (
            <>
              <input required type="tel" placeholder="Phone Number" 
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              />
              <textarea required placeholder="Full Delivery Address" rows={2}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                onChange={(e) => setFormData({...formData, address: e.target.value})} 
              />
            </>
          )}

          <button 
            disabled={isLoading}
            className="w-full bg-gray-900 text-white font-extrabold py-4 rounded-xl mt-4 uppercase tracking-widest hover:bg-teal-600 transition-colors shadow-md"
          >
            {isLoading ? "Processing..." : isLogin ? "Secure Login" : "Create Account"}
          </button>
        </form>

      </div>
    </div>
  );
}