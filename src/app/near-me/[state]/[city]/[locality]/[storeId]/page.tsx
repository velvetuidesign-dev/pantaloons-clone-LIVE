import Link from 'next/link';
import dbConnect from '../../../../../../lib/dbConnect';
import { Store } from '../../../../../../models/Store';
import MapWrapper from '../../../../../../components/MapWrapper';
import StoreInventory from '../../../../../../components/StoreInventory';

export default async function SingleStorePage({ params }: any) {
  // 1. Await the dynamic URL parameters
  const resolvedParams = await params;
  
  // 2. Connect to the MongoDB database
  await dbConnect();

  // 3. Find the exact store using the URL ID
  const store = await Store.findOne({ storeId: resolvedParams.storeId }).lean();

  // 4. If someone types a bad URL, show a 404 page
  if (!store) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">Store Not Found</h1>
        <p className="text-gray-500 mb-8 text-lg">We couldn't locate this specific store.</p>
        <Link href="/" className="bg-teal-600 text-white px-8 py-4 rounded-full font-bold hover:bg-teal-700 transition shadow-lg uppercase tracking-widest">
          Return Home
        </Link>
      </div>
    );
  }

  // Fallback categories
  const categories = store.categoriesAvailable || ['Men', 'Women', 'Kids', 'Accessories'];

  return (
    <main className="font-sans min-h-screen bg-gray-50 pb-20">
      
      {/* 1. THE MASSIVE HERO BANNER */}
      <div className="w-full h-[350px] md:h-[450px] relative bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80" 
          alt="Pantaloons Storefront" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <div className="absolute top-6 left-4 md:left-12 text-xs md:text-sm text-white/80 font-medium uppercase tracking-widest z-10">
          <Link href="/" className="hover:text-white transition">Home</Link> {'>'} {store.address.state} {'>'} {store.address.city} {'>'} {store.address.locality}
        </div>
      </div>

      {/* 2. THE FLOATING CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-24 relative z-20 flex flex-col gap-12">
        
        {/* --- STORE DETAILS CARD --- */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-gray-100">
          <div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
              {store.storeName}
            </h1>
            <p className="text-gray-600 text-sm md:text-base font-medium mb-3">
              Clothing And Apparel Store In {store.address.locality}, {store.address.city}
            </p>
            <p className="text-gray-500 text-sm">
              {store.address.street}, {store.address.locality}, {store.address.city}, {store.address.state} - {store.address.pincode}
            </p>
          </div>

          <div className="flex flex-col items-end gap-3 min-w-[200px]">
            <div className="flex items-center gap-2 text-gray-700 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {store.contactNumber || "08657915009"}
            </div>
            <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Open Now <span className="text-gray-500 font-medium ml-1">Closes at 9:30 PM</span>
            </div>
          </div>
        </div>

        {/* --- INTERACTIVE INVENTORY --- */}
        <StoreInventory availableCategories={categories} />

        {/* --- INTERACTIVE MAP --- */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 uppercase tracking-tight">Get Directions</h2>
          <MapWrapper 
            coordinates={store.location.coordinates} 
            storeName={store.storeName} 
          />
        </div>

      </div>

    </main>
  );
}