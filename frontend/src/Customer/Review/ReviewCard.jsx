import React from 'react'
import {Avatar, Box, Grid, IconButton, Rating} from '@mui/material'
import { Delete } from '@mui/icons-material'

const ReviewCard = () => {
  return (
    <div className='flex justify-between'>
        <div className="w-[80%]">
        <Grid container>
            <Grid size={3}>
                <Box>
                    <Avatar 
                    sx={{width:56,height:56,bgcolor:"pink"}}
                    className='text-white'>
                        K
                    </Avatar>
                </Box>
            </Grid>
            <Grid item size={9}>
                <div className="space-y-1">
                    <p className='font-semibold text-lg'>kxvx</p>
                    <p className='opacity-70'>21:30:31</p>
                </div>
                <div>
                    
                </div>
                <p>Best in world</p>
            </Grid>
        </Grid>
        </div>
        <IconButton><Delete sx={{color:"red"}}/></IconButton>
    </div>
  )
}

export default ReviewCard
