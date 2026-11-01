import React, { useState } from 'react'
import Categorycard from './Categorycard'
import ServiceCard from './ServiceCard'
import { Button, Divider } from '@mui/material'
import { RemoveShoppingCart, ShoppingCart } from '@mui/icons-material'
import SelectedServiceList from './SelectedServiceList'

const SalonServiceDetails = () => {
    const [selectedCategory,setSelectedCategory] = useState(0)  
    const handleCategoryClick = (category) => () => {setSelectedCategory(category)}
  return (
    <div className='lg:flex gap-5 h-[90vh] mt-10'>
        <section className='space-y-5 border-r lg:w-[25%] pr-5'>
            {[1,1,1,1,1].map((item,index)=><Categorycard
            selectedCategory={selectedCategory}
            item={index}
            handleCategoryClick={handleCategoryClick(index)}
            />)}
        </section>
        <section className="space-y-2 lg:w-[50%] px-5 lg:px-20 overflow-y-auto">
          
        {[1,1,1,1,1].map((item)=><div className='space-y-4'>
              <ServiceCard/>
              <Divider/>
          </div>)}
        </section>
        <section className="lg:w-[25%]">
          <div className="border rounded-md p-5">
            {false?<div>
              <div className="flex items-center gap-2">
              <ShoppingCart sx={{fontSize:"30px",color:"pink"}}/>
              <h1 className='font-thin text-sm'>Selected Services</h1>
              </div>
              <SelectedServiceList/>
              <Button sx={{py:".7rem"}}
               fullWidth variant='contained'>Book Now</Button>
            </div>
            :
            <div className="flex flex-col gap-3 items-center justify-center">
            <RemoveShoppingCart sx={{fontSize:"30px",color:"pink"}}/>
            <h1>Not Selected</h1>
            </div>
            }
          </div>
        </section>
    </div>
  )
}

export default SalonServiceDetails
