import React, { useEffect } from 'react'
import BookinCard from './BookinCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomerBookings } from '../../Redux/Booking/action'
import { CircularProgress } from '@mui/material'

const Booking = () => {
  const { booking, auth } = useSelector((store) => store)
  const dispatch = useDispatch()

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      dispatch(fetchCustomerBookings(jwt))
    }
  }, [dispatch])

  const bookingsList = booking?.bookings || []

  return (
    <div className='px-5 md:flex flex-col items-center mt-10 min-h-screen'>
      <div className="text-center pb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {auth.user?.fullName ? `${auth.user.fullName}'s Appointments` : 'My Appointments'}
        </h1>
        <p className="text-sm text-gray-500 mt-1">Track and manage your parlor bookings</p>
      </div>

      <div className='space-y-4 w-full md:w-[38rem]'>
        {booking?.loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <CircularProgress color="secondary" />
            <p className="text-gray-500 mt-3 text-sm">Loading your bookings...</p>
          </div>
        ) : bookingsList.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 border border-slate-200 rounded-2xl">
            <p className="text-gray-500 text-lg">You have no salon appointments booked yet.</p>
          </div>
        ) : (
          bookingsList.map((item) => <BookinCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  )
}

export default Booking
