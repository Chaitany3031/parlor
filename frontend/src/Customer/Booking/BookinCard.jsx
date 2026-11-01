import { ArrowRight, ArrowRightAlt } from '@mui/icons-material'
import Button from '@mui/material/Button'
import React from 'react'

const BookinCard = () => {
  return (
    <div className='p-5 rounded-md bg-slate-100 mg:flex items-center justify-between'>
        <div className="space-y-2">
            <h1 className='text-2xl font-bold '>Kaveri angel</h1>
            <div>
                <li>SPA</li>
                <li>TONE</li>
                <li>HAIR</li>
            </div>
            <div>
                <p>kxvx <ArrowRightAlt/> angel </p>
                <p>213031</p>
            </div>
        </div>
        <div className="space-y-2">
            <img className='h-28 w-28' src="https://scontent.fbom19-1.fna.fbcdn.net/v/t1.15752-9/354028326_777248114191524_4747720579187771861_n.jpg?_nc_cat=105&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=fc17b8&_nc_ohc=EJrfhV8t4CUQ7kNvwGkBT9Y&_nc_oc=AdrHieUvZzqHdJ-v0LhyLLo8R90a7TpZ5uZXtav_DZQ_h8KKGe6p4uUqOr94VKXgFHA6BBkmGQANu5NUlEKfnORy&_nc_zt=23&_nc_ht=scontent.fbom19-1.fna&_nc_ss=7b6a8&oh=03_Q7cD6gFTlbEEP2FiPS8gAUYmAABdIH0xOn3mDxmd3qvAj8iUJQ&oe=6AEE1021" alt="" />
            <p className='text-center'>2130</p>
            <Button color='error' variant='outlined'>Cancelled</Button>
        </div>
    </div>
  )
}

export default BookinCard