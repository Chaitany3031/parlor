import { AccountCircle, NotificationsActive } from '@mui/icons-material'
import { Avatar, Badge, Button, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, logout } from '../../Redux/Auth/action';

const Navbar = () => {
    const id = React.useId();
    const dispatch = useDispatch()
    const {auth,notification} = useSelector(store=>store)
    const navigate = useNavigate()
    const buttonId = `${id}-button`;
    const menuId = `${id}-menu`;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(()=>{
        dispatch(getUser(localStorage.getItem('jwt')))
    },[auth.jwt])


    const handleLogout = () =>{
        dispatch(logout())
        handleClose()
    }

    return (
        <div className='z-50 px-6 flex items-center justify-between py-2 bg-pink-300'>
            <div className="flex items-center gap-10">
                <h1 onClick={()=>navigate('/')} className='cursor-pointer font-bold text-2xl'>
                    Angels Parlor
                </h1>
                {/* <div className="flex items-center gap-5">
                    <h1 onClick={()=>navigate('/')} className='cursor-pointer'>kxvx</h1>
                </div> */}
            </div>
            <div className="flex items-center gap-3 md:gap-6">
                <Button variant='outlined'>Become a Partner</Button>
                <IconButton onClick={()=>navigate('/notifications')}>
                    <Badge badgeContent={notification.unreadcount} sx={{color:"black"}}
                    //  badgeContent={21}
                     >
                        <NotificationsActive color='primary' />
                    </Badge>
                </IconButton>
                {auth.user?.id ?  <div className="flex gap-1 items-center">
                    <h1 className='text-lg font-semibold'>kxvx</h1>
                    <IconButton
                        id={buttonId}
                        aria-controls={open ? menuId : undefined}
                        aria-haspopup="true"
                        aria-expanded={open}
                        onClick={handleClick}
                    >
                        <Avatar sx={{ bgcolor: "pink" }}>
                            {auth.user?.fullName[0]}
                        </Avatar>
                    </IconButton>
                    <Menu
                        id={menuId}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                            list: {
                                'aria-labelledby': buttonId,
                            },
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem 
                         onClick={()=>{
                            navigate('/bookings')
                            handleClose()
                            }}>My account</MenuItem>
                       {auth.user?.role==="SALON_OWNER" && <MenuItem onClick={()=>{navigate('/salon-dashboard'); handleClose()}}>Salon DashBoard</MenuItem>}
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div>
                :<IconButton onClick={()=>navigate('/login')}>
                    <AccountCircle sx={{fontSize:"45px",color:"pink"}}/>
                </IconButton>}
            </div>
        </div>
    )
}

export default Navbar