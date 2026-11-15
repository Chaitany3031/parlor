import { Button, Container, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../Redux/Auth/action'

const SignupForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues:{
      fullName:"",
      email:"",
      password:"",
      role:"CUSTOMER"
    },
    onSubmit:(values)=>{
      console.log("Submitting ",values);
      const payload = {
        ...values,
        username: values.email
      };
      dispatch(registerUser({userData:payload,navigate}))
    },
    // validationSchema:Yup.object({
    //   email:Yup.string()
    //   .email("Invalid email format")
    //   .required("Required"),
    //   password:Yup.string()
    //   .min(6,"Atleast 6 characters")
    //   .required("Required"),
    // })
  })
  return (
   <Container component={'main'} maxWidth='xs' 
  //  sx={{bgcolor:'pink'}}
   >
    <div className='pt-5'>
      <Typography 
      // sx={{bgcolor:'red'}}
      className='text-center' variant='h5'
       >
        Signup
      </Typography>
      <form className='pt-5' onSubmit={formik.handleSubmit}>
        <TextField
        variant='outlined'
        fullWidth
        name='fullName'
        id='fullName'
        label='Full Name'
        onChange={formik.handleChange}
        value={formik.values.fullName}
        required
        />
        <TextField
        variant='outlined'
        fullWidth
        name='email'
        id='email'
        label='Email Address'
        onChange={formik.handleChange}
        value={formik.values.email}
        required
        />
        <TextField
        variant='outlined'
        fullWidth
        name='password'
        id='password'
        label='Password'
        type='password'
        required
        onChange={formik.handleChange}
        value={formik.values.password}
        />
        <Button sx={{py:'.5rem'}} fullWidth variant='contained' type='submit'>Signup</Button>
      </form>
    </div>
   </Container>
  )
}

export default SignupForm
