import Link from 'next/link';
import dbConnect from '../../../../lib/dbConnect';
import { Store } from '../../../../models/Store';

export default async function CityResultsPage({ params }: any) {
  const resolvedParams = await params;
  const stateName = resolvedParams.state;
  const cityName = resolvedParams.city;

  await dbConnect();

  const stores = await Store.find({
    "address.state": { $regex: new RegExp(`^${stateName}$`, "i") },
    "address.city": { $regex: new RegExp(`^${cityName}$`, "i") }
  }).lean();

  if (stores.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">No Stores Found</h1>
        <p className="text-gray-600 text-lg mb-8">We are growing fast, but we aren't in {cityName} just yet!</p>
        <Link href="/" className="bg-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-700 transition shadow-lg">
          BACK TO SEARCH
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 font-sans min-h-screen bg-gray-50">
      <nav className="text-sm text-gray-500 mb-8 font-medium uppercase tracking-wide">
        <Link href="/" className="hover:text-teal-600 transition">Home</Link> {'>'} {stateName} {'>'} {cityName}
      </nav>
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-10 uppercase tracking-tight border-b-4 border-teal-600 pb-4 inline-block">
        Pantaloons Stores in {cityName}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stores.map((store: any, idx: number) => (
          <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                {store.storeName}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {store.address.street},<br />
                {store.address.locality}, {store.address.pincode}
              </p>
            </div>
            <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>
                <span className="font-bold text-green-700 text-sm uppercase tracking-wide">Open</span>
              </div>
              <Link 
                href={`/near-me/${stateName}/${cityName}/${store.address.locality.toLowerCase()}/${store.storeId}`}
                className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-teal-600 transition-colors uppercase tracking-wide shadow-md"
              >
                View Store
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}