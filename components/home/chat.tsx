import React from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

const Chat = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-10 md:px-20 lg:px-40'>
      <p className='text-[24px] md:text-[28px] lg:text-[40px] xl:text-[48px] 2xl:text-[72px] text-header-purple font-bold my-2'>Welcome to AI Assisstant</p>
      <p className='text-[11px] md:text-[18px] 2xl:text-[28px]'>I am your assisstant. You can ask me anything you want to ask!</p>
      <p>Hello</p>
      <Textarea className='min-h-28 2xl:min-h-40 mt-8 border-header-purple shadow-sm'/>
      <Button className='w-50 mt-2 2xl:text-[24px] bg-header-purple text-white' variant='default' size='default'>Go</Button>
    </div>
  )
}

export default Chat
