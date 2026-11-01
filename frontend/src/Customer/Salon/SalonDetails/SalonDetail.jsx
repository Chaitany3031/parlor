import React from 'react'

const SalonDetail = () => {
  return (
    <div className='space-y-5 mb-20'>
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
        <section className='space-y-3'>
            <h1 className='font-bold text-3xl'>Angels parlor</h1>
            <p>Kamtha Uran</p>
            <p>
                <strong>
                    Timing :
                </strong>
                21:00 to 21:30
            </p>
        </section>
    </div>
  )
}

export default SalonDetail
