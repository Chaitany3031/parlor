import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SalonDashboard from '../Salon/SalonDashboard'
// import { Home, Notifications } from '@mui/icons-material'
import Booking from '../Customer/Booking/Booking'
import SalonDetail from '../Customer/Salon/SalonDetails/SalonDetail'
import SalonDetails from '../Customer/Salon/SalonDetails/SalonDetails'
import Navbar from '../Customer/Navbar/Navbar'
import Home from '../Customer/Home/Home'
import Notifications from '../Customer/Notification/Notifications'
import NotFound from '../NotFound/NotFound'
import Auth from '../Auth/Auth'
import Payment from '../Salon/Payment/Payment'
import PaymentSuccess from '../Customer/Payment/PaymentSuccess'

const CustomerRoutes = () => {
  return (
    <div className='pb-20'>
        <Navbar/>
        <Routes>
        {/* <Route path='/salon-dashboard/*' element={<SalonDashboard/>} />  */}
        <Route path='/' element={<Home/>} />
        <Route path='/notifications' element={<Notifications/>} />
        <Route path='/bookings' element={<Booking/>} />
        <Route path='/salon/:id' element={<SalonDetails/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth/>}/>
        <Route path='/payment-success/:id' element={<PaymentSuccess/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
        
    </div>
  )
}

export default CustomerRoutes