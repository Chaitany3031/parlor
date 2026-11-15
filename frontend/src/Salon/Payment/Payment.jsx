import React, { useEffect } from 'react'
import { Card, Divider, Grid, CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getSalonReport } from '../../Redux/Booking/action'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import CancelIcon from '@mui/icons-material/Cancel'

const Payment = () => {
  const dispatch = useDispatch()
  const { booking } = useSelector((store) => store)
  const report = booking?.report

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      dispatch(getSalonReport(jwt))
    }
  }, [dispatch])

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-2xl text-gray-800">Earnings & Payments</h1>

      {booking?.loading && !report ? (
        <div className="flex justify-center p-10">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-xl shadow-md p-6 bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200">
            <div className="flex items-center justify-between pb-3">
              <span className="text-sm font-semibold text-green-800">TOTAL EARNINGS</span>
              <div className="p-2 bg-green-500 text-white rounded-lg">
                <AttachMoneyIcon />
              </div>
            </div>
            <h2 className="font-extrabold text-3xl text-gray-900 pb-2">
              ₹{report?.totalEarnings || 0}
            </h2>
            <Divider />
            <p className="text-xs text-green-700 pt-3">Net earnings from completed bookings</p>
          </Card>

          <Card className="rounded-xl shadow-md p-6 bg-gradient-to-br from-blue-50 to-sky-100 border border-blue-200">
            <div className="flex items-center justify-between pb-3">
              <span className="text-sm font-semibold text-blue-800">TOTAL BOOKINGS</span>
              <div className="p-2 bg-blue-500 text-white rounded-lg">
                <EventAvailableIcon />
              </div>
            </div>
            <h2 className="font-extrabold text-3xl text-gray-900 pb-2">
              {report?.totalBookings || 0}
            </h2>
            <Divider />
            <p className="text-xs text-blue-700 pt-3">All-time appointments booked</p>
          </Card>

          <Card className="rounded-xl shadow-md p-6 bg-gradient-to-br from-red-50 to-rose-100 border border-red-200">
            <div className="flex items-center justify-between pb-3">
              <span className="text-sm font-semibold text-red-800">CANCELLED BOOKINGS</span>
              <div className="p-2 bg-red-500 text-white rounded-lg">
                <CancelIcon />
              </div>
            </div>
            <h2 className="font-extrabold text-3xl text-gray-900 pb-2">
              {report?.totalCancelledBookings || 0}
            </h2>
            <Divider />
            <p className="text-xs text-red-700 pt-3">Refunded or cancelled appointments</p>
          </Card>
        </div>
      )}
    </div>
  )
}

export default Payment
