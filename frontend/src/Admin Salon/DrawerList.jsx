import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const DrawerList = ({ menu, menu2, toggleDrawer }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const handleClick = (item) =>()=>{
        navigate(item.path)
        if(toggleDrawer){
            toggleDrawer(false)()
        }
    }
    return (
        <div className='h-full'>
            <div className="flex flex-col justify-between h-full border-r w-[300px] py-5">
                <div className="space-y-2">
                    {menu.map((item, index) => (<div
                        onClick={handleClick(item)}
                        className={`cursor-pointer pr-9`}
                    >
                        <div className={`${item.path===location.pathname?"bg-pink-300 text-pink-900":"text-pink-900"}flex items-center px-5 py-3  rounded-r-full`}>
                        <ListItemIcon>
                            {item.path===location.pathname?item.activeIcon:item.icon}
                        </ListItemIcon>
                        <ListItemText>
                            {item.name}
                        </ListItemText>
                        </div>
                    </div>))}
                </div>
                <div className="space-y-5 border-r">
                        <Divider/>
                    <div className="space-y-2">
                        {menu2.map((item, index) => (<div
                        onClick={handleClick(item)}
                        className={`cursor-pointer pr-9`}
                    >
                        <div className={`${item.path===location.pathname?"bg-pink-300 text-pink-900":"text-pink-900"}flex items-center px-5 py-3 rounded-r-full`}>
                        <ListItemIcon>
                            {item.path===location.pathname?item.activeIcon:item.icon}
                        </ListItemIcon>
                        <ListItemText>
                            {item.name}
                        </ListItemText>
                        </div>
                    </div>))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DrawerList