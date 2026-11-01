import { FiberManualRecord } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'

const ServiceCard = () => {
  return (
    <div className='w-full'>
      <div className="flex items-center justify-between gap-5">
        <div className="space-y-1 w-[60%]">
          <h1 className='text-2xl font-semibold'>Kaveri</h1>
          <p className='text-gray-500 text-sm'>Angel</p>
          <div className="flex items-center gap-3">
            <p>₹2130</p>
            <FiberManualRecord sx={{fontSize:"10px",color:"gray"}} />
            <p>21</p>
          </div>
        </div>
        <div className="space-y-3">
          <img
           className='w-32 h-32 object-cover rounded-md'
           src="" alt="" />
          <Button fullWidth variant='outlined'>Add</Button>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard
