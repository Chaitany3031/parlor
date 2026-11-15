import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { Button } from '@mui/material'

const Auth = () => {
    const navigate = useNavigate()
    const location = useLocation()
  return (
    <div className='flex justify-center items-center h-[95vh]'>
        <div className="shadow-lg p-5">
        {location.pathname==='/register'?(<><SignupForm/><div className='pt-5 text-center'>Already Have Account ? <Button onClick={()=>navigate('/login')}>Login</Button></div></>):(<><LoginForm/><div className='pt-5 text-center'>Don't Have Account ? <Button onClick={()=>navigate('/register')}>Signup</Button></div></>)}
        </div>
    </div>
  )
}

export default Auth