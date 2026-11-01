import React from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from './LoginForm'

const Auth = () => {

    const location = useLocation()
  return (
    <div className='flex justify-center items-center h-[95vh]'>
        <div className="shadow-lg p-5">
        {location.pathname==='/register'?(<div>signup</div>):(<LoginForm/>)}
        </div>
    </div>
  )
}

export default Auth