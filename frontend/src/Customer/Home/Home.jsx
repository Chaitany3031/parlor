import React from 'react'
import Banner from './Banner'
import ImageBanner from './ImageBanner'
import HomeServiceCard from './HomeServiceCard'
import { services } from '../../Data/services'
import BannerOptional from './BannerOptional'
import SalonList from '../Salon/SalonList'

const Home = () => {
  return (
   <>
   <div className="space-y-20">
    <section>
        {/* Existing Video Banner (uncomment to switch back): */}
        {/* <Banner/> */}
        {/* <BannerOptional/> */}

        {/* New Slideshow Banner: */}
        <ImageBanner />
    </section>
    <section className='space-y-10 lg:space-y-0 lg:flex items-center gap-5 px-20 '>
      <div className='w-full lg:w-1/2'>
        <h1 className='text-2xl font-semibold pb-9'>
          What are you looking for, Bestie ?
        </h1>
        <div className='flex flex-wrap justify-center items-center gap-5'>
          {
            services.map((item)=><HomeServiceCard key={item.id} item={item} />)
          }
        </div>
      </div>
      <div className="w-full lg:w-1/2 border-none grid gap-3 grid-cols-2 grid-rows-12 h-[45vh] md:h-[90vh]">
      <div className="row-span-7">
        <img className='h-full w-full rounded-md' src="https://images.pexels.com/photos/7755216/pexels-photo-7755216.jpeg" alt="work1" />
      </div>
      <div className="row-span-5">
        <img className='h-full w-full rounded-md' src="https://images.pexels.com/photos/7755216/pexels-photo-7755216.jpeg" alt="work2" />
      </div>
      <div className="row-span-7">
        <img className='h-full w-full rounded-md' src="https://images.pexels.com/photos/7755216/pexels-photo-7755216.jpeg" alt="work1" />
      </div>
      <div className="row-span-5">
        <img className='h-full w-full rounded-md' src="https://images.pexels.com/photos/7755216/pexels-photo-7755216.jpeg" alt="work2" />
      </div>
      </div>
    </section>
    <div className="px-20">
      <h1 className='text-3xl font-bold pb-10'>Book ur slot! ASAP</h1>
      <SalonList/>
    </div>
   </div>
   </>
  )
}

export default Home
