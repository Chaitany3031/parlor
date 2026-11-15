import React from 'react'
import { ArrowRightAlt } from '@mui/icons-material'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { useDispatch } from 'react-redux'
import { updateBookingStatus } from '../../Redux/Booking/action'

const getStatusColor = (status) => {
  switch (status) {
    case 'CONFIRMED':
      return 'success'
    case 'COMPLETED':
      return 'primary'
    case 'CANCELLED':
      return 'error'
    case 'PENDING':
    default:
      return 'warning'
  }
}

const BookinCard = ({ item }) => {
  const dispatch = useDispatch()
  const salonName = item?.salon?.name || 'Salon'
  const serviceList = item?.services || []
  const firstServiceImage = serviceList[0]?.image || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80'

  const startDate = item?.startTime ? item.startTime.split('T')[0] : 'N/A'
  const startTime = item?.startTime && item.startTime.includes('T') ? item.startTime.split('T')[1].substring(0, 5) : ''
  const endTime = item?.endTime && item.endTime.includes('T') ? item.endTime.split('T')[1].substring(0, 5) : ''

  const handleCancelBooking = () => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      dispatch(
        updateBookingStatus({
          bookingId: item.id,
          status: 'CANCELLED',
          jwt: localStorage.getItem('jwt'),
        })
      )
    }
  }

  return (
    <div className='p-5 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-3">
          <h2 className='text-xl font-bold text-gray-900'>{salonName}</h2>
          <Chip label={item.status || 'PENDING'} color={getStatusColor(item.status)} size="small" />
        </div>

        <ul className="text-sm text-gray-600 list-disc list-inside space-y-0.5">
          {serviceList.map((service, idx) => (
            <li key={service.id || idx}>{service.name}</li>
          ))}
        </ul>

        <div className="text-xs text-gray-500 pt-1">
          <p className="flex items-center gap-1 font-medium">
            <span>Date: {startDate}</span>
            <ArrowRightAlt fontSize="small" />
            <span>Time: {startTime} {endTime ? `to ${endTime}` : ''}</span>
          </p>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
        <img
          className='h-20 w-20 object-cover rounded-lg border border-slate-200 shadow-inner'
          src={firstServiceImage}
          alt={salonName}
        />
        <div className="text-right">
          <p className='font-bold text-lg text-green-700'>₹{item.totalPrice}</p>
          {item.status !== 'CANCELLED' && item.status !== 'COMPLETED' && (
            <Button
              color='error'
              variant='outlined'
              size='small'
              onClick={handleCancelBooking}
              sx={{ mt: 1 }}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookinCard
