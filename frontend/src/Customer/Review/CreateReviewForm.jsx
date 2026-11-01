import { Box, Button, InputLabel, Rating, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'

const CreateReviewForm = () => {
    const formik = useFormik({
        initialValues:{
            reviewText:"",
            reviewRating:21,
            onSubmit:(values)=>{
                console.log("Submitting",values);
                
            }
        }
    })
  return (
   <Box component={"form"}
   onSubmit={formik.handleSubmit}
   sx={{mt:3}}
   className='space-y-5 w-full lg:w-1/2'
   >

    <TextField
    fullWidth
    id='reviewText'
    name='reviewText'
    label='Review'
    variant='filled'
    multiline
    rows={4}
    value={formik.values.reviewText}
    onChange={formik.handleChange}
    // color='pink'
    // sx={{color:"pink"}}
    />
    <div className="space-y-3">
        <InputLabel>Kaveri</InputLabel>
        <Rating
        id="reviewRating"
        name='reviewRating'
        value={formik.values.reviewRating}
        onChange={(e,newValue)=>formik.setFieldValue("reviewRating",newValue)}
        precision={0.5}
        />
    </div>
    <Button variant="contained" color="primary" type="submit">Submit</Button>
   </Box>
  )
}

export default CreateReviewForm
