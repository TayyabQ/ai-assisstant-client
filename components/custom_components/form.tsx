import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type Field = {
  label: string
  type?: string
  placeholder?: string
}

interface SignupFormProps {
  fields?: Field[]
  buttonLabel?: string
  onSubmit?: () => void
}

const Form: React.FC<SignupFormProps> = ({
  fields = [],
  buttonLabel = 'Submit',
  onSubmit
  }) => {
  return (
    <div className='w-[150px] md:w-[250px] lg:w-[400px] xl:w-[550px] 2xl:w-[850px] flex flex-col items-center justify-center gap-2'>
      {fields.map((field, index) => (
        <div key={index} className='w-full flex flex-col items-center justify-center gap-2'>
          <p className='text-[14px] lg:text-[20px] xl:text-[24px] 2xl:text-[42px]'>
            {field.label}
          </p>
          <Input
            type={field.type || 'text'}
            placeholder={field.placeholder || ''}
            className='mb-4'
          />
        </div>
      ))}

      <Button
        className='bg-header-purple lg:text-[20px] 2xl:text-[24px]'
        variant='default'
        size='default'
        onClick={onSubmit}
      >
        {buttonLabel}
      </Button>
    </div>
  )
}

export default Form
