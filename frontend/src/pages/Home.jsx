import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalons, searchSalons } from '../redux/salon/action';
import SalonCard from '../components/SalonCard';
import { Search } from 'lucide-react';

export default function Home() {
  const dispatch = useDispatch();
  const { salons, loading } = useSelector((state) => state.salon);
  const [city, setCity] = useState('');

  useEffect(() => {
    dispatch(fetchSalons());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      dispatch(searchSalons(city.trim()));
    } else {
      dispatch(fetchSalons());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Book Your Next Salon Experience
        </h1>
        <p className="mt-4 text-lg text-indigo-200 max-w-2xl mx-auto">
          Explore top-rated salons, view real-time service menus, and confirm your appointment in seconds.
        </p>

        <form onSubmit={handleSearch} className="mt-8 max-w-md mx-auto flex items-center bg-white rounded-lg p-1.5 shadow-lg">
          <input
            type="text"
            placeholder="Search by city or area..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 text-gray-800 focus:outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-md text-sm font-semibold flex items-center"
          >
            <Search className="w-4 h-4 mr-1.5" />
            Search
          </button>
        </form>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Salons</h2>
            <p className="text-gray-500 text-sm mt-1">Discover verified salons near you</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-medium">Loading salons...</div>
        ) : salons.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-medium">No salons found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {salons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
