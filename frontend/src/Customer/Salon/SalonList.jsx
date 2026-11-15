import React, { useEffect } from 'react'
import SalonCard from './SalonCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSalons } from '../../Redux/Salon/action'

const SalonList = () => {
  const dispatch = useDispatch()
  const {auth,salon} = useSelector(store=>store)
  useEffect(()=>{
    dispatch(fetchSalons())
  },[])
  return (
    <div className='flex gap-5 flex-wrap'>{salon.salons.map((item, index) => <SalonCard item={item} />)}</div>
  )
}
export default SalonList
