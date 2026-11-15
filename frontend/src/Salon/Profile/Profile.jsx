import React, { useEffect } from 'react'
import ProfileCard from './ProfileCard'
import { Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {fetchSalonByOwner} from '../../Redux/Salon/action'

const Profile = () => {
    const {salon,auth} = useSelector(store=>store)
    
  return (
    <div className='lg:px-20 lg:bottom-20 space-y-20'>
        <div className="w-full lg:w-[70%]">
            <h1 className="text-5xl font-bold pb-5">Kaveri Angel</h1>
            <section className='grid grid-cols-2 gap-3'>
            <div className='col-span-2'>
                <img className='w-full rounded-md h-[15rem] object-cover ' src={salon.salon?.images[0]} alt="" />
            </div>
            <div className='col-span-1'>
                <img className='w-full rounded-md h-[15rem] object-cover ' src={salon.salon?.images[1]} alt="" />
            </div>
            <div className='col-span-1'>
                <img className='w-full rounded-md h-[15rem] object-cover ' src={salon.salon?.images[2]} alt="" />
            </div>
        </section>
        </div>
        <div className="mt-10 lg:w-[70%]">
            <div className="flex items-center pb-3 justify-between">
                <h1 className="text-2xl font-bold text-gray-500">
                    Kaveri
                </h1>
            </div>
            <div>
                <ProfileCard keys={"salon name"} value={auth.user?.fullName}/>
                <Divider/>
                <ProfileCard keys={"salon address"} value={auth.user?.email}/>
                <Divider/>
                <ProfileCard keys={"open time"} value={"21:00"}/>
                <Divider/>
                <ProfileCard keys={"close time"} value={"21:30"}/>
            </div>
        </div>
        <div className="mt-10 lg:w-[70%]">
            <div className="flex items-center pb-3 justify-between">
                <h1 className="text-2xl font-bold text-gray-500">
                    Owner Details
                </h1>
            </div>
            <div>
                <ProfileCard keys={"owner name"} value={auth.user?.fullName}/>
                <Divider/>
                <ProfileCard keys={"email"} value={auth.user?.email}/>
                <Divider/>
                <ProfileCard keys={"role"} value={"Salon_Owner"}/>
                {/* <Divider/>
                <ProfileCard keys={"close time"} value={"21:30"}/> */}
            </div>
        </div>
        <div className="mt-10 lg:w-[70%]">
            <div className="flex items-center pb-3 justify-between">
                <h1 className="text-2xl font-bold text-gray-500">
                    Salon Details
                </h1>
            </div>
            <div>
                <ProfileCard keys={"salon name"} value={salon.salon?.name}/>
                <Divider/>
                <ProfileCard keys={"salon address"} value={salon.salon?.address}/>
                <Divider/>
                <ProfileCard keys={"open time"} value={salon.salon?.openTime+" AM"}/>
                <Divider/>
                <ProfileCard keys={"close time"} value={salon.salon?.closeTime}/>
            </div>
        </div>
    </div>
  )
}

export default Profile