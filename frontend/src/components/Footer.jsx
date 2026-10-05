import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-8 text-center text-sm text-gray-500">
      <div className="max-w-7xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Parlor Salon Booking. All rights reserved.</p>
      </div>
    </footer>
  );
}
