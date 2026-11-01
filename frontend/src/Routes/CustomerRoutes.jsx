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

const CustomerRoutes = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
        {/* <Route path='/salon-dashboard/*' element={<SalonDashboard/>} />  */}
        <Route path='/' element={<Home/>} />
        <Route path='/notifications' element={<Notifications/>} />
        <Route path='/bookings' element={<Booking/>} />
        <Route path='/salon/:id' element={<SalonDetails/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
        
    </div>
  )
}

export default CustomerRoutes