import React from 'react'

const BannerOptional = () => {
  return (
    <div className='w-full relative h-[80vh]'>
        <video src="https://ik.imagekit.io/adog2xkpn/parlor/hero-1.mp4?updatedAt=1792941500393"
        className='w-full h-full object-cover'
        muted
        autoPlay
        loop
        autoFocus
        />
        <div className="textPart opacity-45 absolute flex flex-col items-center justify-center inset-0 text-pink-500 z-20 space-y-3 px-5">
            <h1 className="text-5xl font-bold">BE UR SELF</h1>
            <p className="text-pink-500 text-2xl text-center font-semibold">Discover and Book Beauty, wellness near you</p>
            <input className="border-none bg-pink-300 rounded-md py-4 w-[15rem] md:w-[33rem] outline-none text-black px-5" type="text" placeholder="search here" name="" id="" />
          </div>
    </div>
  )
}

export default BannerOptional