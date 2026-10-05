import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Bell, User, LogOut, Scissors } from 'lucide-react';
import { logoutUser } from '../redux/auth/action';
import { useNotificationWebSocket } from '../util/useNotificationWebSocket';

export default function Navbar({ onOpenAuth }) {
  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  useNotificationWebSocket(user?.id, 'user');

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-indigo-600 font-bold text-xl">
          <Scissors className="w-6 h-6" />
          <span>Parlor</span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium text-sm">
            Salons
          </Link>
          {user && (
            <Link to="/bookings" className="text-gray-600 hover:text-indigo-600 font-medium text-sm">
              My Bookings
            </Link>
          )}
          {user?.role === 'SALON_OWNER' && (
            <Link to="/partner/dashboard" className="text-gray-600 hover:text-indigo-600 font-medium text-sm">
              Partner Dashboard
            </Link>
          )}

          {user ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-500 hover:text-indigo-600"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              <div className="flex items-center space-x-2 text-gray-700 text-sm font-medium">
                <User className="w-4 h-4" />
                <span>{user.fullName || user.email}</span>
              </div>

              <button
                onClick={() => {
                  dispatch(logoutUser());
                  navigate('/');
                }}
                className="text-gray-500 hover:text-red-600 p-2"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
