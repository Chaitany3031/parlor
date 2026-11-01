import React from 'react'
import {AccountBalance, AccountBox, Add, Category, Dashboard, Inventory, Logout, NotificationsNone, Receipt, ShoppingBag} from '@mui/icons-material'
import DrawerList from '../../Admin Salon/DrawerList'


const menu = [
    {
        name:"Dashboard",
        path:"/salon-dashboard",
        icon:<Dashboard className='text-pink-500'/>,
        activeIcon:<Dashboard className='text-pink-400'/>
    },
    {
        name:"Bookings",
        path:"/salon-dashboard/bookings",
        icon:<ShoppingBag className='text-pink-500'/>,
        activeIcon:<ShoppingBag className='text-pink-400'/>
    },
    {
        name:"Services",
        path:"/salon-dashboard/services",
        icon:<Inventory className='text-pink-500'/>,
        activeIcon:<Inventory className='text-pink-400'/>
    },
    {
        name:"Add Services",
        path:"/salon-dashboard/add-services",
        icon:<Add className='text-pink-500'/>,
        activeIcon:<Add className='text-pink-400'/>
    },
    {
        name:"Payment",
        path:"/salon-dashboard/payment",
        icon:<AccountBalance className='text-pink-500'/>,
        activeIcon:<AccountBalance className='text-pink-400'/>
    },
    {
        name:"Transaction",
        path:"/salon-dashboard/transaction",
        icon:<Receipt className='text-pink-500'/>,
        activeIcon:<Receipt className='text-pink-400'/>
    },
    {
        name:"Category",
        path:"/salon-dashboard/category",
        icon:<Category className='text-pink-500'/>,
        activeIcon:<Category className='text-pink-400'/>
    },
    {
        name:"Notifications",
        path:"/salon-dashboard/notifications",
        icon:<NotificationsNone className='text-pink-500'/>,
        activeIcon:<NotificationsNone className='text-pink-400'/>
    },
]

const menu2 = [
    {
        name:"Account",
        path:"/salon-dashboard/account",
        icon:<AccountBox className='text-pink-500'/>,
        activeIcon:<AccountBox className='text-pink-400'/>
    },
    {
        name:"Logout",
        path:"/",
        icon:<Logout className='text-pink-500'/>,
        activeIcon:<Logout className='text-pink-400'/>
    },
]

const SalonDrawerList = ({toggleDrawer}) => {
  return (
    <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer}/>
  )
}

export default SalonDrawerList