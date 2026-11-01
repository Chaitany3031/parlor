import AccordionDetails from '@mui/material/AccordionDetails'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Collapse from '@mui/material/Collapse'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import React from 'react'

const CategoryForm = () => {

  const formik = useFormik({
    initialValues:{
      name:'',
      image:''
    },
    onSubmit:()=>{
      console.log("k ", formik.values );
      
    }
  })

  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={formik.handleSubmit} action="" className="space-y-4 p-4 w-full lg:w-1/2">
        <Grid container spacing={2}>
          <Grid className="w-24 h-24`" size={{ xs: 12 }}>
            {false?<div className="relative border">
              <img src="" alt="" className="w-24 h-24 object-cover" />
              <IconButton className='' size='samll' sx={{position:"absolute",top:0,right:0}}>
                <Button sx={{fontSize:"1rem"}}>Close</Button>
              </IconButton>
            </div>: <>
            <input type="file" name="" accept='image/*' id="fileInput" style={{
              display:"none"
            }} />
            <label className='relative' htmlFor="fileInput">
              <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3  border rounded-md'>
                <AccordionDetails className='text-pink-300' />
              </span>
              {false && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                <CircularProgress/>
              </div>}
            </label>
            </>}
           
          </Grid>
          <Grid size={12}>
            <TextField fullWidth onChange={formik.handleChange} sx={{bgcolor:"pink"}} value={formik.values.name} id='name' name='name' label='name' required/>
            {/* <Button type='submit' variant='outlined' fullWidth sx={{py:".8rem"}}>
              Create Category
            </Button> */}
          </Grid>
          <Grid size={12}>
            {/* <TextField fullWidth id='name' name='name' label='name' required/> */}
            <Button type='submit' variant='outlined' fullWidth sx={{py:".8rem"}}>
              Create Category
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default CategoryForm