import React from 'react'
import { Button } from '../ui/button'

const Sidebar = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-start py-4 px-2 bg-bg-1 shadow-sm'>
      <div className='w-full px-4 py-4'>
        <Button className='w-full' variant='default' size='default'>New Chat</Button>
      </div>
      <div className='w-full flex flex-col items-center justify-center p-4'>
        <div className='w-full text-[14px] flex items-center justify-start p-1'>
          <p className='font-bold'>Recent</p>
        </div>
        <div className='w-full text-[14px] flex items-center justify-start p-1'>
          <p>How to integrate Stripe</p>
        </div>
        <div className='w-full text-[14px] flex items-center justify-start p-1'>
          <p>What is speed of light</p>
        </div>
        <div className='w-full text-[14px] flex items-center justify-start p-1'>
          <p>Diameter of a circle</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
