import { ArrowRight, ArrowRightAlt } from '@mui/icons-material'
import Button from '@mui/material/Button'
import React from 'react'

const BookinCard = ({item}) => {
  return (
    <div className='p-5 rounded-md bg-slate-100 mg:flex items-center justify-between'>
        <div className="space-y-2">
            <h1 className='text-2xl font-bold '>{item.salon.name}</h1>
            <div>
                {item.services.map((service)=><li>{service.name}</li>)}
                {/* <li>TONE</li>
                <li>HAIR</li> */}
            </div>
            <div>
                <p>kxvx <ArrowRightAlt/> {item.startTime.split('T')[0]} </p>
                <p>{item.startTime.split('T')[1]} to {item.endTime.split('T')[1]}</p>
            </div>
        </div>
        <div className="space-y-2">
            <img className='h-28 w-28' src={item.services[0].image} alt="" />
            <p className='text-center'>RS {item.totalPrice}</p>
            <Button color='error' variant='outlined'>Cancelled</Button>
        </div>
    </div>
  )
}

export default BookinCard