import React from 'react'
import { Button } from '@/components/ui/button'

const Sidebar = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-start py-4 px-2 bg-gray-background shadow-sm'>
      <div className='w-full p-4'>
        <Button className='w-full 2xl:text-[24px] bg-header-purple' variant='default' size='default'>New Chat</Button>
      </div>
      <div className='w-full flex flex-col items-center justify-center p-4'>
        <div className='w-full text-[14px] flex items-center justify-start p-1'>
          <p className='font-bold 2xl:text-[18px]'>Recent</p>
        </div>
        <div className='w-full text-[14px] flex items-center justify-start p-1'>
          <p className='2xl:text-[18px]'>How to integrate Stripe</p>
        </div>
        <div className='w-full text-[14px] flex items-center justify-start p-1'>
          <p className='2xl:text-[18px]'>What is speed of light</p>
        </div>
        <div className='w-full text-[14px] flex items-center justify-start p-1'>
          <p className='2xl:text-[18px]'>Diameter of a circle</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
