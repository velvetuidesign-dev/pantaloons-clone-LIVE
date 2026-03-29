'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // NEW: State to remember which order the admin clicked on!
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Store Command Center</h1>
            <p className="text-gray-500 mt-1">Manage your incoming orders and customer data.</p>
          </div>
          <Link href="/" className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 font-bold transition shadow-sm">
            &larr; Back to Store
          </Link>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-gray-500 font-medium animate-pulse">Loading secure order data...</div>
          ) : orders.length === 0 ? (
            <div className="p-12 text-center text-gray-500 font-medium">No orders yet. Your store is ready for customers!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-900 text-white text-sm uppercase tracking-widest">
                    <th className="p-4 font-bold">Order ID</th>
                    <th className="p-4 font-bold">Customer</th>
                    <th className="p-4 font-bold">Date</th>
                    <th className="p-4 font-bold">Payment</th>
                    <th className="p-4 font-bold text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr 
                      key={order._id} 
                      // NEW: Clicking the row opens the details modal!
                      onClick={() => setSelectedOrder(order)}
                      className="hover:bg-teal-50 cursor-pointer transition-colors group"
                      title="Click to view full order details"
                    >
                      <td className="p-4 text-xs font-mono text-gray-500 group-hover:text-teal-700">{order._id.slice(-8)}</td>
                      <td className="p-4">
                        <p className="text-sm font-bold text-gray-900">{order.customerName || 'Guest'}</p>
                        <p className="text-xs text-gray-500">{order.customerEmail}</p>
                      </td>
                      <td className="p-4 text-sm text-gray-900 font-medium">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wide ${
                          order.paymentMethod === 'COD' 
                            ? 'bg-orange-100 text-orange-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {order.paymentMethod} ({order.paymentStatus})
                        </span>
                      </td>
                      <td className="p-4 text-right text-lg font-extrabold text-gray-900">
                        ₹{order.totalAmount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* NEW: THE ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedOrder(null)} // Close if clicking outside
        >
          <div 
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Stop click from closing when clicking inside the white box
          >
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 uppercase tracking-tight">Order Details</h2>
                <p className="text-sm text-gray-500 font-mono mt-1">ID: {selectedOrder._id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-900 bg-gray-100 p-2 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Customer Info Card */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Customer Information</h3>
                <p className="font-bold text-gray-900 text-lg">{selectedOrder.customerName || 'Guest User'}</p>
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  {selectedOrder.customerEmail}
                </p>
              </div>

              {/* Payment Info Card */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Payment Details</h3>
                <p className="font-bold text-gray-900 text-lg">₹{selectedOrder.totalAmount.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${selectedOrder.paymentMethod === 'COD' ? 'bg-orange-200 text-orange-900' : 'bg-blue-200 text-blue-900'}`}>
                    {selectedOrder.paymentMethod}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${selectedOrder.paymentStatus === 'Paid' ? 'bg-green-200 text-green-900' : 'bg-gray-200 text-gray-700'}`}>
                    {selectedOrder.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Items Ordered List */}
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Items Ordered ({selectedOrder.items?.length || 0})</h3>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {selectedOrder.items?.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                  {/* Item Image */}
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  {/* Item Details */}
                  <div className="flex-grow">
                    <p className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</p>
                  </div>
                  {/* Item Price */}
                  <div className="text-right flex-shrink-0">
                    <p className="font-extrabold text-teal-600">{item.price}</p>
                    <p className="text-xs text-gray-400 font-medium">Qty: 1</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}