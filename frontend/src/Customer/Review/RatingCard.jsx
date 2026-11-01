import { Box, Grid, LinearProgress, Rating } from '@mui/material'
import React from 'react'

const RatingCard = () => {
  return (
    <div className='border p-5 rounded-md '>
        <div className="flex items-center space-x-3 pb-10">
            <Rating readOnly
                    value={4.5}
                    name='half-rating'
                    defaultValue={4.5}
                    precision={0.5}
                    />
            <p className="opacity-60">
                2130</p>        
        </div>
        <Box>
        <Grid container justifyContent={"center"} alignItems={"center"}>
            <Grid size={2}>
                <p>Kaveri</p>
            </Grid>
             <Grid size={5}>
                <LinearProgress sx={{bg:"pink",height:7,borderRadius:4}} variant='determinate' value={40} color='success'/>
            </Grid>
             <Grid size={2}>
                <p className='opacity-50 p-2'>Kaveri</p>
            </Grid>
        </Grid>
        <Grid container justifyContent={"center"} alignItems={"center"}>
            <Grid size={2}>
                <p>Kaveri</p>
            </Grid>
             <Grid size={5}>
                <LinearProgress sx={{bg:"pink",height:7,borderRadius:4}} variant='determinate' value={21} color='success'/>
            </Grid>
             <Grid size={2}>
                <p className='opacity-50 p-2'>Kaveri</p>
            </Grid>
        </Grid>
        </Box>
    </div>
  )
}

export default RatingCard
