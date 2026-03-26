'use client';

import dynamic from 'next/dynamic';

// 1. Dynamically load your actual map component on the Client side only
const ClientMap = dynamic(() => import('./StoreMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-xl mt-8 flex items-center justify-center text-gray-400 font-bold">
      Loading Map...
    </div>
  ),
});

// 2. Export the wrapper
export default function MapWrapper({ coordinates, storeName }: { coordinates: number[], storeName: string }) {
  return <ClientMap coordinates={coordinates} storeName={storeName} />;
}