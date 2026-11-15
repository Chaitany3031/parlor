// import React from 'react'

// const CreateServiceForm = () => {
//   return (
//     <div>CreateServiceForm</div>
//   )
// }

// export default CreateServiceForm


import AccordionDetails from '@mui/material/AccordionDetails'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Collapse from '@mui/material/Collapse'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadToCloudinary } from '../../util/uploadToCloudnary'
import {createServiceAction} from '../../Redux/Salon Services/action'

const CreateServiceForm = () => {
const {category} = useSelector(store=>store)
   const dispatch = useDispatch()
  const [uploadImage, setuploadImage] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      image: '',
      description: "",
      price: '',
      duration: '',
      category: ''
    },
    onSubmit: () => {
      console.log("k ", formik.values);
dispatch(createServiceAction({service:values,jwt:localStorage.getItem('jwt')}))
    }
  })

  const handleImageChange = async(event) =>{
      const file = event.target.files[0]
      setuploadImage(true)
      const image = await uploadToCloudinary(file)
      formik.setFieldValue('image',image)
      setuploadImage(false)
    }

  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={formik.handleSubmit} action="" className="space-y-4 p-4 w-full lg:w-1/2">
        <Grid container spacing={2}>
          <Grid className="w-24 h-24`" size={{ xs: 12 }}>
            {formik.values.image ? <div className="relative border">
              <img src={formik.values.image} alt="" className="w-24 h-24 object-cover" />
              <IconButton className='' size='samll' sx={{ position: "absolute", top: 0, right: 0 }}>
                <Button sx={{ fontSize: "1rem" }}>Close</Button>
              </IconButton>
            </div> : <>
              <input type="file" name="" accept='image/*' id="fileInput" style={{
                display: "none"
              }} onChange={handleImageChange} />
              <label className='relative' htmlFor="fileInput">
                <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3  border rounded-md'>
                  <AccordionDetails className='text-gray-500' />
                </span>
                {uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                  <CircularProgress />
                </div>}
              </label>
            </>}

          </Grid>
          <Grid size={12}>
            <TextField fullWidth onChange={formik.handleChange} sx={{ bgcolor: "pink" }} value={formik.values.name} id='name' name='name' label='name' required />
            {/* <Button type='submit' variant='outlined' fullWidth sx={{py:".8rem"}}>
              Create Category
            </Button> */}
          </Grid>
          <Grid size={12}>
            <TextField fullWidth multiline rows={4} onChange={formik.handleChange} sx={{ bgcolor: "pink" }} value={formik.values.description} id='description' name='description' label='Description' required />
            {/* <Button type='submit' variant='outlined' fullWidth sx={{py:".8rem"}}>
              Create Category
            </Button> */}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth rows={4} onChange={formik.handleChange} sx={{ bgcolor: "pink" }} value={formik.values.duration} id='duration' name='duration' label='Duration' required />
            {/* <Button type='submit' variant='outlined' fullWidth sx={{py:".8rem"}}>
              Create Category
            </Button> */}
          </Grid>
          <Grid size={{ xs: 12 }}>
            {/* <TextField fullWidth rows={4} onChange={formik.handleChange} sx={{bgcolor:"pink"}} value={formik.values.duration} id='duration' name='duration' label='Duration' required/> */}

            {/* <Button type='submit' variant='outlined' fullWidth sx={{py:".8rem"}}>
              Create Category
            </Button> */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select sx={{ bgcolor: "pink" }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.category}
                label="Category"
                name='category'
                onChange={formik.handleChange}
              >
                {category.categories.map((item,index)=><MenuItem value={item.id}>{item.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth rows={4} onChange={formik.handleChange} sx={{ bgcolor: "pink" }} value={formik.values.price} id='price' name='price' label='Price' required />
            {/* <Button type='submit' variant='outlined' fullWidth sx={{py:".8rem"}}>
              Create Category
            </Button> */}
          </Grid>
          <Grid size={12}>
            {/* <TextField fullWidth id='name' name='name' label='name' required/> */}
            <Button type='submit' variant='outlined' fullWidth sx={{ py: ".8rem" }}>
              Create Category
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default CreateServiceForm