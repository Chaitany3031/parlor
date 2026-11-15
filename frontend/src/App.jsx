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
import Auth from './Auth/Auth'
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
        <Route path='/register' element={<Auth/>} />
        <Route path='/login' element={<Auth/>} />
        <Route path='*' element={<CustomerRoutes/>} />
      </Routes>
    </ThemeProvider>
  )
}

export default App


// i am making the project watching this video and coding each line https://youtu.be/chcQgIr41XQ
// some components got messed up i am getting lot errors in console resolve all of them final app should run bug free error free actual in video the redux code was pasted without typing on screen recording and i made it write with help of you ai so the things in my project and the project in the video is messed up
