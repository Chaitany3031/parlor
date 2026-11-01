import React from 'react'
import BookinCard from './BookinCard'

const Booking = () => {
  return (
    <div className='px-5 md:flex flex-col items-center mt-10 min-h-screen'>
      <div>
        <h1 className="text-3xl font-bold py-5">Kaveri</h1>
      </div>
      <div className='space-y-4 md:w-[35rem]'>
        <BookinCard/>
      </div>
    </div>
  )
}

export default Booking
