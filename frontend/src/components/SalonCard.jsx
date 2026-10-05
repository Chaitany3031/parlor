import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';

export default function SalonCard({ salon }) {
  const defaultImage =
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80';

  return (
    <Link
      to={`/salon/${salon.id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100 overflow-hidden flex flex-col"
    >
      <div className="h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={salon.images?.[0] || defaultImage}
          alt={salon.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 text-lg">
            {salon.name}
          </h3>
          <p className="text-gray-500 text-sm flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
            {salon.address || salon.city || 'Location available on details'}
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {salon.openTime || '09:00 AM'} - {salon.closeTime || '09:00 PM'}
          </span>
          <span className="text-indigo-600 font-semibold">View Services &rarr;</span>
        </div>
      </div>
    </Link>
  );
}
