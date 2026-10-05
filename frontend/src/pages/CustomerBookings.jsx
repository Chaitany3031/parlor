import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings, cancelBooking } from '../redux/booking/action';
import { Calendar, Clock } from 'lucide-react';

export default function CustomerBookings() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { bookings, loading } = useSelector((state) => state.booking);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserBookings(user.id));
    }
  }, [user, dispatch]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Appointments</h1>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading your bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-gray-100 text-center text-gray-500">
          You have no active bookings.
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4"
            >
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${
                  b.status === 'CANCELLED' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                }`}>
                  {b.status || 'CONFIRMED'}
                </span>
                <h3 className="font-semibold text-gray-900 text-lg">Salon #{b.salonId}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(b.bookingDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(b.bookingDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {b.status !== 'CANCELLED' && (
                <button
                  onClick={() => dispatch(cancelBooking(b.id))}
                  className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold transition"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
