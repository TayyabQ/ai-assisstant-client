import React from 'react'
import { Button } from '@/components/ui/button'

const Sidebar_Mobile = () => {
  return (
    <div className='w-[60%] absolute left-0 top-10 min-h-screen flex flex-col items-center justify-start py-4 px-2 bg-gray-background shadow-sm'>
      <div className='w-full p-4'>
        <Button className='w-full bg-header-purple' variant='default' size='default'>New Chat</Button>
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

export default Sidebar_Mobile
