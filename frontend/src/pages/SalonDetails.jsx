import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalonById } from '../redux/salon/action';
import { createBooking } from '../redux/booking/action';
import { MapPin, Clock, Calendar, CheckCircle } from 'lucide-react';

export default function SalonDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedSalon, loading } = useSelector((state) => state.salon);
  const { user } = useSelector((state) => state.auth);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchSalonById(id));
  }, [id, dispatch]);

  const handleBookAppointment = () => {
    if (!user) {
      alert('Please sign in to book an appointment.');
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and time slot.');
      return;
    }

    const payload = {
      salonId: id,
      customerId: user.id,
      bookingDate: `${selectedDate}T${selectedTime}:00`,
      services: [],
    };

    dispatch(createBooking(payload));
    setBookingSuccess(true);
  };

  if (loading || !selectedSalon) {
    return <div className="text-center py-20">Loading salon details...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-64 sm:h-80 bg-gray-200">
          <img
            src={selectedSalon.images?.[0] || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80'}
            alt={selectedSalon.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-extrabold text-gray-900">{selectedSalon.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-gray-400" />
              {selectedSalon.address || selectedSalon.city}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-gray-400" />
              {selectedSalon.openTime || '09:00 AM'} - {selectedSalon.closeTime || '09:00 PM'}
            </span>
          </div>

          <div className="mt-10 p-6 bg-indigo-50/50 rounded-xl border border-indigo-100">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
              Schedule Appointment
            </h2>

            {bookingSuccess ? (
              <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Booking confirmed! You will receive live updates in your notifications.
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Select Time</label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div className="sm:col-span-2 mt-2">
                  <button
                    onClick={handleBookAppointment}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg text-sm transition"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
