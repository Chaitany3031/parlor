import Button from '@mui/material/Button'
import React, { useState } from 'react'
import CategoryTable from './CategoryTable'
import CategoryForm from './CategoryForm'

const Category = () => {
    const [activeTab, setactiveTab] = useState(1)
    const handleTabClick = (tab) => () => setactiveTab(tab)
  return (
    <div>
        <div className="flex items-center gap-5 ">
        <Button onClick={handleTabClick(1)} variant={activeTab===1?"contained":"outlined"} >All Categories</Button>
        <Button onClick={handleTabClick(2)} variant={activeTab===2?"contained":"outlined"} >Category Categories</Button>
        </div>
        <div className='mt-10'>
            {activeTab === 1 ? <CategoryTable/>:<CategoryForm/>}
        </div>
    </div>
  )
}

export default Category