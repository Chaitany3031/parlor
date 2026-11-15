import { Badge, Menu, NotificationAdd, Notifications, NotificationsActive } from '@mui/icons-material'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
// import Menu from '@mui/material/Menu'
import React, { useState } from 'react'
import DrawerList from './DrawerList'
import { useDispatch } from 'react-redux'

const Navbar = ({DrawerList}) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const toggleDrawer = (newOpen)=>()=>{
        setOpen(newOpen)
    }
    
  return (
    <div className='h-[10vh] flex items-center justify-between px-5 border-b'>
        <div className="flex items-center gap-3 ">
            <IconButton onClick={toggleDrawer(true)}>
                <Menu color='primary'/>
            </IconButton>
            <h1 className="cursor-pointer font-bold text-xl">
                Kaveri
            </h1>
        </div>
        <IconButton>
            <Badge color='secondary'>
                {/* <NotificationAdd color='primary' /> */}
            </Badge>
        </IconButton>
        <Drawer open={open} onClose={toggleDrawer(false)}>
            <DrawerList toggleDrawer={toggleDrawer} />
        </Drawer>
    </div>
  )
}

export default Navbar