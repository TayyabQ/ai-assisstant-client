import SidebarToggle from './sidebar/sidebar_Toggle'

const Header = () => {
  return (
    <div className='py-2 bg-gray-background shadow-sm'>

      {/* Desktop Mode */}
      <div className='hidden lg:grid grid-cols-[1fr_5fr] items-center justify-center'>
        <div className='flex items-center justify-center'>
          <p className='text-[24px] 2xl:text-[36px] text-header-purple font-bold'>AI Assisstant</p>
        </div>
        <div className='flex items-center justify-start'>
          <p className='font-bold'></p>
        </div>
      </div>

      {/* Small & Medium Screen */}
      <div className='lg:hidden flex items-center justify-start gap-1 px-2'>
          <SidebarToggle />
      </div>
      
    </div>
  )
}

export default Header
