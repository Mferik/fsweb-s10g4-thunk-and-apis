import React from 'react'
import { useSelector } from 'react-redux'

function Item() {
  const data = useSelector((store) => store.current)

  return (
    <div className='shadow-md bg-white text-center'>
      <p className='text-2xl p-10'>{data.setup}</p>
      
      <p className='text-2xl p-10'>{data.punchline}</p>
      
      
    </div>
  )
}

export default Item