import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {PaymentSuccessAction} from '../../Redux/Payment/paymentSuccessAction'

const PaymentSuccess = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const getQueryParam = (key) => {
        const params = new URLSearchParams(location.search)
        return params.get(key)
    }
    const paymentId = getQueryParam('razorpay_payment_id')
    const paymentLinkId = getQueryParam('razorpay_payment_link_id')
    useEffect(()=>{
if(paymentId){
dispatch(
    paymentSuccessAction({
        paymentId,paymentLinkId,jwt:localStorage.getItem('jwt')
    })
)
}
    },[paymentId])
  return (
    <div className='min-h-[90vh] flex justify-center items-center'>
    <div className="bg-pink-500 text-black p-8 w-[90%] lg:w-[25%] border rounded-md h-[49vh] flex flex-col gap-7 items-center justify-center">
<h1 className='text-3xl font-semibold'>Congrats</h1>
<h1 className="text-2xl font-semibold">Your Booking Get Success!</h1>
<div>
    <Button variant='contained' color='secondary' onClick={()=>navigate('/')}>
Go To Home
    </Button>
</div>
    </div>
    </div>
  )
}

export default PaymentSuccess