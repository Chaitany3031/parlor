import { Button, ThemeProvider } from '@mui/material'
import React from 'react'
import greenTheme from './theme/greenTheme'
import Home from './Customer/Home/Home'
import SalonDetails from './Customer/Salon/SalonDetails/SalonDetails'
import Booking from './Customer/Booking/Booking'
import Notifications from './Customer/Notification/Notifications'
import Navbar from './Customer/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import SalonDashboard from './Salon/SalonDashboard'
import SalonDetail from './Customer/Salon/SalonDetails/SalonDetail'
import CustomerRoutes from './Routes/CustomerRoutes'
import LoginForm from './Auth/LoginForm'
// import { Notifications } from '@mui/icons-material'

const App = () => {
  return (
    <ThemeProvider theme={greenTheme}>
      {/* <Navbar/> */}
      {/* <Home/> */}
      {/* <SalonDetails/>  */}
       {/* <Booking/> */}
      {/* <Notifications/> */}
      <Routes>
        <Route path='/salon-dashboard/*' element={<SalonDashboard/>} />
        <Route path='/register' element={<SalonDashboard/>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='*' element={<CustomerRoutes/>} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
