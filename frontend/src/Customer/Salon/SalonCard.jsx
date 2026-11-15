import React from 'react'
import StarIcon from '@mui/icons-material/Star'
import { useNavigate } from 'react-router-dom'

const SalonCard = ({item}) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/salon/${item.id}`)} className='cursor-pointer' >
      <div className='w-56 md:w-80 rounded-md bg-pink-500'>
      <img className='w-full h-[15rem] object-cover rounded-t-md' src={item.images[0]} alt="Salon" />
      <div className="p-5 space-y-2">
        <h1>{item.name}</h1>
        <div className='text-white text-sm p-1 bg-pink-500 rounded-full w-14 flex items-center justify-center gap-1'>
          2.130<StarIcon sx={{fontSize:"16px"}} />
        </div>
        <p>Professional services...</p>
        <p>{item.address}</p>
      </div>
      </div>
    </div>
  )
}

export default SalonCard
