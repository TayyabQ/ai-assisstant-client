import React from 'react'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

const Chat = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-40'>
      <p className='text-[48px] font-bold my-2'>Welcome to AI Assisstant</p>
      <p className='text-[20px]'>I am your assisstant. You can ask me anything you want to ask!</p>
      <Textarea className='min-h-28 mt-8 shadow-sm'/>
      <Button className='w-50 mt-2' variant='default' size='default'>Go</Button>
    </div>
  )
}

export default Chat
