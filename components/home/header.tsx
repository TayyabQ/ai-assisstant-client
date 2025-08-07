import React from 'react'

const Header = () => {
  return (
    <div className='grid grid-cols-[1fr_5fr] items-center justify-center py-2 bg-bg-1 shadow-sm'>
      <div className='flex items-center justify-center'>
        <p className='text-[24px] font-bold'>AI Assisstant</p>
      </div>
      <div className='flex items-center justify-start'>
        <p className='font-bold'>Hello</p>
      </div>
    </div>
  )
}

export default Header
