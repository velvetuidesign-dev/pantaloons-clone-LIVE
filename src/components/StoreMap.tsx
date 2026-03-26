'use client'; // This tells Next.js to run this in the browser, not the server

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import the map styles
import L from 'leaflet';

// Fix for default map pins in Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function StoreMap({ coordinates, storeName }: { coordinates: number[], storeName: string }) {
  // MongoDB stores coordinates as [Longitude, Latitude], but Leaflet wants [Latitude, Longitude]
  const position: [number, number] = [coordinates[1], coordinates[0]];

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-md border border-gray-200 mt-8 z-0 relative">
      <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-full w-full">
        {/* The street map visuals */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* The red pin */}
        <Marker position={position} icon={customIcon}>
          <Popup className="font-bold">
            {storeName}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}