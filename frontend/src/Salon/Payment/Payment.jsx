import { Card, Divider } from '@mui/material'
import React from 'react'

const Payment = () => {
  return (
    <div>
      <div className="">
        <Card className="rounded-md space-y-4 p-5">
        <h1 className='font-medium'>
          Total Earning
        </h1>
        <h1 className='font-bold text-xl pb-1'>213031</h1>
        <Divider/>
        <p>Last Payment : <strong>2130</strong></p>
        </Card>
      </div>
    </div>
  )
}

export default Payment