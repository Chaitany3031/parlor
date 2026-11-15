import React from 'react'
import {Avatar, Box, Grid, IconButton, Rating} from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteReview } from '../../Redux/Review/action'
import { store } from '../../Redux/store'

const ReviewCard = ({item}) => {
    const dispatch = useDispatch()
    const {auth} = useSelector(store=>store)
    const handleDeleteReview = () =>{
        dispatch(deleteReview({reviewId:item.id,jwt:localStorage.getItem('jwt')}))
    }
  return (
    <div className='flex justify-between'>
        <div className="w-[80%]">
        <Grid container>
            <Grid size={{xs:3,lg:1.5}}>
                <Box>
                    <Avatar 
                    sx={{width:56,height:56,bgcolor:"pink"}}
                    className='text-white'>
                        {item.user.fullName[0]}
                    </Avatar>
                </Box>
            </Grid>
            <Grid item size={9}>
                <div className="space-y-1">
                    <p className='font-semibold text-lg'>{item.user.fullName}</p>
                    <p className='opacity-70'>21:30:31</p>
                </div>
                <div>
                    
                </div>
                <p>{item.reviewText}</p>
            </Grid>
        </Grid>
        </div>
        {item.user.id===auth.user?.id && <IconButton onClick={handleDeleteReview}><Delete sx={{color:"red"}}/></IconButton>}
    </div>
  )
}

export default ReviewCard
