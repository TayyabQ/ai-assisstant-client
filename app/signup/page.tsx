'use client';

import Form from '@/components/custom_components/form'
import React from 'react'

const Signup = () => {
  const handleFormSubmit = () => {
    console.log('Form submitted!');
  };

  return (
    <div className='w-[250px] md:w-[350px] lg:w-[500px] xl:w-[650px] 2xl:w-[1000px] flex flex-col items-center justify-center gap-10 py-10 shadow-header-purple shadow-lg'>
      <p className='text-[18px] lg:text-[24px] xl:text-[32px] 2xl:text-[48px] text-header-purple font-bold'>Register to AI Assisstant</p>
      <Form
        fields={[
          { label: 'Name', type: 'text', placeholder: 'Enter your name' },
          { label: 'Email', type: 'email', placeholder: 'Enter your email' },
          { label: 'Password', type: 'password', placeholder: 'Enter your password' }
        ]}
        buttonLabel='Signup'
        onSubmit={handleFormSubmit}
      />
    </div>
  )
}

export default Signup
