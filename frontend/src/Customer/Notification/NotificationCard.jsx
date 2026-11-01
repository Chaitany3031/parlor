import { NotificationsActive } from '@mui/icons-material'
import { Card } from '@mui/material'
import React from 'react'

const NotificationCard = () => {
  return (
    <Card
    sx={{bgcolor:"pink"}}
    className={`cursor-pointer p-5 flex items-center gap-5`}
    >
        <NotificationsActive/>
        <div>
            <p>your booking got confirmed</p>
            <h1 className='space-x-3'>
                {[1,1,1,1].map((_, idx)=><span key={idx}>kxvx</span>)}
            </h1>
        </div>

    </Card>
  )
}

export default NotificationCard