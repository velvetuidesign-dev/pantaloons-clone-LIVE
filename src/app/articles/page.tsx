import Link from 'next/link';

export default function PlaceholderPage() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      
      {/* Animated Icon */}
      <div className="w-24 h-24 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-8 shadow-inner animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 uppercase tracking-tight">
        Coming Soon
      </h1>
      
      <p className="text-gray-500 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
        We are currently building out this section of the website. Check back soon for the latest updates!
      </p>
      
      <Link 
        href="/" 
        className="bg-gray-900 text-white px-10 py-5 rounded-full font-bold hover:bg-teal-600 transition-colors shadow-xl uppercase tracking-widest"
      >
        Back to Products
      </Link>
      
    </div>
  );
}