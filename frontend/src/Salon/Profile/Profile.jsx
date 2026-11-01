import React from 'react'
import ProfileCard from './ProfileCard'
import { Divider } from '@mui/material'

const Profile = () => {
  return (
    <div className='lg:px-20 lg:bottom-20 space-y-20'>
        <div className="w-full lg:w-[70%]">
            <h1 className="text-5xl font-bold pb-5">Kaveri Angel</h1>
            <section className='grid grid-cols-2 gap-3'>
            <div className='col-span-2'>
                <img className='w-full rounded-md h-[15rem] object-cover ' src="" alt="" />
            </div>
            <div className='col-span-1'>
                <img className='w-full rounded-md h-[15rem] object-cover ' src="" alt="" />
            </div>
            <div className='col-span-1'>
                <img className='w-full rounded-md h-[15rem] object-cover ' src="" alt="" />
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
                <ProfileCard keys={"salon name"} value={"angel parlor"}/>
                <Divider/>
                <ProfileCard keys={"salon address"} value={"uran kamtha"}/>
                <Divider/>
                <ProfileCard keys={"open time"} value={"21:00"}/>
                <Divider/>
                <ProfileCard keys={"close time"} value={"21:30"}/>
            </div>
        </div>
    </div>
  )
}

export default Profile