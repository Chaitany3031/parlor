import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Salon/Home/HomePage'
import ServiceTable from '../Salon/Services/ServiceTable'
import CreateServiceForm from '../Salon/Services/CreateServiceForm'
import BookingTable from '../Salon/Booking/BookingTable'
// import { Category, Notifications } from '@mui/icons-material'
import TransactionTable from '../Salon/Transaction/TransactionTable'
import Category from '../Salon/Category/Category'
import Notifications from '../Customer/Notification/Notifications'
import Payment from '../Salon/Payment/Payment'
import Profile from '../Salon/Profile/Profile'

const SalonRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/services' element={<ServiceTable/>}/>
            <Route path='/add-services' element={<CreateServiceForm/>}/>
            <Route path='/bookings' element={<BookingTable/>}/>
            <Route path='/category' element={<Category/>}/>
            <Route path='/transaction' element={<TransactionTable/>}/>
            <Route path='/notifications' element={<Notifications/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/account' element={<Profile/>}/>
          </Routes>
    </div>
  )
}

export default SalonRoutes