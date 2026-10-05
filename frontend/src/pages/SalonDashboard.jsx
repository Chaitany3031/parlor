import React from 'react';
import { useSelector } from 'react-redux';
import { useNotificationWebSocket } from '../util/useNotificationWebSocket';

export default function SalonDashboard() {
  const { user } = useSelector((state) => state.auth);
  useNotificationWebSocket(user?.salonId, 'salon');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Salon Partner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Bookings</h3>
          <p className="mt-2 text-3xl font-bold text-indigo-600">24</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Active Services</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">8</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Revenue</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">₹14,500</p>
        </div>
      </div>
    </div>
  );
}
