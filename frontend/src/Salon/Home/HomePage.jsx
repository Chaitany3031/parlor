import React, { useEffect } from 'react';
import { Card, Button, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSalonBookings, getSalonReport } from '../../Redux/Booking/action';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { salon, booking, auth } = useSelector((store) => store);

  const salonData = salon?.salon || salon?.selectedSalon;
  const report = booking?.report;
  const recentBookings = (booking?.bookings || []).slice(0, 5);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      dispatch(fetchSalonBookings(jwt));
      dispatch(getSalonReport(jwt));
    }
  }, [dispatch]);

  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    try {
      const parts = isoString.split('T');
      return `${parts[0]} ${parts[1] ? parts[1].substring(0, 5) : ''}`;
    } catch (e) {
      return isoString;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-500 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome back, {salonData?.name || auth.user?.fullName || 'Salon Partner'}!
          </h1>
          <p className="text-pink-100 mt-1">
            Manage your appointments, services, and earnings from your owner dashboard.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="contained"
            sx={{ backgroundColor: 'white', color: '#be185d', '&:hover': { backgroundColor: '#fdf2f8' } }}
            startIcon={<AddCircleIcon />}
            onClick={() => navigate('/salon-dashboard/add-services')}
          >
            Add Service
          </Button>
          <Button
            variant="outlined"
            sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: '#fce7f3' } }}
            onClick={() => navigate('/salon-dashboard/bookings')}
          >
            View Bookings
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5">
          <div className="p-4 bg-green-100 text-green-700 rounded-2xl">
            <AttachMoneyIcon fontSize="large" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Earnings</p>
            <h2 className="text-2xl font-bold text-gray-900">₹{report?.totalEarnings || 0}</h2>
          </div>
        </Card>

        <Card className="p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5">
          <div className="p-4 bg-blue-100 text-blue-700 rounded-2xl">
            <PeopleIcon fontSize="large" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Bookings</p>
            <h2 className="text-2xl font-bold text-gray-900">{report?.totalBookings || booking?.bookings?.length || 0}</h2>
          </div>
        </Card>

        <Card className="p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5">
          <div className="p-4 bg-purple-100 text-purple-700 rounded-2xl">
            <ContentCutIcon fontSize="large" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Salon Services</p>
            <h2 className="text-2xl font-bold text-gray-900">{salonData?.services?.length || 'Active'}</h2>
          </div>
        </Card>
      </div>

      {/* Recent Bookings Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Recent Appointments</h2>
          <Button size="small" onClick={() => navigate('/salon-dashboard/bookings')}>
            View All ({booking?.bookings?.length || 0})
          </Button>
        </div>

        {recentBookings.length === 0 ? (
          <p className="text-gray-400 py-6 text-center">No recent bookings found.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentBookings.map((b) => (
              <div key={b.id} className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div>
                  <p className="font-semibold text-gray-900">
                    Booking #{b.id} — {b.services?.map((s) => s.name).join(', ') || 'Salon Service'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDateTime(b.startTime)} • Customer: {b.customer?.fullName || b.user?.fullName || `User #${b.customerId}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-green-700">₹{b.totalPrice}</span>
                  <Chip
                    label={b.status || 'PENDING'}
                    size="small"
                    color={
                      b.status === 'CONFIRMED'
                        ? 'success'
                        : b.status === 'COMPLETED'
                        ? 'primary'
                        : b.status === 'CANCELLED'
                        ? 'error'
                        : 'warning'
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
