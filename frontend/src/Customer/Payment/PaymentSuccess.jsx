import { Button, CircularProgress } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { paymentSuccessAction } from '../../Redux/Payment/paymentSuccessAction'

const PaymentSuccess = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { payment } = useSelector(store => store)

    const getQueryParam = (key) => {
        const params = new URLSearchParams(location.search)
        return params.get(key)
    }

    const paymentId = getQueryParam('razorpay_payment_id')
    const paymentLinkId = getQueryParam('razorpay_payment_link_id')

    useEffect(() => {
        if (paymentId) {
            dispatch(
                paymentSuccessAction({
                    paymentId,
                    paymentLinkId,
                    jwt: localStorage.getItem('jwt')
                })
            )
        }
    }, [paymentId, paymentLinkId, dispatch])

    return (
        <div className='min-h-[90vh] flex justify-center items-center px-4'>
            <div className="bg-white text-slate-800 p-8 w-full max-w-md border rounded-2xl shadow-xl flex flex-col gap-6 items-center justify-center text-center">
                {payment?.loading ? (
                    <div className="space-y-4">
                        <CircularProgress color="secondary" />
                        <p className="text-gray-500">Verifying your payment with the salon...</p>
                    </div>
                ) : (
                    <>
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl font-bold">
                            ✓
                        </div>
                        <h1 className='text-3xl font-bold text-gray-900'>Booking Confirmed!</h1>
                        <p className="text-gray-600">Your payment has been successfully processed and your appointment is scheduled.</p>
                        <div className="flex gap-3 w-full">
                            <Button 
                                variant='outlined' 
                                fullWidth 
                                onClick={() => navigate('/bookings')}
                            >
                                View Bookings
                            </Button>
                            <Button 
                                variant='contained' 
                                color='primary' 
                                fullWidth 
                                onClick={() => navigate('/')}
                            >
                                Go To Home
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default PaymentSuccess
