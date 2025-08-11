'use client';

import { useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import Sidebar_Mobile from './sidebar_Mobile'

const SidebarToggle = () => {
  const [show, setShow] = useState(false)

  return (
    <div className='flex flex-row items-center justify-center' onClick={() => setShow(!show)}>
      <p className='text-header-purple font-bold'>AI Assisstant</p>
      {show ? (
        <MdKeyboardArrowLeft className='w-5 h-5 transition-transform duration-100' />
        ) : (
        <MdKeyboardArrowRight className='w-5 h-5 transition-transform duration-100' />
       )}
      {show && <Sidebar_Mobile/>}
    </div>
  )
}

export default SidebarToggle