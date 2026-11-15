import React, { useEffect, useState } from 'react'
import Categorycard from './Categorycard'
import ServiceCard from './ServiceCard'
import { Box, Button, Divider, Modal, Typography } from '@mui/material'
import { RemoveShoppingCart, ShoppingCart } from '@mui/icons-material'
import SelectedServiceList from './SelectedServiceList'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchServicesBySalonId } from '../../../Redux/ServiceOffering/action'
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import { createBooking } from '../../../Redux/Booking/action'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SalonServiceDetails = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [open,setOpen] = useState(false)
  const [bookingdata, setbookingdata] = useState({
    services:[],
    time:null
  })
  const { id } = useParams()
  // console.log('params ',params);
  const dispatch = useDispatch()
  const { salon , service, category} = useSelector(store => store)
  const handleCategoryClick = (category) => () => { setSelectedCategory(category.id) }
  const handleSelectService = (service) =>{
    setbookingdata(prevState=>(
      {...prevState,services:[...prevState.services,service]}
    ))
  }
  const handleRemoveService=(id)=>{
    setbookingdata(prevState=>(
      {...prevState,services:prevState.services.filter(service=>service.id!==id)}
    ))
  }

  const handleModalClose = () => setOpen(false)

  const handleOpenModal = () => setOpen(true)


  useEffect(() => {
    dispatch(fetchServicesBySalonId({
      salonId: id,
      jwt: localStorage.getItem('jwt'),
      categoryId: selectedCategory,
    }))
  }, [id, selectedCategory])
  console.log('booking data ',bookingdata);


  const handleBooking = () =>{
const serviceIds = bookingdata.services.map((service)=>service.id)
dispatch(createBooking({
  jwt:localStorage.getItem('jwt'),
  salonId:id,
  bookingdata:{serviceIds,startTime:bookingdata.time}
}))
  }
  
  return (
    <div className='lg:flex gap-5 h-[90vh] mt-10'>
      <section className='space-y-5 border-r lg:w-[25%] pr-5'>
        {category?.categories?.map((item, index) => <Categorycard
          key={index}
          selectedCategory={selectedCategory}
          item={item}
          handleCategoryClick={handleCategoryClick(item)}
        />)}
      </section>
      <section className="space-y-2 lg:w-[50%] px-5 lg:px-20 overflow-y-auto">

        {service.services.map((item, index) => <div key={index} className='space-y-4'>
          <ServiceCard onSelect={handleSelectService} onRemove={handleRemoveService} item={item} />
          <Divider />
        </div>)}
      </section>
      <section className="lg:w-[25%]">
        <div className="border rounded-md p-5">
          {true ? <div>
            <div className="flex items-center gap-2">
              <ShoppingCart sx={{ fontSize: "30px", color: "pink" }} />
              <h1 className='font-thin text-sm'>Selected Services</h1>
            </div>
            <SelectedServiceList selectedServices={bookingdata.services} onRemove={handleRemoveService} />
            <Button sx={{ py: ".7rem" }} onClick={handleOpenModal}
              fullWidth variant='contained'>Book Now</Button>
          </div>
            :
            <div className="flex flex-col gap-3 items-center justify-center">
              <RemoveShoppingCart sx={{ fontSize: "30px", color: "pink" }} />
              <h1>Not Selected</h1>
            </div>
          }
        </div>
      </section>
      <Modal open={open} onClose={handleModalClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description' >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[600px] bg-secondary-color shadow-lg lg:flex gap-5 p-4">
<div className="w-[50%] border-r pr-5">
<h1 className='text-xl font-semibold'>Time Slot Not Available</h1>
</div>
          <div className='space-y-5'>
            <SelectedServiceList onRemove={handleRemoveService} selectedServices={bookingdata.services}/>
            <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
            <DateTimePicker sx={{width:"100%" }} fullWidth onChange={(value)=>{
              if(value){
                const localDate = value.format('YYYY-MM-DDTHH:mm:ss')
                setbookingdata((prevState)=({
                  ...prevState,
                  time:localDate
                }))
              }
            }} 
            label="Select Time Slot"
            />
            </LocalizationProvider>
            <div>
              <Button fullWidth variant='outlined' onClick={handleBooking}>
            Book
              </Button>
            </div>
          </div>
          </div>
      </Modal>
      {/* <Modal
  open={true}
  // onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Text in a modal
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography>
  </Box>
</Modal> */}
    </div>
  )
}

export default SalonServiceDetails
