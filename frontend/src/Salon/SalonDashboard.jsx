import React from 'react'
import SalonDrawerList from './components/SalonDrawerList'
import Navbar from '../Admin Salon/Navbar'
import BookingTable from './Booking/BookingTable'
import ServiceTable from './Services/ServiceTable'
import TransactionTable from './Transaction/TransactionTable'
import Category from './Category/Category'
import { Route, Routes } from 'react-router-dom'
// import { Home, Notifications } from '@mui/icons-material'
import CreateServiceForm from './Services/CreateServiceForm'
import HomePage from './Home/HomePage'
import Payment from './Payment/Payment'
import Notifications from '../Customer/Notification/Notifications'
import SalonRoutes from '../Routes/SalonRoutes'

const SalonDashboard = () => {
  return (
    <div className='min-h-screen'>
      <Navbar DrawerList={SalonDrawerList} />
      <section className="lg:flex lg:h-[90vh]">
        <div className=" hidden lg:block h-full">
          <SalonDrawerList/>
        </div>
        <div className='p-10 w-full lg:w-[80%] overflow-y-auto'>
          <SalonRoutes/>
          {/* <BookingTable/> */}
          {/* <ServiceTable/> */}
          {/* <TransactionTable/> */}
          {/* <Category/> */}
        </div>
      </section>
    </div>
  )
}

export default SalonDashboard