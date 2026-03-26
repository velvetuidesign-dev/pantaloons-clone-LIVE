'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import CheckoutModal from './CheckoutModal';
import { useCartStore } from '../store/cartStore';

const INVENTORY = [
  { id: 1, name: "Classic Cotton Solid Shirt", price: "₹ 1,299", category: "Men", description: "Breathable, pure cotton fabric perfect for any occasion.", image: "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Premium Slim Fit Chinos", price: "₹ 1,499", category: "Men", description: "Tailored to perfection with a hint of stretch for all-day comfort.", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Floral Print Summer Maxi", price: "₹ 2,499", category: "Women", description: "Flowy, elegant, and perfect for warm summer evenings.", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80" },
  { id: 4, name: "Vintage Denim Jacket", price: "₹ 2,199", category: "Women", description: "A classic layering piece that never goes out of style.", image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "Kids Graphic T-Shirt", price: "₹ 499", category: "Kids", description: "Soft, durable, and featuring fun prints for the little ones.", image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&w=600&q=80" },
  { id: 6, name: "Boys Denim Playground Shorts", price: "₹ 799", category: "Kids", description: "Built tough for endless hours of playtime.", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=600&q=80" },
];

export default function StoreInventory({ availableCategories }: { availableCategories: string[] }) {
  const { cart, addToCart } = useCartStore(); 
  
  const [activeTab, setActiveTab] = useState("All");
  
  // NEW: State for the Creative Loading Animation!
  const [isSwitchingCategory, setIsSwitchingCategory] = useState(false);
  
  const [showToast, setShowToast] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Bulletproof fix to ensure categories never duplicate
  const uniqueCategories = Array.from(new Set(availableCategories));

  // Premium function: Simulates a loading delay when you click a category
  const handleCategoryClick = (category: string) => {
    if (category === activeTab) return; // Do nothing if they click the same tab
    
    setIsSwitchingCategory(true); // Trigger the 3-dot animation
    setActiveTab(category);       // Change the active tab underline

    // Fake a loading time of 800 milliseconds, then show the clothes
    setTimeout(() => {
      setIsSwitchingCategory(false);
    }, 300);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setLastAddedItem(product.name);
    setShowToast(true);
    setSelectedProduct(null); 
    setIsDrawerOpen(true); 
    setTimeout(() => setShowToast(false), 3000);
  };

  const cartTotal = cart.length * 1299; 
  const filteredProducts = activeTab === "All" ? INVENTORY : INVENTORY.filter(product => product.category === activeTab);

  return (
    <div className="mt-12 w-full bg-white rounded-2xl p-6 sm:p-10 shadow-lg border border-gray-100 relative z-10 min-h-[500px]">
      
      {/* 1. HORIZONTAL TABS (Fixed from duplicating) */}
      <div className="mb-10">
        <h2 className="text-2xl font-normal text-gray-800 mb-6">Pantaloons Products In {INVENTORY.length > 0 ? "Your Area" : "Stock"}</h2>
        <div className="flex overflow-x-auto gap-8 border-b border-gray-200 pb-[2px] w-full" style={{ scrollbarWidth: 'none' }}>
          
          <button 
            onClick={() => handleCategoryClick("All")} 
            className={`whitespace-nowrap pb-3 text-sm md:text-base font-bold transition-all ${activeTab === "All" ? "text-teal-600 border-b-4 border-teal-600" : "text-gray-600 hover:text-teal-600"}`}
          >
            All
          </button>
          
          {uniqueCategories.map((cat, idx) => (
            <button 
              key={idx} 
              onClick={() => handleCategoryClick(cat)} 
              className={`whitespace-nowrap pb-3 text-sm md:text-base font-bold transition-all ${activeTab === cat ? "text-teal-600 border-b-4 border-teal-600" : "text-gray-600 hover:text-teal-600"}`}
            >
              {cat}
            </button>
          ))}
          
          <button 
            onClick={() => setShowComingSoon(true)} 
            className="whitespace-nowrap pb-3 text-sm md:text-base font-bold text-gray-500 hover:text-teal-600 transition-all flex items-center gap-1"
          >
            More <span className="text-xl leading-none">+</span>
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC CONTENT AREA (Shows either Loading Dots OR Clothes) */}
      {/* 2. DYNAMIC CONTENT AREA */}
      {isSwitchingCategory ? (
        
        /* NEW: LIGHTNING-FAST PULSE BAR ANIMATION */
        <div className="w-full h-80 flex flex-col items-center justify-center gap-4">
          <motion.div 
            className="h-1 bg-teal-600 rounded-full" 
            initial={{ width: "0%", opacity: 1 }} 
            animate={{ width: "100%", opacity: 0 }} 
            transition={{ duration: 0.3, ease: "easeOut" }} 
          />
          <span className="text-teal-600 font-bold uppercase tracking-widest text-xs animate-pulse">
            Updating Catalog...
          </span>
        </div>

      ) : (

        /* ACTUAL CLOTHING GRID */
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}>
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id} 
              className="group flex flex-col cursor-pointer"
              onClick={() => setSelectedProduct(product)} 
              variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-full h-80 rounded-xl overflow-hidden bg-gray-100 relative mb-4 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 uppercase shadow-sm">{product.category}</div>
              </div>
              
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-teal-600 transition-colors leading-tight mb-1">{product.name}</h3>
                  <p className="font-extrabold text-gray-600">{product.price}</p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }} className="bg-gray-900 text-white p-3 rounded-full hover:bg-teal-600 transition-colors shadow-md group-hover:-translate-y-1 duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* --- POPUPS & MODALS --- */}
      
      {/* 1. Coming Soon Popup (For 'More +') */}
      {showComingSoon && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowComingSoon(false)}></div>
          <div className="relative bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2 uppercase tracking-tight">Coming Soon</h3>
            <p className="text-gray-500 mb-8">We are actively adding more categories to our digital catalog. Check back shortly!</p>
            <button onClick={() => setShowComingSoon(false)} className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-teal-600 transition-colors uppercase tracking-widest">
              Got It
            </button>
          </div>
        </div>
      )}

      {/* 2. Product Details Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 relative">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <button onClick={() => setSelectedProduct(null)} className="absolute top-4 left-4 bg-white/50 backdrop-blur-md p-2 rounded-full hover:bg-white transition-colors md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
              <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              
              <span className="text-teal-600 font-bold uppercase tracking-widest text-xs mb-4">{selectedProduct.category}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{selectedProduct.name}</h2>
              <p className="text-2xl font-extrabold text-gray-900 mb-6">{selectedProduct.price}</p>
              <p className="text-gray-600 text-lg mb-10 leading-relaxed">{selectedProduct.description}</p>
              
              <button onClick={() => handleAddToCart(selectedProduct)} className="w-full bg-gray-900 text-white font-extrabold text-lg py-5 rounded-xl hover:bg-teal-600 transition-colors shadow-lg uppercase tracking-widest flex items-center justify-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                Add To Bag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Floating Cart Button */}
      {cart.length > 0 && (
        <button onClick={() => setIsDrawerOpen(true)} className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-4 rounded-full shadow-2xl font-bold flex items-center gap-3 z-[100] hover:scale-105 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          {cart.length} {cart.length === 1 ? 'Item' : 'Items'} in Bag
        </button>
      )}

      {/* 4. Added to Cart Toast */}
      {showToast && (
        <div className="fixed top-24 right-8 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl font-bold z-[120] transition-all duration-300 flex items-center gap-3 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          Added {lastAddedItem}
        </div>
      )}

      {/* 5. Slide-out Cart Drawer */}
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[110] transition-opacity duration-300 ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setIsDrawerOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[110] transform transition-transform duration-500 ease-in-out flex flex-col ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-2xl font-extrabold text-gray-900 uppercase tracking-tight">Your Bag ({cart.length})</h2>
          <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cart.map((item, index) => (
            <div key={index} className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
              <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-lg shadow-sm" />
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 leading-tight">{item.name}</h4>
                <p className="text-gray-500 text-sm mt-1">{item.category}</p>
                <p className="font-extrabold text-teal-600 mt-2">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
          <button onClick={() => { setIsDrawerOpen(false); setIsCheckoutOpen(true); }} className="w-full bg-teal-600 text-white font-extrabold py-5 rounded-xl uppercase tracking-widest hover:bg-gray-900 transition-colors shadow-lg">
            Checkout
          </button>
        </div>
      </div>

      {/* 6. Checkout Modal */}
      {isCheckoutOpen && <CheckoutModal cartTotal={cartTotal} itemCount={cart.length} onClose={() => setIsCheckoutOpen(false)} onSuccess={() => { setIsCheckoutOpen(false); }} />}
    </div>
  );
}