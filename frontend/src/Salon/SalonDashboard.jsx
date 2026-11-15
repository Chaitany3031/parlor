import React, { useEffect } from 'react'
import SalonDrawerList from './components/SalonDrawerList'
import Navbar from '../Admin Salon/Navbar'
import SalonRoutes from '../Routes/SalonRoutes'
import { fetchSalonByOwner } from '../Redux/Salon/action'
import { getUser } from '../Redux/Auth/action'
import { useDispatch } from 'react-redux'

const SalonDashboard = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      dispatch(fetchSalonByOwner(jwt))
      dispatch(getUser(jwt))
    }
  }, [dispatch])

  return (
    <div className='min-h-screen'>
      <Navbar DrawerList={SalonDrawerList} />
      <section className="lg:flex lg:h-[90vh]">
        <div className="hidden lg:block h-full">
          <SalonDrawerList />
        </div>
        <div className='p-10 w-full lg:w-[80%] overflow-y-auto'>
          <SalonRoutes />
        </div>
      </section>
    </div>
  )
}

export default SalonDashboard
