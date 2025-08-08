import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const LoginForm = () => {
  return (
    <div className='w-[150px] md:w-[250px] lg:w-[400px] xl:w-[550px] 2xl:w-[850px] flex flex-col items-center justify-center gap-2'>
      <p className='text-[14px] lg:text-[20px] xl:text-[24px] 2xl:text-[42px]'>Email</p>
      <Input type="text" placeholder="Email" className="mb-4" />
      <p className='text-[14px] lg:text-[20px] xl:text-[24px] 2xl:text-[42px]'>Password</p>
      <Input type="text" placeholder="Password" className="mb-4" />
      <Button className='bg-header-purple lg:text-[20px] 2xl:text-[24px]' variant='default' size='default'>Login</Button>
    </div>
  )
}

export default LoginForm
